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
import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogHistoryRepository } from './catalog-history.repository.js';
import { CatalogService } from './catalog.service.js';
const ALBUM = 'ALBUM';
const TRACK = 'TRACK';
const ARTIST = 'ARTIST';
let CatalogHistoryService = CatalogHistoryService_1 = class CatalogHistoryService {
    repo;
    catalog;
    artistDetail;
    logger = new Logger(CatalogHistoryService_1.name);
    constructor(repo, catalog, artistDetail) {
        this.repo = repo;
        this.catalog = catalog;
        this.artistDetail = artistDetail;
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
            throw new NotFoundException({ code: 'SEARCH_HISTORY_ITEM_NOT_FOUND' });
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
    async getRecentlyViewedDetails(userId) {
        const items = await this.repo.listRecentlyViewed(userId);
        return Promise.all(items.map((item) => this.hydrateOne(item)));
    }
    async hydrateOne(item) {
        try {
            const detail = await this.fetchDetail(item.resourceType, item.deezerId);
            return { ...item, detail, error: null };
        }
        catch (err) {
            return {
                ...item,
                detail: null,
                error: {
                    code: err instanceof NotFoundException ? 'NOT_FOUND' : 'FETCH_FAILED',
                    message: err instanceof Error ? err.message : String(err),
                },
            };
        }
    }
    fetchDetail(resourceType, deezerId) {
        switch (resourceType) {
            case ALBUM:
                return this.catalog.getAlbum(deezerId);
            case TRACK:
                return this.catalog.getTrack(deezerId);
            case ARTIST:
                return this.artistDetail.getDetail(deezerId);
        }
    }
};
CatalogHistoryService = CatalogHistoryService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CatalogHistoryRepository,
        CatalogService,
        ArtistDetailService])
], CatalogHistoryService);
export { CatalogHistoryService };
//# sourceMappingURL=catalog-history.service.js.map