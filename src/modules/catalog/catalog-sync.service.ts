import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service.js';
import {
  CATALOG_STALENESS_DAYS,
  CATALOG_SYNC_BATCH_SIZE,
} from './catalog.constants.js';
import { CatalogRepository } from './catalog.repository.js';
import {
  MUSIC_CATALOG_PROVIDER,
  type MusicCatalogProvider,
} from './providers/music-catalog.provider.js';

const ARTIST_ALBUMS_PAGE_SIZE = 50;

@Injectable()
export class CatalogSyncService {
  private readonly logger = new Logger(CatalogSyncService.name);

  constructor(
    @Inject(MUSIC_CATALOG_PROVIDER)
    private readonly catalogProvider: MusicCatalogProvider,
    private readonly repo: CatalogRepository,
    private readonly redis: RedisService,
  ) {}

  async syncStaleArtists(): Promise<void> {
    const threshold = new Date(
      Date.now() - CATALOG_STALENESS_DAYS * 24 * 60 * 60 * 1000,
    );
    const staleArtists = await this.repo.findStaleArtists(
      threshold,
      CATALOG_SYNC_BATCH_SIZE,
    );

    for (const artist of staleArtists) {
      try {
        await this.syncArtist(artist.deezerId);
      } catch (err) {
        this.logger.error(
          `Failed to sync artist ${artist.deezerId}: ${(err as Error).message}`,
        );
      }
    }
  }

  // Guarantees a fully-synced discography before serving a request that
  // needs it (e.g. the paginated tracks-by-artist catalog) — fast path
  // skips Deezer entirely when the artist is already synced and fresh.
  async ensureArtistSynced(deezerId: string) {
    const threshold = new Date(
      Date.now() - CATALOG_STALENESS_DAYS * 24 * 60 * 60 * 1000,
    );
    const existing = await this.repo.findArtistByDeezerId(deezerId);
    if (existing?.catalogSyncedAt && existing.catalogSyncedAt >= threshold) {
      return existing;
    }

    return this.syncArtist(deezerId);
  }

  private async syncArtist(deezerId: string) {
    const freshArtist = await this.catalogProvider.getArtist(deezerId);
    const artistRow = await this.repo.upsertArtist(freshArtist);
    await this.redis.del(`catalog:artist:${deezerId}`);

    const albums = await this.fetchFullDiscography(deezerId);
    await this.redis.deleteByPattern(`catalog:artist-albums:${deezerId}:*`);

    for (const albumSummary of albums) {
      const fullAlbum = await this.catalogProvider.getAlbum(
        albumSummary.deezerId,
      );
      const persistedAlbum = await this.repo.upsertAlbum(
        fullAlbum,
        artistRow.id,
      );
      await this.redis.del(`catalog:album:${fullAlbum.deezerId}`);

      for (const track of fullAlbum.tracks) {
        await this.repo.upsertTrack(track, artistRow.id, persistedAlbum.id);
        await this.redis.del(`catalog:track:${track.deezerId}`);
      }
    }

    await this.redis.deleteByPattern(`catalog:artist-tracks:${deezerId}:*`);
    await this.redis.del(`catalog:artist-detail:${deezerId}`);
    return this.repo.markCatalogSynced(artistRow.id, new Date());
  }

  private async fetchFullDiscography(deezerId: string) {
    const albums: { deezerId: string }[] = [];
    let cursor: string | null = null;

    do {
      const page = await this.catalogProvider.getArtistAlbums(
        deezerId,
        ARTIST_ALBUMS_PAGE_SIZE,
        cursor,
      );
      albums.push(...page.items.map((item) => ({ deezerId: item.deezerId })));
      cursor = page.nextCursor;
    } while (cursor !== null);

    return albums;
  }
}
