import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../../generated/prisma/client.js';
import { RedisService } from '../../redis/redis.service.js';
import { CatalogService } from '../catalog/catalog.service.js';
import {
  TRENDING_ALBUMS_CACHE_KEY,
  TRENDING_CACHE_TTL_SECONDS,
  TRENDING_TRACKS_CACHE_KEY,
} from './trending.constants.js';
import { TrendingRepository } from './trending.repository.js';

export interface TrendingAlbumItem {
  deezerId: string;
  title: string;
  artist: { deezerId: string; name: string; imageUrl: string | null };
  coverUrl: string | null;
  reviewCount: number;
  avgRating: number;
}

export interface TrendingTrackItem {
  deezerId: string;
  title: string;
  artist: { deezerId: string; name: string; imageUrl: string | null };
  albumDeezerId: string | null;
  coverUrl: string | null;
  reviewCount: number;
  avgRating: number;
}

// rank/rankChange (docs/fase-5-features.md) — position movement since the
// last hourly recalculation. rankChange is null for an item that wasn't in
// the previous top-N (brand-new entrant, or first snapshot ever); otherwise
// positive means it moved up, negative means it moved down, 0 unchanged.
export interface RankedTrendingAlbumItem extends TrendingAlbumItem {
  rank: number;
  rankChange: number | null;
}

export interface RankedTrendingTrackItem extends TrendingTrackItem {
  rank: number;
  rankChange: number | null;
}

interface TrendingSnapshotPayload {
  albums: TrendingAlbumItem[];
  tracks: TrendingTrackItem[];
}

@Injectable()
export class TrendingService {
  constructor(
    private readonly repo: TrendingRepository,
    private readonly redis: RedisService,
    private readonly catalogService: CatalogService,
  ) {}

  async getAlbums(limit: number): Promise<RankedTrendingAlbumItem[]> {
    const items = await this.getCached<TrendingAlbumItem>(
      TRENDING_ALBUMS_CACHE_KEY,
      () => this.computeAlbums(),
      (payload) => payload?.albums,
    );
    return items.slice(0, limit);
  }

  async getTracks(limit: number): Promise<RankedTrendingTrackItem[]> {
    const items = await this.getCached<TrendingTrackItem>(
      TRENDING_TRACKS_CACHE_KEY,
      () => this.computeTracks(),
      (payload) => payload?.tracks,
    );
    return items.slice(0, limit);
  }

  async recalculate(): Promise<{
    albums: RankedTrendingAlbumItem[];
    tracks: RankedTrendingTrackItem[];
  }> {
    // Fetched before saveSnapshot() below writes this run's row, so "latest"
    // here always means "the prior hourly recalculation", never a self-diff.
    const previous = await this.repo.findLatestSnapshot();
    const previousPayload = previous?.payload as
      TrendingSnapshotPayload | undefined;

    const [rawAlbums, rawTracks] = await Promise.all([
      this.computeAlbums(),
      this.computeTracks(),
    ]);
    const albums = this.applyRankChange(rawAlbums, previousPayload?.albums);
    const tracks = this.applyRankChange(rawTracks, previousPayload?.tracks);

    await Promise.all([
      this.redis.set(
        TRENDING_ALBUMS_CACHE_KEY,
        JSON.stringify(albums),
        TRENDING_CACHE_TTL_SECONDS,
      ),
      this.redis.set(
        TRENDING_TRACKS_CACHE_KEY,
        JSON.stringify(tracks),
        TRENDING_CACHE_TTL_SECONDS,
      ),
    ]);
    await this.repo.saveSnapshot({
      albums,
      tracks,
    } as unknown as Prisma.InputJsonValue);
    return { albums, tracks };
  }

