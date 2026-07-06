import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { TRENDING_TOP_N, TRENDING_WINDOW_DAYS } from './trending.constants.js';

export interface TrendingGroup {
  id: string;
  reviewCount: number;
  avgRating: number;
}

@Injectable()
export class TrendingRepository {
  constructor(private readonly prisma: PrismaService) {}

  private windowStart(): Date {
    return new Date(Date.now() - TRENDING_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  }

  async topAlbumGroups(): Promise<TrendingGroup[]> {
    const groups = await this.prisma.review.groupBy({
      by: ['albumId'],
      where: {
        type: 'ALBUM',
        status: 'ACTIVE',
        deletedAt: null,
        albumId: { not: null },
        createdAt: { gte: this.windowStart() },
      },
      _count: { albumId: true },
      _avg: { rating: true },
      orderBy: [{ _count: { albumId: 'desc' } }, { _avg: { rating: 'desc' } }],
      take: TRENDING_TOP_N,
    });
    return groups.map((g) => ({
      id: g.albumId!,
      reviewCount: g._count.albumId,
      avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
    }));
  }

  async topTrackGroups(): Promise<TrendingGroup[]> {
    const groups = await this.prisma.review.groupBy({
      by: ['trackId'],
      where: {
        type: 'TRACK',
        status: 'ACTIVE',
        deletedAt: null,
        trackId: { not: null },
        createdAt: { gte: this.windowStart() },
      },
      _count: { trackId: true },
      _avg: { rating: true },
      orderBy: [{ _count: { trackId: 'desc' } }, { _avg: { rating: 'desc' } }],
      take: TRENDING_TOP_N,
    });
    return groups.map((g) => ({
      id: g.trackId!,
      reviewCount: g._count.trackId,
      avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
    }));
  }

  hydrateAlbums(ids: string[]) {
    if (ids.length === 0) return Promise.resolve([]);
    return this.prisma.album.findMany({
      where: { id: { in: ids } },
      include: { artist: true },
    });
  }

  hydrateTracks(ids: string[]) {
    if (ids.length === 0) return Promise.resolve([]);
    return this.prisma.track.findMany({
      where: { id: { in: ids } },
      include: {
        artist: true,
        album: { select: { deezerId: true, coverUrl: true } },
      },
    });
  }

  saveSnapshot(payload: Prisma.InputJsonValue) {
    return this.prisma.trendingSnapshot.create({ data: { payload } });
  }
}
