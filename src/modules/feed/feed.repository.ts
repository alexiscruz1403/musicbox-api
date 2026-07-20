import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  decodeIdCursor,
  paginate,
} from '../common/pagination/id-cursor.util.js';

const REVIEW_USER_INCLUDE = {
  user: {
    select: { id: true, handle: true, displayName: true, avatarUrl: true },
  },
} as const;

export type FeedReviewRow = Prisma.ReviewGetPayload<{
  include: typeof REVIEW_USER_INCLUDE;
}>;

interface AllModeFetchParams {
  excludeUserIds: string[];
  albumIds: string[];
  trackIds: string[];
  artistIds: string[];
  cursorId?: string;
  take: number;
}

interface TrendingOrRandomParams extends AllModeFetchParams {
  trendingIds: string[];
}

@Injectable()
export class FeedRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ── FOLLOWED mode ──────────────────────────────────────────────
  async listFeed(userId: string, cursor: string | undefined, limit: number) {
    const take = Math.min(limit, 50);
    const cursorId = decodeIdCursor(cursor);
    const reviews = await this.prisma.review.findMany({
      where: {
        deletedAt: null,
        status: 'ACTIVE',
        user: { followers: { some: { followerId: userId } } },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: take + 1,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: REVIEW_USER_INCLUDE,
    });
    return paginate(reviews, take);
  }

  // ── ALL mode: shared precompute ────────────────────────────────
  async getFollowedIds(userId: string): Promise<string[]> {
    const rows = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followeeId: true },
    });
    return rows.map((r) => r.followeeId);
  }

  getOwnReviewSignals(userId: string) {
    return this.prisma.review.findMany({
      where: { userId, status: 'ACTIVE', deletedAt: null },
      select: {
        albumId: true,
        trackId: true,
        album: { select: { artistId: true } },
        track: { select: { artistId: true } },
      },
    });
  }

  // ── ALL mode: trending-pool raw fetchers (scoring done in service) ──
  async getTodaysCandidateIds(
    excludeUserIds: string[],
    since: Date,
  ): Promise<string[]> {
    const rows = await this.prisma.review.findMany({
      where: {
        deletedAt: null,
        status: 'ACTIVE',
        userId: { notIn: excludeUserIds },
        createdAt: { gte: since },
      },
      select: { id: true },
    });
    return rows.map((r) => r.id);
  }

  countLikesByReviewIds(reviewIds: string[]) {
    if (reviewIds.length === 0) return Promise.resolve([]);
    return this.prisma.reviewReaction.groupBy({
      by: ['reviewId'],
      where: { reviewId: { in: reviewIds }, type: 'LIKE' },
      _count: true,
    });
  }

  countCommentsByReviewIds(reviewIds: string[]) {
    if (reviewIds.length === 0) return Promise.resolve([]);
    return this.prisma.comment.groupBy({
      by: ['reviewId'],
      where: { reviewId: { in: reviewIds }, status: 'ACTIVE', deletedAt: null },
      _count: true,
    });
  }

  // ── ALL mode: 3 mutually-exclusive bucket fetchers ─────────────
  findSimilarReviews(params: AllModeFetchParams): Promise<FeedReviewRow[]> {
    const { excludeUserIds, albumIds, trackIds, artistIds, cursorId, take } =
      params;
    const or = this.buildSignalOr(albumIds, trackIds, artistIds);
    if (or.length === 0) return Promise.resolve([]);
    return this.prisma.review.findMany({
      where: {
        deletedAt: null,
        status: 'ACTIVE',
        userId: { notIn: excludeUserIds },
        OR: or,
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: REVIEW_USER_INCLUDE,
    });
  }

  findTrendingReviews(
    params: TrendingOrRandomParams,
  ): Promise<FeedReviewRow[]> {
    const {
      excludeUserIds,
      albumIds,
      trackIds,
      artistIds,
      trendingIds,
      cursorId,
      take,
    } = params;
    if (trendingIds.length === 0) return Promise.resolve([]);
    const or = this.buildSignalOr(albumIds, trackIds, artistIds);
    return this.prisma.review.findMany({
      where: {
        deletedAt: null,
        status: 'ACTIVE',
        userId: { notIn: excludeUserIds },
        id: { in: trendingIds },
        ...(or.length > 0 && { NOT: { OR: or } }),
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: REVIEW_USER_INCLUDE,
    });
  }

  findRandomReviews(params: TrendingOrRandomParams): Promise<FeedReviewRow[]> {
    const {
      excludeUserIds,
      albumIds,
      trackIds,
      artistIds,
      trendingIds,
      cursorId,
      take,
    } = params;
    const or = this.buildSignalOr(albumIds, trackIds, artistIds);
    return this.prisma.review.findMany({
      where: {
        deletedAt: null,
        status: 'ACTIVE',
        userId: { notIn: excludeUserIds },
        ...(trendingIds.length > 0 && { id: { notIn: trendingIds } }),
        ...(or.length > 0 && { NOT: { OR: or } }),
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: REVIEW_USER_INCLUDE,
    });
  }

  private buildSignalOr(
    albumIds: string[],
    trackIds: string[],
    artistIds: string[],
  ): Prisma.ReviewWhereInput[] {
    const or: Prisma.ReviewWhereInput[] = [];
    if (albumIds.length) or.push({ albumId: { in: albumIds } });
    if (trackIds.length) or.push({ trackId: { in: trackIds } });
    if (artistIds.length) or.push({ album: { artistId: { in: artistIds } } });
    if (artistIds.length) or.push({ track: { artistId: { in: artistIds } } });
    return or;
  }
}