  // Cold start (cache miss, e.g. first boot or TTL expired before the
  // scheduler ran): compute just the requested list and cache it — same lazy
  // pattern already used by FollowSuggestionsModule/RecommendationsModule.
  // Also ranks against the latest existing snapshot (read-only — this path
  // never writes a new snapshot row, preserving the existing asymmetry with
  // recalculate()), so both paths return the identical Ranked*Item[] shape.
  private async getCached<T extends { deezerId: string }>(
    key: string,
    compute: () => Promise<T[]>,
    extractPrevious: (
      payload: TrendingSnapshotPayload | undefined,
    ) => Array<{ deezerId: string }> | undefined,
  ): Promise<Array<T & { rank: number; rankChange: number | null }>> {
    const cached = await this.redis.get(key);
    if (cached !== null) {
      return JSON.parse(cached) as Array<
        T & { rank: number; rankChange: number | null }
      >;
    }
    const items = await compute();
    const previous = await this.repo.findLatestSnapshot();
    const ranked = this.applyRankChange(
      items,
      extractPrevious(previous?.payload as TrendingSnapshotPayload | undefined),
    );
    await this.redis.set(
      key,
      JSON.stringify(ranked),
      TRENDING_CACHE_TTL_SECONDS,
    );
    return ranked;
  }

  // Previous rank is always derived from array index, never a stored `rank`
  // property — pre-feature snapshot rows have none, and even future rows'
  // stored rank shouldn't be trusted over recomputing position, so this stays
  // correct across the whole (unmigrated) history of snapshot rows.
  private applyRankChange<T extends { deezerId: string }>(
    current: T[],
    previous?: Array<{ deezerId: string }>,
  ): Array<T & { rank: number; rankChange: number | null }> {
    const prevIndex = new Map(
      (previous ?? []).map((it, idx) => [it.deezerId, idx]),
    );
    return current.map((item, idx) => {
      const rank = idx + 1;
      const prevIdx = prevIndex.get(item.deezerId);
      return {
        ...item,
        rank,
        rankChange: prevIdx === undefined ? null : prevIdx + 1 - rank,
      };
    });
  }

  private async computeAlbums(): Promise<TrendingAlbumItem[]> {
    const groups = await this.repo.topAlbumGroups();
    const albums = await this.repo.hydrateAlbums(groups.map((g) => g.id));
    const byId = new Map(albums.map((a) => [a.id, a]));
    return groups
      .map((g) => {
        const album = byId.get(g.id);
        if (!album) return null;
        return {
          deezerId: album.deezerId,
          title: album.title,
          artist: {
            deezerId: album.artist.deezerId,
            name: album.artist.name,
            imageUrl: album.artist.imageUrl,
          },
          coverUrl: album.coverUrl,
          reviewCount: g.reviewCount,
          avgRating: g.avgRating,
        };
      })
      .filter((item): item is TrendingAlbumItem => item !== null);
  }

  private async computeTracks(): Promise<TrendingTrackItem[]> {
    const groups = await this.repo.topTrackGroups();
    const tracks = await this.repo.hydrateTracks(groups.map((g) => g.id));
    const byId = new Map(tracks.map((t) => [t.id, t]));
    const items = await Promise.all(
      groups.map(async (g) => {
        const track = byId.get(g.id);
        if (!track) return null;
        let albumDeezerId = track.album?.deezerId ?? null;
        let coverUrl = track.album?.coverUrl ?? null;
        // Track->Album link not populated locally yet (see
        // CatalogRepository.upsertTrack / CatalogService.getTrack for the
        // self-healing fix — this only kicks in for tracks not yet healed).
        // Deezer's track payload always embeds the album cover directly, and
        // CatalogService caches it 24h in Redis, so this rarely hits the
        // network — it's what guarantees coverUrl is never null here.
        if (!track.album) {
          const fallback = await this.resolveAlbumFallback(track.deezerId);
          albumDeezerId = fallback?.albumDeezerId ?? null;
          coverUrl = fallback?.coverUrl ?? null;
        }
        return {
          deezerId: track.deezerId,
          title: track.title,
          artist: {
            deezerId: track.artist.deezerId,
            name: track.artist.name,
            imageUrl: track.artist.imageUrl,
          },
          albumDeezerId,
          coverUrl,
          reviewCount: g.reviewCount,
          avgRating: g.avgRating,
        };
      }),
    );
    return items.filter((item): item is TrendingTrackItem => item !== null);
  }

  private async resolveAlbumFallback(
    deezerId: string,
  ): Promise<{ albumDeezerId: string | null; coverUrl: string | null } | null> {
    try {
      const track = await this.catalogService.getTrack(deezerId);
      return { albumDeezerId: track.albumDeezerId, coverUrl: track.coverUrl };
    } catch {
      return null;
    }
  }
}
