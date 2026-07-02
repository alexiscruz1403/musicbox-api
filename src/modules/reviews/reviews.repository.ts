import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

export interface AlbumReviewItemInput {
  trackId: string;
  rating: number;
  description?: string;
  position: number;
}

type SortMode = 'recent' | 'rating';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAlbumByDeezerId(deezerId: string) {
    return this.prisma.album.findUniqueOrThrow({ where: { deezerId } });
  }

  findTrackByDeezerId(deezerId: string) {
    return this.prisma.track.findUniqueOrThrow({ where: { deezerId } });
  }

  findTracksByDeezerIds(deezerIds: string[]) {
    return this.prisma.track.findMany({
      where: { deezerId: { in: deezerIds } },
    });
  }

  findUserIdByHandle(handle: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { handle },
      select: { id: true },
    });
  }

  createTrackReview(data: {
    userId: string;
    trackId: string;
    description: string;
    rating: number;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl: string | null;
  }) {
    return this.prisma.review.create({
      data: {
        userId: data.userId,
        type: 'TRACK',
        trackId: data.trackId,
        description: data.description,
        rating: new Prisma.Decimal(data.rating.toFixed(1)),
        externalTitle: data.externalTitle,
        externalArtistName: data.externalArtistName,
        externalCoverUrl: data.externalCoverUrl,
      },
    });
  }

  createAlbumReview(data: {
    userId: string;
    albumId: string;
    description: string;
    rating: number;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl: string | null;
    items: AlbumReviewItemInput[];
  }) {
    return this.prisma.$transaction(async (tx) => {
      const review = await tx.review.create({
        data: {
          userId: data.userId,
          type: 'ALBUM',
          albumId: data.albumId,
          description: data.description,
          rating: new Prisma.Decimal(data.rating.toFixed(1)),
          externalTitle: data.externalTitle,
          externalArtistName: data.externalArtistName,
          externalCoverUrl: data.externalCoverUrl,
        },
      });
      await tx.trackReviewItem.createMany({
        data: data.items.map((item) => ({
          reviewId: review.id,
          trackId: item.trackId,
          rating: item.rating,
          description: item.description ?? null,
          position: item.position,
        })),
      });
      return review;
    });
  }

  findById(id: string) {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        trackReviewItems: {
          orderBy: { position: 'asc' },
          include: {
            track: {
              select: { deezerId: true, title: true, trackNumber: true },
            },
          },
        },
        album: { select: { deezerId: true } },
        track: { select: { deezerId: true } },
        user: {
          select: {
            id: true,
            handle: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  findReactionBreakdown(reviewId: string) {
    return this.prisma.reviewReaction.groupBy({
      by: ['type'],
      where: { reviewId },
      _count: true,
    });
  }

  updateTrackReview(
    id: string,
    data: { description?: string; rating?: number },
  ) {
    return this.prisma.review.update({
      where: { id },
      data: {
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.rating !== undefined && {
          rating: new Prisma.Decimal(data.rating.toFixed(1)),
        }),
      },
    });
  }

  updateAlbumReviewItems(
    reviewId: string,
    description: string | undefined,
    rating: number,
    items: AlbumReviewItemInput[],
  ) {
    return this.prisma.$transaction(async (tx) => {
      await tx.trackReviewItem.deleteMany({ where: { reviewId } });
      await tx.trackReviewItem.createMany({
        data: items.map((item) => ({
          reviewId,
          trackId: item.trackId,
          rating: item.rating,
          description: item.description ?? null,
          position: item.position,
        })),
      });
      return tx.review.update({
        where: { id: reviewId },
        data: {
          ...(description !== undefined && { description }),
          rating: new Prisma.Decimal(rating.toFixed(1)),
        },
      });
    });
  }

  updateAlbumReviewDescription(id: string, description: string) {
    return this.prisma.review.update({ where: { id }, data: { description } });
  }

  softDelete(id: string) {
    return this.prisma.review.update({
      where: { id },
      data: { status: 'DELETED', deletedAt: new Date() },
    });
  }

  async listByAlbum(
    albumId: string,
    cursor: string | undefined,
    limit: number,
    sort: SortMode,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = this.decodeCursor(cursor);
    const reviews = await this.prisma.review.findMany({
      where: {
        albumId,
        type: 'ALBUM',
        status: 'ACTIVE',
        deletedAt: null,
      },
      orderBy: this.buildOrderBy(sort),
      take: take + 1,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: {
        user: {
          select: {
            id: true,
            handle: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });
    return this.paginate(reviews, take);
  }

  async listByTrack(
    trackId: string,
    cursor: string | undefined,
    limit: number,
    sort: SortMode,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = this.decodeCursor(cursor);
    const reviews = await this.prisma.review.findMany({
      where: {
        trackId,
        type: 'TRACK',
        status: 'ACTIVE',
        deletedAt: null,
      },
      orderBy: this.buildOrderBy(sort),
      take: take + 1,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: {
        user: {
          select: {
            id: true,
            handle: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });
    return this.paginate(reviews, take);
  }

  async listByUserId(
    userId: string,
    cursor: string | undefined,
    limit: number,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = this.decodeCursor(cursor);
    const reviews = await this.prisma.review.findMany({
      where: { userId, status: 'ACTIVE', deletedAt: null },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: take + 1,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: { user: { select: { avatarUrl: true } } },
    });
    return this.paginate(reviews, take);
  }

  private buildOrderBy(sort: SortMode) {
    return sort === 'rating'
      ? [
          { rating: 'desc' as const },
          { createdAt: 'desc' as const },
          { id: 'desc' as const },
        ]
      : [{ createdAt: 'desc' as const }, { id: 'desc' as const }];
  }

  private decodeCursor(cursor?: string): string | undefined {
    return cursor ? Buffer.from(cursor, 'base64').toString('utf8') : undefined;
  }

  private paginate<T extends { id: string }>(rows: T[], take: number) {
    const hasMore = rows.length > take;
    const items = hasMore ? rows.slice(0, take) : rows;
    const nextCursor = hasMore
      ? Buffer.from(items[items.length - 1].id).toString('base64')
      : null;
    return { items, nextCursor };
  }
}
