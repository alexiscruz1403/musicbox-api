import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service.js';
import { CatalogSyncService } from './catalog-sync.service.js';
import { CatalogRepository } from './catalog.repository.js';
import {
  MUSIC_CATALOG_PROVIDER,
  type ArtistTrackItem,
  type CatalogAlbum,
  type CatalogArtist,
  type CatalogPage,
  type CatalogSearchResult,
  type CatalogSearchType,
  type CatalogTrack,
  type MusicCatalogProvider,
} from './providers/music-catalog.provider.js';

@Injectable()
export class CatalogService {
  private readonly CACHE_TTL = 86_400;

  constructor(
    @Inject(MUSIC_CATALOG_PROVIDER)
    private readonly catalogProvider: MusicCatalogProvider,
    private readonly repo: CatalogRepository,
    private readonly redis: RedisService,
    private readonly catalogSyncService: CatalogSyncService,
  ) {}

  private async withCache<T>(
    key: string,
    fetcher: () => Promise<T>,
  ): Promise<T> {
    const cached = await this.redis.get(key);
    if (cached !== null) return JSON.parse(cached) as T;
    const result = await fetcher();
    await this.redis.set(key, JSON.stringify(result), this.CACHE_TTL);
    return result;
  }

  search(
    query: string,
    type: CatalogSearchType,
    limit: number,
    cursor: string | null,
  ): Promise<CatalogPage<CatalogSearchResult>> {
    const key = `catalog:search:${type}:${query}:${limit}:${cursor ?? '0'}`;
    return this.withCache(key, () =>
      this.catalogProvider.search(query, type, limit, cursor),
    );
  }

  getAlbum(deezerId: string): Promise<CatalogAlbum> {
    const key = `catalog:album:${deezerId}`;
    return this.withCache(key, async () => {
      const album = await this.catalogProvider.getAlbum(deezerId);
      const artist = await this.repo.upsertArtist(album.artist);
      const persistedAlbum = await this.repo.upsertAlbum(album, artist.id);
      await Promise.all(
        album.tracks.map((track) =>
          this.repo.upsertTrack(track, artist.id, persistedAlbum.id),
        ),
      );
      return album;
    });
  }

  getTrack(deezerId: string): Promise<CatalogTrack> {
    const key = `catalog:track:${deezerId}`;
    return this.withCache(key, async () => {
      const track = await this.catalogProvider.getTrack(deezerId);
      const artist = await this.repo.upsertArtist(track.artist);
      await this.repo.upsertTrack(track, artist.id, null);
      return track;
    });
  }

  getArtist(deezerId: string): Promise<CatalogArtist> {
    const key = `catalog:artist:${deezerId}`;
    return this.withCache(key, async () => {
      const artist = await this.catalogProvider.getArtist(deezerId);
      await this.repo.upsertArtist(artist);
      return artist;
    });
  }

  getArtistAlbums(
    deezerId: string,
    limit: number,
    cursor: string | null,
  ): Promise<CatalogPage<CatalogAlbum>> {
    const key = `catalog:artist-albums:${deezerId}:${limit}:${cursor ?? '0'}`;
    return this.withCache(key, () =>
      this.catalogProvider.getArtistAlbums(deezerId, limit, cursor),
    );
  }

  // Deezer has no "all tracks of an artist" endpoint (only per-album
  // tracklists), so this is served from Postgres — ensureArtistSynced
  // guarantees the full discography has been walked before we page over it.
  getArtistTracks(
    deezerId: string,
    limit: number,
    cursor: string | null,
  ): Promise<CatalogPage<ArtistTrackItem>> {
    const key = `catalog:artist-tracks:${deezerId}:${limit}:${cursor ?? '0'}`;
    return this.withCache(key, async () => {
      const artistRow =
        await this.catalogSyncService.ensureArtistSynced(deezerId);
      const page = await this.repo.findTracksByArtist(
        artistRow.id,
        cursor,
        limit,
      );
      return {
        items: page.items.map((track) => ({
          deezerId: track.deezerId,
          title: track.title,
          artist: {
            deezerId: track.artist.deezerId,
            name: track.artist.name,
            imageUrl: track.artist.imageUrl,
            fans: 0,
          },
          albumDeezerId: track.album?.deezerId ?? null,
          albumTitle: track.album?.title ?? null,
          coverUrl: track.album?.coverUrl ?? null,
          releaseDate: track.album?.releaseDate?.toISOString() ?? null,
          durationMs: track.durationMs,
          trackNumber: track.trackNumber,
          previewUrl: track.previewUrl,
        })),
        nextCursor: page.nextCursor,
        total: page.total,
      };
    });
  }
}
