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