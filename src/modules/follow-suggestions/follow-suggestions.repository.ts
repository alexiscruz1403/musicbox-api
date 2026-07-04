import { Injectable } from '@nestjs/common';
import type { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class FollowSuggestionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ── Signal gathering ──────────────────────────────────────────
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

  getOwnLikeSignals(userId: string) {
    return this.prisma.reviewReaction.findMany({
      where: { userId, type: 'LIKE' },
      select: {
        review: {
          select: {
            albumId: true,
            trackId: true,
            album: { select: { artistId: true } },
            track: { select: { artistId: true } },
          },
        },
      },
    });
  }

  // ── Candidate matching (skip query when the id-set is empty) ───
  findReviewsByAlbumIds(albumIds: string[]) {
    if (albumIds.length === 0) return Promise.resolve([]);
    return this.prisma.review.findMany({
      where: { albumId: { in: albumIds }, status: 'ACTIVE', deletedAt: null },
      select: { userId: true, albumId: true },
    });
  }

  findReviewsByTrackIds(trackIds: string[]) {
    if (trackIds.length === 0) return Promise.resolve([]);
    return this.prisma.review.findMany({
      where: { trackId: { in: trackIds }, status: 'ACTIVE', deletedAt: null },
      select: { userId: true, trackId: true },
    });
  }

  findReviewsByArtistIds(artistIds: string[]) {
    if (artistIds.length === 0) return Promise.resolve([]);
    return this.prisma.review.findMany({
      where: {
        status: 'ACTIVE',
        deletedAt: null,
        OR: [
          { album: { artistId: { in: artistIds } } },
          { track: { artistId: { in: artistIds } } },
        ],
      },
      select: {
        userId: true,
        album: { select: { artistId: true } },
        track: { select: { artistId: true } },
      },
    });
  }

  findLikesByAlbumIds(albumIds: string[]) {
    if (albumIds.length === 0) return Promise.resolve([]);
    return this.prisma.reviewReaction.findMany({
      where: {
        type: 'LIKE',
        review: {
          albumId: { in: albumIds },
          status: 'ACTIVE',
          deletedAt: null,
        },
      },
      select: { userId: true, review: { select: { albumId: true } } },
    });
  }

  findLikesByTrackIds(trackIds: string[]) {
    if (trackIds.length === 0) return Promise.resolve([]);
    return this.prisma.reviewReaction.findMany({
      where: {
        type: 'LIKE',
        review: {
          trackId: { in: trackIds },
          status: 'ACTIVE',
          deletedAt: null,
        },
      },
      select: { userId: true, review: { select: { trackId: true } } },
    });
  }

  findLikesByArtistIds(artistIds: string[]) {
    if (artistIds.length === 0) return Promise.resolve([]);
    return this.prisma.reviewReaction.findMany({
      where: {
        type: 'LIKE',
        review: {
          status: 'ACTIVE',
          deletedAt: null,
          OR: [
            { album: { artistId: { in: artistIds } } },
            { track: { artistId: { in: artistIds } } },
          ],
        },
      },
      select: {
        userId: true,
        review: {
          select: {
            album: { select: { artistId: true } },
            track: { select: { artistId: true } },
          },
        },
      },
    });
  }

  getFollowedIds(userId: string) {
    return this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followeeId: true },
    });
  }

  findPopularUsers(excludeIds: string[], limit: number) {
    if (limit <= 0) return Promise.resolve([]);
    return this.prisma.user.findMany({
      where: { id: { notIn: excludeIds }, status: 'ACTIVE' },
      orderBy: { followers: { _count: 'desc' } },
      take: limit,
      select: { id: true, handle: true, displayName: true, avatarUrl: true },
    });
  }

  hydrateUsers(ids: string[]) {
    if (ids.length === 0) return Promise.resolve([]);
    return this.prisma.user.findMany({
      where: { id: { in: ids }, status: 'ACTIVE' },
      select: { id: true, handle: true, displayName: true, avatarUrl: true },
    });
  }

  getSnapshot(userId: string) {
    return this.prisma.followSuggestionSnapshot.findUnique({
      where: { userId },
    });
  }

  upsertSnapshot(
    userId: string,
    payload: Prisma.InputJsonValue,
    generatedAt: Date,
  ) {
    return this.prisma.followSuggestionSnapshot.upsert({
      where: { userId },
      create: { userId, payload, generatedAt },
      update: { payload, generatedAt },
    });
  }
}
