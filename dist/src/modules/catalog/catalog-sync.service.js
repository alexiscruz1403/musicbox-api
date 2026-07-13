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
var CatalogSyncService_1;
import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service.js';
import { CATALOG_STALENESS_DAYS, CATALOG_SYNC_BATCH_SIZE, } from './catalog.constants.js';
import { CatalogRepository } from './catalog.repository.js';
import { MUSIC_CATALOG_PROVIDER, } from './providers/music-catalog.provider.js';
const ARTIST_ALBUMS_PAGE_SIZE = 50;
let CatalogSyncService = CatalogSyncService_1 = class CatalogSyncService {
    catalogProvider;
    repo;
    redis;
    logger = new Logger(CatalogSyncService_1.name);
    constructor(catalogProvider, repo, redis) {
        this.catalogProvider = catalogProvider;
        this.repo = repo;
        this.redis = redis;
    }
    async syncStaleArtists() {
        const threshold = new Date(Date.now() - CATALOG_STALENESS_DAYS * 24 * 60 * 60 * 1000);
        const staleArtists = await this.repo.findStaleArtists(threshold, CATALOG_SYNC_BATCH_SIZE);
        for (const artist of staleArtists) {
            try {
                await this.syncArtist(artist.deezerId);
            }
            catch (err) {
                this.logger.error(`Failed to sync artist ${artist.deezerId}: ${err.message}`);
            }
        }
    }
    async ensureArtistSynced(deezerId) {
        const threshold = new Date(Date.now() - CATALOG_STALENESS_DAYS * 24 * 60 * 60 * 1000);
        const existing = await this.repo.findArtistByDeezerId(deezerId);
        if (existing?.catalogSyncedAt && existing.catalogSyncedAt >= threshold) {
            return existing;
        }
        return this.syncArtist(deezerId);
    }
    async syncArtist(deezerId) {
        const freshArtist = await this.catalogProvider.getArtist(deezerId);
        const artistRow = await this.repo.upsertArtist(freshArtist);
        await this.redis.del(`catalog:artist:${deezerId}`);
        const albums = await this.fetchFullDiscography(deezerId);
        await this.redis.deleteByPattern(`catalog:artist-albums:${deezerId}:*`);
        for (const albumSummary of albums) {
            const fullAlbum = await this.catalogProvider.getAlbum(albumSummary.deezerId);
            const persistedAlbum = await this.repo.upsertAlbum(fullAlbum, artistRow.id);
            await this.redis.del(`catalog:album:${fullAlbum.deezerId}`);
            for (const track of fullAlbum.tracks) {
                await this.repo.upsertTrack(track, artistRow.id, persistedAlbum.id);
                await this.redis.del(`catalog:track:${track.deezerId}`);
            }
        }
        await this.redis.deleteByPattern(`catalog:artist-tracks:${deezerId}:*`);
        await this.redis.del(`catalog:artist-detail:${deezerId}`);
        return this.repo.markCatalogSynced(artistRow.id, new Date());
    }
    async fetchFullDiscography(deezerId) {
        const albums = [];
        let cursor = null;
        do {
            const page = await this.catalogProvider.getArtistAlbums(deezerId, ARTIST_ALBUMS_PAGE_SIZE, cursor);
            albums.push(...page.items.map((item) => ({ deezerId: item.deezerId })));
            cursor = page.nextCursor;
        } while (cursor !== null);
        return albums;
    }
};
CatalogSyncService = CatalogSyncService_1 = __decorate([
    Injectable(),
    __param(0, Inject(MUSIC_CATALOG_PROVIDER)),
    __metadata("design:paramtypes", [Object, CatalogRepository,
        RedisService])
], CatalogSyncService);
export { CatalogSyncService };
//# sourceMappingURL=catalog-sync.service.js.map