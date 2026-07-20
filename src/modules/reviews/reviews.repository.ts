import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  decodeIdCursor,
  paginate,
} from '../common/pagination/id-cursor.util.js';
import type { UserReviewSortMode } from './dto/list-user-reviews-query.dto.js';

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

  // El dueño de una reseña es visible si su perfil es público, si el viewer
  // es el propio dueño, o si el viewer lo sigue (Follow aceptado). Query
  // directa a Prisma (mismo patrón pragmático que UsersRepository/
  // NotificationsRepository) — ReviewsModule no puede importar UsersModule
  // sin crear un ciclo (UsersModule ya importa ReviewsModule).
  async isOwnerVisibleTo(ownerId: string, viewerId?: string): Promise<boolean> {
    if (viewerId === ownerId) return true;
    const owner = await this.prisma.user.findUnique({
      where: { id: ownerId },
      select: { isPrivate: true },
    });
    if (!owner?.isPrivate) return true;
    if (!viewerId) return false;
    const follow = await this.prisma.follow.findUnique({
      where: {
        followerId_followeeId: { followerId: viewerId, followeeId: ownerId },
      },
    });
    return !!follow;
  }

  createTrackReview(data: {
    userId: string;
    trackId: string;
    artistId: string;
    description: string | null;
    rating: number;
    externalTitle: string;
    externalArtistName: string;
    externalCoverUrl: string | null;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const review = await tx.review.create({
        data: {
          userId: data.userId,
          type: 'TRACK',
          trackId: data.trackId,
          description: data.description,
          rating: new Prisma.Decimal(data.rating.toFixed(2)),
          externalTitle: data.externalTitle,
          externalArtistName: data.externalArtistName,
          externalCoverUrl: data.externalCoverUrl,
        },
      });
      await tx.track.update({
        where: { id: data.trackId },
        data: { reviewCount: { increment: 1 } },
      });
      await tx.artist.update({
        where: { id: data.artistId },
        data: { reviewCount: { increment: 1 } },
      });
      return review;
    });
  }

  createAlbumReview(data: {
    userId: string;
    albumId: string;
    artistId: string;
    description: string | null;
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
          rating: new Prisma.Decimal(data.rating.toFixed(2)),
          externalTitle: data.externalTitle,
          externalArtistName: data.externalArtistName,
          externalCoverUrl: data.externalCoverUrl,
        },
      });
      await tx.trackReviewItem.createMany({
        data: data.items.map((item) => ({
          reviewId: review.id,
          trackId: item.trackId,
          rating: new Prisma.Decimal(item.rating.toFixed(2)),
          description: item.description ?? null,
          position: item.position,
        })),
      });
      await tx.album.update({
        where: { id: data.albumId },
        data: { reviewCount: { increment: 1 } },
      });
      await tx.artist.update({
        where: { id: data.artistId },
        data: { reviewCount: { increment: 1 } },
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
          rating: new Prisma.Decimal(data.rating.toFixed(2)),
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
          rating: new Prisma.Decimal(item.rating.toFixed(2)),
          description: item.description ?? null,
          position: item.position,
        })),
      });
      return tx.review.update({
        where: { id: reviewId },
        data: {
          ...(description !== undefined && { description }),
          rating: new Prisma.Decimal(rating.toFixed(2)),
        },
      });
    });
  }

  updateAlbumReviewDescription(id: string, description: string) {
    return this.prisma.review.update({ where: { id }, data: { description } });
  }

  // Decrements the same Track/Album+Artist reviewCount counters that create()
  // incremented (docs/fase-2-features.md) — symmetric, so the counters always
  // reflect only currently-ACTIVE reviews. See also ModerationRepository
  // .hideReviewIfActive for the equivalent decrement on the moderation path.
  softDelete(
    id: string,
    type: 'TRACK' | 'ALBUM',
    trackId: string | null,
    albumId: string | null,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const review = await tx.review.update({
        where: { id },
        data: { status: 'DELETED', deletedAt: new Date() },
      });
      if (type === 'TRACK') {
        const track = await tx.track.update({
          where: { id: trackId! },
          data: { reviewCount: { decrement: 1 } },
        });
        await tx.artist.update({
          where: { id: track.artistId },
          data: { reviewCount: { decrement: 1 } },
        });
      } else {
        const album = await tx.album.update({
          where: { id: albumId! },
          data: { reviewCount: { decrement: 1 } },
        });
        await tx.artist.update({
          where: { id: album.artistId },
          data: { reviewCount: { decrement: 1 } },
        });
      }
      return review;
    });
  }

  async listByAlbum(
    albumId: string,
    cursor: string | undefined,
    limit: number,
    sort: SortMode,
    viewerId?: string,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = decodeIdCursor(cursor);
    const reviews = await this.prisma.review.findMany({
      where: {
        albumId,
        type: 'ALBUM',
        status: 'ACTIVE',
        deletedAt: null,
        // Excluye reseñas solo-puntuación (sin texto) — description ahora es
        // opcional al crear (docs/fase-3-features.md), pero estos listados
        // públicos de reseñas siguen siendo solo para reseñas con texto.
        description: { not: null },
        ...this.buildVisibilityFilter(viewerId),
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
    return paginate(reviews, take);
  }

  async listByTrack(
    trackId: string,
    cursor: string | undefined,
    limit: number,
    sort: SortMode,
    viewerId?: string,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = decodeIdCursor(cursor);
    const reviews = await this.prisma.review.findMany({
      where: {
        trackId,
        type: 'TRACK',
        status: 'ACTIVE',
        deletedAt: null,
        // Excluye reseñas solo-puntuación (sin texto) — ver nota en listByAlbum.
        description: { not: null },
        ...this.buildVisibilityFilter(viewerId),
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
    return paginate(reviews, take);
  }

  // Filtra a nivel de where (no post-proceso) para no romper el cálculo de
  // hasMore/cursor: las reseñas de un dueño privado solo son visibles si el
  // viewer es el dueño o lo sigue (Follow aceptado).
  private buildVisibilityFilter(viewerId?: string): Prisma.ReviewWhereInput {
    if (!viewerId) return { user: { isPrivate: false } };
    return {
      OR: [
        { user: { isPrivate: false } },
        { userId: viewerId },
        { user: { followers: { some: { followerId: viewerId } } } },
      ],
    };
  }

  async listByUserId(
    userId: string,
    cursor: string | undefined,
    limit: number,
    sort: UserReviewSortMode,
    textQuery?: string,
  ) {
    const take = Math.min(limit, 50);
    const cursorId = decodeIdCursor(cursor);
    const reviews = await this.prisma.review.findMany({
      where: {
        userId,
        status: 'ACTIVE',
        deletedAt: null,
        ...(textQuery && {
          OR: [
            { externalTitle: { contains: textQuery, mode: 'insensitive' } },
            {
              externalArtistName: { contains: textQuery, mode: 'insensitive' },
            },
          ],
        }),
      },
      orderBy: this.buildUserReviewsOrderBy(sort),
      take: take + 1,
      ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
      include: { user: { select: { avatarUrl: true } } },
    });
    return paginate(reviews, take);
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

  // Ascending primary sorts pair with an ascending id tiebreaker (descending
  // with descending) — required so cursor pagination (cursor:{id}, skip:1)
  // never skips/repeats a row, docs/fase-3-features.md.
  private buildUserReviewsOrderBy(sort: UserReviewSortMode) {
    switch (sort) {
      case 'oldest':
        return [{ createdAt: 'asc' as const }, { id: 'asc' as const }];
      case 'best':
        return [
          { rating: 'desc' as const },
          { createdAt: 'desc' as const },
          { id: 'desc' as const },
        ];
      case 'worst':
        return [
          { rating: 'asc' as const },
          { createdAt: 'asc' as const },
          { id: 'asc' as const },
        ];
      default:
        return [{ createdAt: 'desc' as const }, { id: 'desc' as const }];
    }
  }
}
