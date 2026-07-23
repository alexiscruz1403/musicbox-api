import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service.js';
import { CatalogSyncService } from './catalog-sync.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { mapWithConcurrency } from '../common/concurrency/map-with-concurrency.util.js';
import {
  CATALOG_DB_FANOUT_CONCURRENCY,
  PREVIEW_URL_CACHE_TTL_SECONDS,
  PREVIEW_URL_MISSING_CACHE_TTL_SECONDS,
} from './catalog.constants.js';
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

// reviewCount/userRating (docs/fase-2-features.md) are response-only
// additions, kept out of the shared domain DTOs above (CatalogAlbum etc. are
// reused nested in unrelated places, e.g. TrendingAlbumItem.artist, that
// don't need these fields).
export interface CatalogTrackWithUserRating extends CatalogTrack {
  userRating: number | null;
}

export interface CatalogAlbumDetail extends Omit<CatalogAlbum, 'tracks'> {
  reviewCount: number;
  userRating: number | null;
  tracks: CatalogTrackWithUserRating[];
}

export interface CatalogTrackDetail extends CatalogTrack {
  reviewCount: number;
  userRating: number | null;
}

export interface CatalogArtistDetail extends CatalogArtist {
  reviewCount: number;
}

export type EnrichedCatalogSearchResult =
  | { type: 'artist'; item: CatalogArtistDetail }
  | { type: 'album'; item: CatalogAlbumDetail }
  | { type: 'track'; item: CatalogTrackDetail };

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

  private async withCacheTtl<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlSecondsFor: (result: T) => number,
  ): Promise<T> {
    const cached = await this.redis.get(key);
    if (cached !== null) return JSON.parse(cached) as T;
    const result = await fetcher();
    await this.redis.set(key, JSON.stringify(result), ttlSecondsFor(result));
    return result;
  }

  private withCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    return this.withCacheTtl(key, fetcher, () => this.CACHE_TTL);
  }

  async search(
    query: string,
    type: CatalogSearchType,
    limit: number,
    cursor: string | null,
    viewerId?: string,
  ): Promise<CatalogPage<EnrichedCatalogSearchResult>> {
    const key = `catalog:search:${type}:${query}:${limit}:${cursor ?? '0'}`;
    const page = await this.withCache(key, () =>
      this.catalogProvider.search(query, type, limit, cursor),
    );
    return {
      ...page,
      items: await this.enrichSearchResults(page.items, viewerId),
    };
  }

  // reviewCount/userRating are always resolved live against Postgres, merged
  // onto the cached (24h) provider DTO after retrieval — never baked into the
  // shared cache blob, since both values change on every review
  // create/delete/hide and would otherwise go stale for up to a day.
  private async enrichSearchResults(
    items: CatalogSearchResult[],
    viewerId?: string,
  ): Promise<EnrichedCatalogSearchResult[]> {
    const albumIds = items
      .filter((r) => r.type === 'album')
      .map((r) => r.item.deezerId);
    const trackIds = items
      .filter((r) => r.type === 'track')
      .map((r) => r.item.deezerId);
    const artistIds = items
      .filter((r) => r.type === 'artist')
      .map((r) => r.item.deezerId);

    const [albumStats, trackStats, artistStats] = await Promise.all([
      this.repo.getAlbumStatsBatch(albumIds, viewerId),
      this.repo.getTrackStatsBatch(trackIds, viewerId),
      this.repo.getArtistStatsBatch(artistIds),
    ]);

    return items.map((result): EnrichedCatalogSearchResult => {
      if (result.type === 'album') {
        const stats = albumStats.get(result.item.deezerId);
        return {
          type: 'album',
          item: {
            ...result.item,
            reviewCount: stats?.reviewCount ?? 0,
            userRating: stats?.userRating ?? null,
            tracks: [],
          },
        };
      }
      if (result.type === 'track') {
        const stats = trackStats.get(result.item.deezerId);
        return {
          type: 'track',
          item: {
            ...result.item,
            reviewCount: stats?.reviewCount ?? 0,
            userRating: stats?.userRating ?? null,
          },
        };
      }
      const stats = artistStats.get(result.item.deezerId);
      return {
        type: 'artist',
        item: { ...result.item, reviewCount: stats?.reviewCount ?? 0 },
      };
    });
  }

  async getAlbum(
    deezerId: string,
    viewerId?: string,
  ): Promise<CatalogAlbumDetail> {
    const key = `catalog:album:${deezerId}`;
    let freshFromMetadataFetch: CatalogAlbum | null = null;

    const album = await this.withCache(key, async () => {
      const album = await this.catalogProvider.getAlbum(deezerId);
      freshFromMetadataFetch = album;
      const artist = await this.repo.upsertArtist(album.artist);
      const persistedAlbum = await this.repo.upsertAlbum(album, artist.id);
      // Concurrencia acotada, no `Promise.all`: un álbum puede traer 40+
      // tracks y cada upsert toma una conexión del pool
      // (CATALOG_DB_FANOUT_CONCURRENCY).
      await mapWithConcurrency(
        album.tracks,
        CATALOG_DB_FANOUT_CONCURRENCY,
        (track) => this.repo.upsertTrack(track, artist.id, persistedAlbum.id),
      );
      return album;
    });

    const previewMap = await this.resolveAlbumPreviewMap(
      deezerId,
      freshFromMetadataFetch,
    );
    const stats = await this.repo.getAlbumStats(deezerId, viewerId);
    return {
      ...album,
      reviewCount: stats?.reviewCount ?? 0,
      userRating: stats?.userRating ?? null,
      tracks: album.tracks.map((track) => ({
        ...track,
        // Overrides the (possibly hours-old) previewUrl baked into the 24h
        // metadata cache — see resolveTrackPreviewUrl's comment.
        previewUrl: previewMap.get(track.deezerId) ?? null,
        userRating: stats?.trackRatings.get(track.deezerId) ?? null,
      })),
    };
  }

  // Batched sibling of resolveTrackPreviewUrl: Deezer's /album/{id} endpoint
  // returns fresh preview URLs for ALL of an album's tracks in one call, so
  // refreshing a stale album preview cache costs exactly one Deezer call,
  // not N. One fixed TTL applies to the whole batch (not per-track) — every
  // track's token in a single Deezer album response is minted at the same
  // instant, so their remaining life at write time is effectively identical.
  private async resolveAlbumPreviewMap(
    deezerId: string,
    freshAlbum: CatalogAlbum | null,
  ): Promise<Map<string, string | null>> {
    const key = `catalog:album-preview:${deezerId}`;
    const payload = await this.withCacheTtl(
      key,
      async () => {
        const source =
          freshAlbum ?? (await this.catalogProvider.getAlbum(deezerId));
        return Object.fromEntries(
          source.tracks.map((t) => [t.deezerId, t.previewUrl]),
        );
      },
      () => PREVIEW_URL_CACHE_TTL_SECONDS,
    );
    return new Map(Object.entries(payload as Record<string, string | null>));
  }

  async getTrack(
    deezerId: string,
    viewerId?: string,
  ): Promise<CatalogTrackDetail> {
    const key = `catalog:track:${deezerId}`;
    let freshFromMetadataFetch: CatalogTrack | null = null;

    const track = await this.withCache(key, async () => {
      const track = await this.catalogProvider.getTrack(deezerId);
      freshFromMetadataFetch = track; // reused below if the preview cache is ALSO cold
      const artist = await this.repo.upsertArtist(track.artist);
      // Link to the local Album row if it already exists (by Deezer id) —
      // only falls back to null when the album genuinely hasn't been
      // persisted by anyone yet. Without this, a track first seen via a
      // standalone track lookup/review stayed permanently unlinked, since
      // upsertTrack's update path never used to heal albumId either (fixed
      // alongside this — docs/fase-5-features.md, coverUrl null en trending).
      const albumId = track.albumDeezerId
        ? await this.repo.findAlbumIdByDeezerId(track.albumDeezerId)
        : null;
      await this.repo.upsertTrack(track, artist.id, albumId);
      return track;
    });

    const previewUrl = await this.resolveTrackPreviewUrl(
      deezerId,
      freshFromMetadataFetch,
    );
    const stats = await this.repo.getTrackStats(deezerId, viewerId);
    return {
      ...track,
      // Overrides whatever previewUrl was baked into the (possibly
      // hours-old) 24h metadata cache — Deezer preview tokens expire after
      // 15 min, so that field is never trusted directly (docs/fase-2-features.md).
      previewUrl,
      reviewCount: stats?.reviewCount ?? 0,
      userRating: stats?.userRating ?? null,
    };
  }

  // Decoupled short-TTL cache for the volatile previewUrl field (see
  // PREVIEW_URL_CACHE_TTL_SECONDS). Reuses freshTrack (the live Deezer
  // response from getTrack()'s own metadata fetch, when that ALSO happened
  // to be a cache miss) to avoid a second Deezer call for the same request —
  // only calls Deezer itself here when the metadata cache was a hit (so no
  // live call has happened yet this request).
  private async resolveTrackPreviewUrl(
    deezerId: string,
    freshTrack: CatalogTrack | null,
  ): Promise<string | null> {
    const key = `catalog:track-preview:${deezerId}`;
    const wrapped = await this.withCacheTtl(
      key,
      async () => ({
        previewUrl: (
          freshTrack ?? (await this.catalogProvider.getTrack(deezerId))
        ).previewUrl,
      }),
      (r) =>
        r.previewUrl
          ? PREVIEW_URL_CACHE_TTL_SECONDS
          : PREVIEW_URL_MISSING_CACHE_TTL_SECONDS,
    );
    return wrapped.previewUrl;
  }

  async getArtist(deezerId: string): Promise<CatalogArtistDetail> {
    const key = `catalog:artist:${deezerId}`;
    const artist = await this.withCache(key, async () => {
      const artist = await this.catalogProvider.getArtist(deezerId);
      await this.repo.upsertArtist(artist);
      return artist;
    });
    const stats = await this.repo.getArtistStats(deezerId);
    return { ...artist, reviewCount: stats?.reviewCount ?? 0 };
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
            albumsCount: 0,
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
