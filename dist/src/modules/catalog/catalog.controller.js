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
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const openapi = __require("@nestjs/swagger");
import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../common/decorators/public.decorator.js';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogHistoryService } from './catalog-history.service.js';
import { CatalogQuickSearchService } from './catalog-quick-search.service.js';
import { CatalogService } from './catalog.service.js';
import { ArtistTracksQueryDto } from './dto/artist-tracks-query.dto.js';
import { QuickSearchCatalogDto } from './dto/quick-search-catalog.dto.js';
import { SearchCatalogDto } from './dto/search-catalog.dto.js';
let CatalogController = class CatalogController {
    catalog;
    artistDetail;
    quickSearch;
    history;
    constructor(catalog, artistDetail, quickSearch, history) {
        this.catalog = catalog;
        this.artistDetail = artistDetail;
        this.quickSearch = quickSearch;
        this.history = history;
    }
    async search(dto, req) {
        const result = await this.catalog.search(dto.q, dto.type, dto.limit, dto.cursor ?? null, req.user?.sub);
        if (req.user) {
            await this.history.recordSearch(req.user.sub, dto.q);
        }
        return { data: result };
    }
    async quickSearchCatalog(dto) {
        return { data: await this.quickSearch.quickSearch(dto.q) };
    }
    async getAlbum(deezerId, req) {
        const album = await this.catalog.getAlbum(deezerId, req.user?.sub);
        return { data: album };
    }
    async getTrack(deezerId, req) {
        const track = await this.catalog.getTrack(deezerId, req.user?.sub);
        return { data: track };
    }
    async getArtistAlbums(deezerId, dto) {
        return {
            data: await this.catalog.getArtistAlbums(deezerId, dto.limit, dto.cursor ?? null),
        };
    }
    async getArtist(deezerId) {
        return { data: await this.artistDetail.getDetail(deezerId) };
    }
    async getArtistTracks(deezerId, dto) {
        return {
            data: await this.catalog.getArtistTracks(deezerId, dto.limit, dto.cursor ?? null),
        };
    }
};
__decorate([
    Get('search'),
    UseGuards(OptionalJwtAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, Query()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SearchCatalogDto, Object]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "search", null);
__decorate([
    Get('quick-search'),
    Throttle({ default: { limit: 30, ttl: 60 } }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuickSearchCatalogDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "quickSearchCatalog", null);
__decorate([
    Get('albums/:deezerId'),
    UseGuards(OptionalJwtAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, Param('deezerId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getAlbum", null);
__decorate([
    Get('tracks/:deezerId'),
    UseGuards(OptionalJwtAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, Param('deezerId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getTrack", null);
__decorate([
    Get('artists/:deezerId/albums'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, Param('deezerId')),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ArtistTracksQueryDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getArtistAlbums", null);
__decorate([
    Get('artists/:deezerId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, Param('deezerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getArtist", null);
__decorate([
    Get('artists/:deezerId/tracks'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, Param('deezerId')),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ArtistTracksQueryDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getArtistTracks", null);
CatalogController = __decorate([
    Public(),
    Controller('catalog'),
    __metadata("design:paramtypes", [CatalogService,
        ArtistDetailService,
        CatalogQuickSearchService,
        CatalogHistoryService])
], CatalogController);
export { CatalogController };
//# sourceMappingURL=catalog.controller.js.map