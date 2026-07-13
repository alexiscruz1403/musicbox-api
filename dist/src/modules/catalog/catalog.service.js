var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service.js';
import { CatalogSyncService } from './catalog-sync.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { MUSIC_CATALOG_PROVIDER, } from './providers/music-catalog.provider.js';
let CatalogService = class CatalogService {
    catalogProvider;
    repo;
    redis;
    catalogSyncService;
    CACHE_TTL = 86_400;
    constructor(catalogProvider, repo, redis, catalogSyncService) {
        this.catalogProvider = catalogProvider;
        this.repo = repo;
        this.redis = redis;
        this.catalogSyncService = catalogSyncService;
    }
    async withCache(key, fetcher) {
        const cached = await this.redis.get(key);
        if (cached !== null)
            return JSON.parse(cached);
        const result = await fetcher();
        await this.redis.set(key, JSON.stringify(result), this.CACHE_TTL);
        return result;
    }
    search(query, type, limit, cursor) {
        const key = `catalog:search:${type}:${query}:${limit}:${cursor ?? '0'}`;
        return this.withCache(key, () => this.catalogProvider.search(query, type, limit, cursor));
    }
    getAlbum(deezerId) {
        const key = `catalog:album:${deezerId}`;
        return this.withCache(key, async () => {
            const album = await this.catalogProvider.getAlbum(deezerId);
            const artist = await this.repo.upsertArtist(album.artist);
            const persistedAlbum = await this.repo.upsertAlbum(album, artist.id);
            await Promise.all(album.tracks.map((track) => this.repo.upsertTrack(track, artist.id, persistedAlbum.id)));
            return album;
        });
    }
    getTrack(deezerId) {
        const key = `catalog:track:${deezerId}`;
        return this.withCache(key, async () => {
            const track = await this.catalogProvider.getTrack(deezerId);
            const artist = await this.repo.upsertArtist(track.artist);
            await this.repo.upsertTrack(track, artist.id, null);
            return track;
        });
    }
    getArtist(deezerId) {
        const key = `catalog:artist:${deezerId}`;
        return this.withCache(key, async () => {
            const artist = await this.catalogProvider.getArtist(deezerId);
            await this.repo.upsertArtist(artist);
            return artist;
        });
    }
    getArtistAlbums(deezerId, limit, cursor) {
        const key = `catalog:artist-albums:${deezerId}:${limit}:${cursor ?? '0'}`;
        return this.withCache(key, () => this.catalogProvider.getArtistAlbums(deezerId, limit, cursor));
    }
    getArtistTracks(deezerId, limit, cursor) {
        const key = `catalog:artist-tracks:${deezerId}:${limit}:${cursor ?? '0'}`;
        return this.withCache(key, async () => {
            const artistRow = await this.catalogSyncService.ensureArtistSynced(deezerId);
            const page = await this.repo.findTracksByArtist(artistRow.id, cursor, limit);
            return {
                items: page.items.map((track) => ({
                    deezerId: track.deezerId,
                    title: track.title,
                    artist: {
                        deezerId: track.artist.deezerId,
                        name: track.artist.name,
                        imageUrl: track.artist.imageUrl,
                        fans: 0,
                    },
                    albumDeezerId: track.album?.deezerId ?? null,
                    albumTitle: track.album?.title ?? null,
                    coverUrl: track.album?.coverUrl ?? null,
                    releaseDate: track.album?.releaseDate?.toISOString() ?? null,
                    durationMs: track.durationMs,
                    trackNumber: track.trackNumber,
                    previewUrl: track.previewUrl,
                })),
                nextCursor: page.nextCursor,
                total: page.total,
            };
        });
    }
};
CatalogService = __decorate([
    Injectable(),
    __param(0, Inject(MUSIC_CATALOG_PROVIDER)),
    __metadata("design:paramtypes", [Object, CatalogRepository,
        RedisService,
        CatalogSyncService])
], CatalogService);
export { CatalogService };
//# sourceMappingURL=catalog.service.js.map