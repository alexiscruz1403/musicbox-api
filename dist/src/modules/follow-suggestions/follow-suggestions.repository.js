var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
let FollowSuggestionsRepository = class FollowSuggestionsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getOwnReviewSignals(userId) {
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
    getOwnLikeSignals(userId) {
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
    findReviewsByAlbumIds(albumIds) {
        if (albumIds.length === 0)
            return Promise.resolve([]);
        return this.prisma.review.findMany({
            where: { albumId: { in: albumIds }, status: 'ACTIVE', deletedAt: null },
            select: { userId: true, albumId: true },
        });
    }
    findReviewsByTrackIds(trackIds) {
        if (trackIds.length === 0)
            return Promise.resolve([]);
        return this.prisma.review.findMany({
            where: { trackId: { in: trackIds }, status: 'ACTIVE', deletedAt: null },
            select: { userId: true, trackId: true },
        });
    }
    findReviewsByArtistIds(artistIds) {
        if (artistIds.length === 0)
            return Promise.resolve([]);
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
    findLikesByAlbumIds(albumIds) {
        if (albumIds.length === 0)
            return Promise.resolve([]);
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
    findLikesByTrackIds(trackIds) {
        if (trackIds.length === 0)
            return Promise.resolve([]);
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
    findLikesByArtistIds(artistIds) {
        if (artistIds.length === 0)
            return Promise.resolve([]);
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
    getFollowedIds(userId) {
        return this.prisma.follow.findMany({
            where: { followerId: userId },
            select: { followeeId: true },
        });
    }
    findPopularUsers(excludeIds, limit) {
        if (limit <= 0)
            return Promise.resolve([]);
        return this.prisma.user.findMany({
            where: { id: { notIn: excludeIds }, status: 'ACTIVE' },
            orderBy: { followers: { _count: 'desc' } },
            take: limit,
            select: { id: true, handle: true, displayName: true, avatarUrl: true },
        });
    }
    hydrateUsers(ids) {
        if (ids.length === 0)
            return Promise.resolve([]);
        return this.prisma.user.findMany({
            where: { id: { in: ids }, status: 'ACTIVE' },
            select: { id: true, handle: true, displayName: true, avatarUrl: true },
        });
    }
    getSnapshot(userId) {
        return this.prisma.followSuggestionSnapshot.findUnique({
            where: { userId },
        });
    }
    upsertSnapshot(userId, payload, generatedAt) {
        return this.prisma.followSuggestionSnapshot.upsert({
            where: { userId },
            create: { userId, payload, generatedAt },
            update: { payload, generatedAt },
        });
    }
};
FollowSuggestionsRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], FollowSuggestionsRepository);
export { FollowSuggestionsRepository };
//# sourceMappingURL=follow-suggestions.repository.js.map