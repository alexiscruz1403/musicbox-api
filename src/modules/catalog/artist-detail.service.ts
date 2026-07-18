import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service.js';
import { TRENDING_WINDOW_DAYS } from '../trending/trending.constants.js';
import type {
  TrendingAlbumItem,
  TrendingTrackItem,
} from '../trending/trending.service.js';
import {
  ARTIST_DETAIL_CACHE_TTL_SECONDS,
  ARTIST_DETAIL_TOP_N,
} from './catalog.constants.js';
import {
  CatalogRepository,
  type CatalogReviewGroup,
} from './catalog.repository.js';
import type { CatalogArtistDetail } from './catalog.service.js';
import { CatalogService } from './catalog.service.js';

export interface ArtistDetailResponse {
  artist: CatalogArtistDetail;
  topReviewedAlbums: TrendingAlbumItem[];
  topReviewedTracks: TrendingTrackItem[];
  trendingAlbums: TrendingAlbumItem[];
  trendingTracks: TrendingTrackItem[];
}

@Injectable()
export class ArtistDetailService {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly repo: CatalogRepository,
    private readonly redis: RedisService,
  ) {}

  // reviewCount is always re-read live and overwritten below (hit or miss) —
  // this whole response is cached for 1h (docs/fase-2-features.md), so if
  // reviewCount were only set inside buildDetail() (the miss branch), a cache
  // hit would silently serve a reviewCount up to 1h stale.
  async getDetail(deezerId: string): Promise<ArtistDetailResponse> {
    const key = `catalog:artist-detail:${deezerId}`;
    const cached = await this.redis.get(key);
    const response =
      cached !== null
        ? (JSON.parse(cached) as ArtistDetailResponse)
        : await this.buildDetail(deezerId);
    if (cached === null) {
      await this.redis.set(
        key,
        JSON.stringify(response),
        ARTIST_DETAIL_CACHE_TTL_SECONDS,
      );
    }
    const artistStats = await this.repo.getArtistStats(deezerId);
    response.artist = {
      ...response.artist,
      reviewCount: artistStats?.reviewCount ?? 0,
    };
    return response;
  }

  private async buildDetail(deezerId: string): Promise<ArtistDetailResponse> {
    // getArtist() already upserts on cache miss (and did so on whatever past
    // call first cached it), so the Postgres row is guaranteed to exist here.
    const artist = await this.catalogService.getArtist(deezerId);
    const artistRow = await this.repo.findArtistByDeezerId(deezerId);
    if (!artistRow) {
      throw new NotFoundException(`Artist ${deezerId} not found`);
    }

    const windowStart = new Date(
      Date.now() - TRENDING_WINDOW_DAYS * 24 * 60 * 60 * 1000,
    );

    const [
      topReviewedAlbumGroups,
      topReviewedTrackGroups,
      trendingAlbumGroups,
      trendingTrackGroups,
    ] = await Promise.all([
      this.repo.topReviewedAlbumIds(artistRow.id, ARTIST_DETAIL_TOP_N),
      this.repo.topReviewedTrackIds(artistRow.id, ARTIST_DETAIL_TOP_N),
      this.repo.trendingAlbumIds(
        artistRow.id,
        ARTIST_DETAIL_TOP_N,
        windowStart,
      ),
      this.repo.trendingTrackIds(
        artistRow.id,
        ARTIST_DETAIL_TOP_N,
        windowStart,
      ),
    ]);

    const albumIds = [
      ...new Set(
        [...topReviewedAlbumGroups, ...trendingAlbumGroups].map((g) => g.id),
      ),
    ];
    const trackIds = [
      ...new Set(
        [...topReviewedTrackGroups, ...trendingTrackGroups].map((g) => g.id),
      ),
    ];

    const [albumRows, trackRows] = await Promise.all([
      this.repo.hydrateAlbumSummaries(albumIds),
      this.repo.hydrateTrackSummaries(trackIds),
    ]);
    const albumById = new Map(albumRows.map((a) => [a.id, a]));
    const trackById = new Map(trackRows.map((t) => [t.id, t]));

    const toAlbumItem = (g: CatalogReviewGroup): TrendingAlbumItem | null => {
      const album = albumById.get(g.id);
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
    };

    const toTrackItem = (g: CatalogReviewGroup): TrendingTrackItem | null => {
      const track = trackById.get(g.id);
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
    };

    const notNull = <T>(item: T | null): item is T => item !== null;

    return {
      artist,
      topReviewedAlbums: topReviewedAlbumGroups
        .map(toAlbumItem)
        .filter(notNull),
      topReviewedTracks: topReviewedTrackGroups
        .map(toTrackItem)
        .filter(notNull),
      trendingAlbums: trendingAlbumGroups.map(toAlbumItem).filter(notNull),
      trendingTracks: trendingTrackGroups.map(toTrackItem).filter(notNull),
    };
  }
}
