import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogHistoryRepository } from './catalog-history.repository.js';
import { CatalogService } from './catalog.service.js';
import type {
  CatalogAlbum,
  CatalogArtist,
  CatalogTrack,
} from './providers/music-catalog.provider.js';
import type { CatalogResourceType } from '../../../generated/prisma/client.js';

const ALBUM: CatalogResourceType = 'ALBUM';
const TRACK: CatalogResourceType = 'TRACK';
const ARTIST: CatalogResourceType = 'ARTIST';

export interface RecentlyViewedDetailItem {
  resourceType: CatalogResourceType;
  deezerId: string;
  viewedAt: Date;
  detail: unknown;
  error: { code: string; message: string } | null;
}

@Injectable()
export class CatalogHistoryService {
  private readonly logger = new Logger(CatalogHistoryService.name);

  constructor(
    private readonly repo: CatalogHistoryRepository,
    private readonly catalog: CatalogService,
    private readonly artistDetail: ArtistDetailService,
  ) {}

  // Auxiliary side effect hung off high-traffic public endpoints — a
  // transient DB hiccup here must never turn a successful search into a 500.
  // Query text is the only thing that matters here — the same query is
  // never stored twice for a user, regardless of what type it was searched as.
  async recordSearch(userId: string, query: string): Promise<void> {
    try {
      await this.repo.upsertSearchHistory(userId, query);
    } catch (err) {
      this.logger.warn(`Failed to record catalog search history: ${err}`);
    }
  }

  async listSearchHistory(userId: string) {
    return this.repo.listSearchHistory(userId);
  }

  async deleteSearchHistoryItem(userId: string, id: string): Promise<void> {
    const deleted = await this.repo.deleteSearchHistoryItem(userId, id);
    if (!deleted)
      throw new NotFoundException({ code: 'SEARCH_HISTORY_ITEM_NOT_FOUND' });
  }

  async deleteAllSearchHistory(userId: string): Promise<void> {
    await this.repo.deleteAllSearchHistory(userId);
  }

  // Same swallow-on-error reasoning as recordSearch — hung off the 3 public
  // catalog detail endpoints. Each builder takes the whole domain object
  // returned by its own endpoint so the resourceType/fields it records can
  // never be mixed up with another resource's data.
  async recordAlbumView(userId: string, album: CatalogAlbum): Promise<void> {
    try {
      await this.repo.upsertRecentlyViewed(userId, ALBUM, album.deezerId, {
        title: album.title,
        artistName: album.artist.name,
        coverUrl: album.coverUrl,
        albumsCount: null,
      });
    } catch (err) {
      this.logger.warn(`Failed to record recently-viewed album: ${err}`);
    }
  }

  async recordTrackView(userId: string, track: CatalogTrack): Promise<void> {
    try {
      await this.repo.upsertRecentlyViewed(userId, TRACK, track.deezerId, {
        title: track.title,
        artistName: track.artist.name,
        coverUrl: track.coverUrl,
        albumsCount: null,
      });
    } catch (err) {
      this.logger.warn(`Failed to record recently-viewed track: ${err}`);
    }
  }

  async recordArtistView(userId: string, artist: CatalogArtist): Promise<void> {
    try {
      await this.repo.upsertRecentlyViewed(userId, ARTIST, artist.deezerId, {
        title: artist.name,
        artistName: null,
        coverUrl: artist.imageUrl,
        albumsCount: artist.albumsCount,
      });
    } catch (err) {
      this.logger.warn(`Failed to record recently-viewed artist: ${err}`);
    }
  }

  async listRecentlyViewed(userId: string) {
    return this.repo.listRecentlyViewed(userId);
  }

  // Prefetch bundle for offline caching: one round trip that hydrates full
  // detail (same shape as the individual GET endpoints) for every item in
  // the last-10 recently-viewed list, so the client can cache everything it
  // needs right before going offline. Deliberately does NOT call
  // recordAlbumView/recordTrackView/recordArtistView — this reads history
  // that's already recorded; re-touching it would bump viewedAt and reorder
  // the "last 10 visited" list, defeating its purpose.
  async getRecentlyViewedDetails(
    userId: string,
  ): Promise<RecentlyViewedDetailItem[]> {
    const items = await this.repo.listRecentlyViewed(userId);
    return Promise.all(items.map((item) => this.hydrateOne(item)));
  }

  private async hydrateOne(item: {
    resourceType: CatalogResourceType;
    deezerId: string;
    viewedAt: Date;
  }): Promise<RecentlyViewedDetailItem> {
    try {
      const detail = await this.fetchDetail(item.resourceType, item.deezerId);
      return { ...item, detail, error: null };
    } catch (err) {
      return {
        ...item,
        detail: null,
        error: {
          code: err instanceof NotFoundException ? 'NOT_FOUND' : 'FETCH_FAILED',
          message: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }

  private fetchDetail(resourceType: CatalogResourceType, deezerId: string) {
    switch (resourceType) {
      case ALBUM:
        return this.catalog.getAlbum(deezerId);
      case TRACK:
        return this.catalog.getTrack(deezerId);
      case ARTIST:
        return this.artistDetail.getDetail(deezerId);
    }
  }
}
