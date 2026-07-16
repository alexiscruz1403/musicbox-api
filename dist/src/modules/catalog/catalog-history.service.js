var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CatalogHistoryService_1;
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CatalogHistoryRepository } from './catalog-history.repository.js';
const ALBUM = 'ALBUM';
const TRACK = 'TRACK';
const ARTIST = 'ARTIST';
let CatalogHistoryService = CatalogHistoryService_1 = class CatalogHistoryService {
    repo;
    logger = new Logger(CatalogHistoryService_1.name);
    constructor(repo) {
        this.repo = repo;
    }
    async recordSearch(userId, query) {
        try {
            await this.repo.upsertSearchHistory(userId, query);
        }
        catch (err) {
            this.logger.warn(`Failed to record catalog search history: ${err}`);
        }
    }
    async listSearchHistory(userId) {
        return this.repo.listSearchHistory(userId);
    }
    async deleteSearchHistoryItem(userId, id) {
        const deleted = await this.repo.deleteSearchHistoryItem(userId, id);
        if (!deleted)
            throw new NotFoundException('Search history item not found');
    }
    async deleteAllSearchHistory(userId) {
        await this.repo.deleteAllSearchHistory(userId);
    }
    async recordAlbumView(userId, album) {
        try {
            await this.repo.upsertRecentlyViewed(userId, ALBUM, album.deezerId, {
                title: album.title,
                artistName: album.artist.name,
                coverUrl: album.coverUrl,
                albumsCount: null,
            });
        }
        catch (err) {
            this.logger.warn(`Failed to record recently-viewed album: ${err}`);
        }
    }
    async recordTrackView(userId, track) {
        try {
            await this.repo.upsertRecentlyViewed(userId, TRACK, track.deezerId, {
                title: track.title,
                artistName: track.artist.name,
                coverUrl: track.coverUrl,
                albumsCount: null,
            });
        }
        catch (err) {
            this.logger.warn(`Failed to record recently-viewed track: ${err}`);
        }
    }
    async recordArtistView(userId, artist) {
        try {
            await this.repo.upsertRecentlyViewed(userId, ARTIST, artist.deezerId, {
                title: artist.name,
                artistName: null,
                coverUrl: artist.imageUrl,
                albumsCount: artist.albumsCount,
            });
        }
        catch (err) {
            this.logger.warn(`Failed to record recently-viewed artist: ${err}`);
        }
    }
    async listRecentlyViewed(userId) {
        return this.repo.listRecentlyViewed(userId);
    }
};
CatalogHistoryService = CatalogHistoryService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CatalogHistoryRepository])
], CatalogHistoryService);
export { CatalogHistoryService };
//# sourceMappingURL=catalog-history.service.js.map