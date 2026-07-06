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
import { TRENDING_TOP_N, TRENDING_WINDOW_DAYS } from './trending.constants.js';
let TrendingRepository = class TrendingRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    windowStart() {
        return new Date(Date.now() - TRENDING_WINDOW_DAYS * 24 * 60 * 60 * 1000);
    }
    async topAlbumGroups() {
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
            id: g.albumId,
            reviewCount: g._count.albumId,
            avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
        }));
    }
    async topTrackGroups() {
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
            id: g.trackId,
            reviewCount: g._count.trackId,
            avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
        }));
    }
    hydrateAlbums(ids) {
        if (ids.length === 0)
            return Promise.resolve([]);
        return this.prisma.album.findMany({
            where: { id: { in: ids } },
            include: { artist: true },
        });
    }
    hydrateTracks(ids) {
        if (ids.length === 0)
            return Promise.resolve([]);
        return this.prisma.track.findMany({
            where: { id: { in: ids } },
            include: {
                artist: true,
                album: { select: { deezerId: true, coverUrl: true } },
            },
        });
    }
    saveSnapshot(payload) {
        return this.prisma.trendingSnapshot.create({ data: { payload } });
    }
};
TrendingRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TrendingRepository);
export { TrendingRepository };
//# sourceMappingURL=trending.repository.js.map