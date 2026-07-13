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
import { decodeCatalogCursor, encodeCatalogCursor, } from './catalog-cursor.util.js';
let CatalogRepository = class CatalogRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    upsertArtist(data) {
        const now = new Date();
        return this.prisma.artist.upsert({
            where: { deezerId: data.deezerId },
            update: { name: data.name, imageUrl: data.imageUrl, lastSyncedAt: now },
            create: {
                deezerId: data.deezerId,
                name: data.name,
                imageUrl: data.imageUrl,
                lastSyncedAt: now,
            },
        });
    }
    upsertAlbum(data, artistId) {
        const now = new Date();
        const releaseDate = data.releaseDate ? new Date(data.releaseDate) : null;
        return this.prisma.album.upsert({
            where: { deezerId: data.deezerId },
            update: {
                title: data.title,
                coverUrl: data.coverUrl,
                releaseDate,
                genreLabel: data.genreLabel,
                lastSyncedAt: now,
            },
            create: {
                deezerId: data.deezerId,
                title: data.title,
                artistId,
                coverUrl: data.coverUrl,
                releaseDate,
                genreLabel: data.genreLabel,
                lastSyncedAt: now,
            },
        });
    }
    findStaleArtists(olderThan, take) {
        return this.prisma.artist.findMany({
            where: {
                OR: [{ catalogSyncedAt: null }, { catalogSyncedAt: { lt: olderThan } }],
            },
            take,
        });
    }
    findArtistByDeezerId(deezerId) {
        return this.prisma.artist.findUnique({ where: { deezerId } });
    }
    markCatalogSynced(artistId, when) {
        return this.prisma.artist.update({
            where: { id: artistId },
            data: { catalogSyncedAt: when },
        });
    }
    async findTracksByArtist(artistId, cursor, limit) {
        const cursorId = decodeCatalogCursor(cursor);
        const [rows, total] = await Promise.all([
            this.prisma.track.findMany({
                where: { artistId },
                orderBy: { id: 'asc' },
                take: limit + 1,
                ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
                include: {
                    artist: true,
                    album: {
                        select: {
                            deezerId: true,
                            title: true,
                            coverUrl: true,
                            releaseDate: true,
                        },
                    },
                },
            }),
            this.prisma.track.count({ where: { artistId } }),
        ]);
        const hasMore = rows.length > limit;
        const items = hasMore ? rows.slice(0, limit) : rows;
        const nextCursor = hasMore
            ? encodeCatalogCursor(items[items.length - 1].id)
            : null;
        return { items, nextCursor, total };
    }
    async topReviewedAlbumIds(artistId, take) {
        const groups = await this.prisma.review.groupBy({
            by: ['albumId'],
            where: {
                type: 'ALBUM',
                status: 'ACTIVE',
                deletedAt: null,
                albumId: { not: null },
                album: { artistId },
            },
            _count: { albumId: true },
            _avg: { rating: true },
            orderBy: [{ _count: { albumId: 'desc' } }, { _avg: { rating: 'desc' } }],
            take,
        });
        return groups.map((g) => ({
            id: g.albumId,
            reviewCount: g._count.albumId,
            avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
        }));
    }
    async topReviewedTrackIds(artistId, take) {
        const groups = await this.prisma.review.groupBy({
            by: ['trackId'],
            where: {
                type: 'TRACK',
                status: 'ACTIVE',
                deletedAt: null,
                trackId: { not: null },
                track: { artistId },
            },
            _count: { trackId: true },
            _avg: { rating: true },
            orderBy: [{ _count: { trackId: 'desc' } }, { _avg: { rating: 'desc' } }],
            take,
        });
        return groups.map((g) => ({
            id: g.trackId,
            reviewCount: g._count.trackId,
            avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
        }));
    }
    async trendingAlbumIds(artistId, take, windowStart) {
        const groups = await this.prisma.review.groupBy({
            by: ['albumId'],
            where: {
                type: 'ALBUM',
                status: 'ACTIVE',
                deletedAt: null,
                albumId: { not: null },
                album: { artistId },
                createdAt: { gte: windowStart },
            },
            _count: { albumId: true },
            _avg: { rating: true },
            orderBy: [{ _count: { albumId: 'desc' } }, { _avg: { rating: 'desc' } }],
            take,
        });
        return groups.map((g) => ({
            id: g.albumId,
            reviewCount: g._count.albumId,
            avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
        }));
    }
    async trendingTrackIds(artistId, take, windowStart) {
        const groups = await this.prisma.review.groupBy({
            by: ['trackId'],
            where: {
                type: 'TRACK',
                status: 'ACTIVE',
                deletedAt: null,
                trackId: { not: null },
                track: { artistId },
                createdAt: { gte: windowStart },
            },
            _count: { trackId: true },
            _avg: { rating: true },
            orderBy: [{ _count: { trackId: 'desc' } }, { _avg: { rating: 'desc' } }],
            take,
        });
        return groups.map((g) => ({
            id: g.trackId,
            reviewCount: g._count.trackId,
            avgRating: g._avg.rating ? Number(g._avg.rating) : 0,
        }));
    }
    hydrateAlbumSummaries(ids) {
        if (ids.length === 0)
            return Promise.resolve([]);
        return this.prisma.album.findMany({
            where: { id: { in: ids } },
            include: { artist: true },
        });
    }
    hydrateTrackSummaries(ids) {
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
    upsertTrack(data, artistId, albumId) {
        const now = new Date();
        return this.prisma.track.upsert({
            where: { deezerId: data.deezerId },
            update: {
                title: data.title,
                durationMs: data.durationMs,
                trackNumber: data.trackNumber,
                previewUrl: data.previewUrl,
                lastSyncedAt: now,
            },
            create: {
                deezerId: data.deezerId,
                title: data.title,
                artistId,
                albumId,
                durationMs: data.durationMs,
                trackNumber: data.trackNumber,
                previewUrl: data.previewUrl,
                lastSyncedAt: now,
            },
        });
    }
};
CatalogRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CatalogRepository);
export { CatalogRepository };
//# sourceMappingURL=catalog.repository.js.map