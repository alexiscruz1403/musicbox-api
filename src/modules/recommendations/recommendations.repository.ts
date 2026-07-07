import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MIN_FAVORITE_ARTIST_RATING } from './recommendations.constants.js';

@Injectable()
export class RecommendationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  countActiveReviews(userId: string): Promise<number> {
    return this.prisma.review.count({
      where: { userId, status: 'ACTIVE', deletedAt: null },
    });
  }

  // Reviews rated >= MIN_FAVORITE_ARTIST_RATING — grouped by artist in the
  // service (any artist with at least one qualifying review becomes a
  // similar-artist seed), same style as FollowSuggestionsService.gatherSignals.
  getFavoriteArtistSignals(userId: string) {
    return this.prisma.review.findMany({
      where: {
        userId,
        status: 'ACTIVE',
        deletedAt: null,
        rating: { gte: MIN_FAVORITE_ARTIST_RATING },
      },
      select: {
        album: {
          select: { artistId: true, artist: { select: { name: true } } },
        },
        track: {
          select: { artistId: true, artist: { select: { name: true } } },
        },
      },
    });
  }

  getGenreSignals(userId: string) {
    return this.prisma.review.findMany({
      where: { userId, status: 'ACTIVE', deletedAt: null },
      select: {
        album: { select: { genreLabel: true } },
        track: { select: { album: { select: { genreLabel: true } } } },
      },
    });
  }

  getReviewedAlbumDeezerIds(userId: string) {
    return this.prisma.review.findMany({
      where: { userId, status: 'ACTIVE', deletedAt: null },
      select: {
        album: { select: { deezerId: true } },
        track: { select: { album: { select: { deezerId: true } } } },
      },
    });
  }

  findAlbumsByGenres(
    genres: string[],
    excludeDeezerIds: string[],
    limit: number,
  ) {
    if (genres.length === 0 || limit <= 0) return Promise.resolve([]);
    return this.prisma.album.findMany({
      where: {
        genreLabel: { in: genres },
        deezerId: { notIn: excludeDeezerIds },
      },
      include: { artist: true },
      take: limit,
    });
  }

  listUserIdsWithSnapshot(): Promise<{ userId: string }[]> {
    return this.prisma.recommendationSnapshot.findMany({
      select: { userId: true },
    });
  }

  getSnapshot(userId: string) {
    return this.prisma.recommendationSnapshot.findUnique({ where: { userId } });
  }

  upsertSnapshot(
    userId: string,
    payload: Prisma.InputJsonValue,
    generatedAt: Date,
  ) {
    return this.prisma.recommendationSnapshot.upsert({
      where: { userId },
      create: { userId, payload, generatedAt },
      update: { payload, generatedAt },
    });
  }
}
