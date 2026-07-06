import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../../generated/prisma/client.js';
import { RedisService } from '../../redis/redis.service.js';
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

@Injectable()
export class TrendingService {
  constructor(
    private readonly repo: TrendingRepository,
    private readonly redis: RedisService,
  ) {}

  async getAlbums(limit: number): Promise<TrendingAlbumItem[]> {
    const items = await this.getCached<TrendingAlbumItem>(
      TRENDING_ALBUMS_CACHE_KEY,
      () => this.computeAlbums(),
    );
    return items.slice(0, limit);
  }

  async getTracks(limit: number): Promise<TrendingTrackItem[]> {
    const items = await this.getCached<TrendingTrackItem>(
      TRENDING_TRACKS_CACHE_KEY,
      () => this.computeTracks(),
    );
    return items.slice(0, limit);
  }

  async recalculate(): Promise<{
    albums: TrendingAlbumItem[];
    tracks: TrendingTrackItem[];
  }> {
    const [albums, tracks] = await Promise.all([
      this.computeAlbums(),
      this.computeTracks(),
    ]);
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
  private async getCached<T>(
    key: string,
    compute: () => Promise<T[]>,
  ): Promise<T[]> {
    const cached = await this.redis.get(key);
    if (cached !== null) return JSON.parse(cached) as T[];
    const items = await compute();
    await this.redis.set(
      key,
      JSON.stringify(items),
      TRENDING_CACHE_TTL_SECONDS,
    );
    return items;
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
    return groups
      .map((g) => {
        const track = byId.get(g.id);
        if (!track) return null;
        return {
          deezerId: track.deezerId,
          title: track.title,
          artist: {
            deezerId: track.artist.deezerId,
            name: track.artist.name,
            imageUrl: track.artist.imageUrl,
          },
          albumDeezerId: track.album?.deezerId ?? null,
          coverUrl: track.album?.coverUrl ?? null,
          reviewCount: g.reviewCount,
          avgRating: g.avgRating,
        };
      })
      .filter((item): item is TrendingTrackItem => item !== null);
  }
}
