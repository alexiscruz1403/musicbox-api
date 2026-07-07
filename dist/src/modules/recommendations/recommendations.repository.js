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
import { MIN_FAVORITE_ARTIST_RATING } from './recommendations.constants.js';
let RecommendationsRepository = class RecommendationsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    countActiveReviews(userId) {
        return this.prisma.review.count({
            where: { userId, status: 'ACTIVE', deletedAt: null },
        });
    }
    getFavoriteArtistSignals(userId) {
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
    getGenreSignals(userId) {
        return this.prisma.review.findMany({
            where: { userId, status: 'ACTIVE', deletedAt: null },
            select: {
                album: { select: { genreLabel: true } },
                track: { select: { album: { select: { genreLabel: true } } } },
            },
        });
    }
    getReviewedAlbumDeezerIds(userId) {
        return this.prisma.review.findMany({
            where: { userId, status: 'ACTIVE', deletedAt: null },
            select: {
                album: { select: { deezerId: true } },
                track: { select: { album: { select: { deezerId: true } } } },
            },
        });
    }
    findAlbumsByGenres(genres, excludeDeezerIds, limit) {
        if (genres.length === 0 || limit <= 0)
            return Promise.resolve([]);
        return this.prisma.album.findMany({
            where: {
                genreLabel: { in: genres },
                deezerId: { notIn: excludeDeezerIds },
            },
            include: { artist: true },
            take: limit,
        });
    }
    listUserIdsWithSnapshot() {
        return this.prisma.recommendationSnapshot.findMany({
            select: { userId: true },
        });
    }
    getSnapshot(userId) {
        return this.prisma.recommendationSnapshot.findUnique({ where: { userId } });
    }
    upsertSnapshot(userId, payload, generatedAt) {
        return this.prisma.recommendationSnapshot.upsert({
            where: { userId },
            create: { userId, payload, generatedAt },
            update: { payload, generatedAt },
        });
    }
};
RecommendationsRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], RecommendationsRepository);
export { RecommendationsRepository };
//# sourceMappingURL=recommendations.repository.js.map