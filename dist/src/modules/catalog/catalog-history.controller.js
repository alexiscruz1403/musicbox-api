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
import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { CatalogHistoryService } from './catalog-history.service.js';
let CatalogHistoryController = class CatalogHistoryController {
    history;
    constructor(history) {
        this.history = history;
    }
    async listSearchHistory(user) {
        return { data: await this.history.listSearchHistory(user.sub) };
    }
    async deleteSearchHistoryItem(user, id) {
        await this.history.deleteSearchHistoryItem(user.sub, id);
    }
    async deleteAllSearchHistory(user) {
        await this.history.deleteAllSearchHistory(user.sub);
    }
    async listRecentlyViewed(user) {
        return { data: await this.history.listRecentlyViewed(user.sub) };
    }
    async listRecentlyViewedDetails(user) {
        return { data: await this.history.getRecentlyViewedDetails(user.sub) };
    }
    async recordAlbumView(user, deezerId) {
        await this.history.viewAlbum(user.sub, deezerId);
    }
    async recordTrackView(user, deezerId) {
        await this.history.viewTrack(user.sub, deezerId);
    }
    async recordArtistView(user, deezerId) {
        await this.history.viewArtist(user.sub, deezerId);
    }
};
__decorate([
    Get('search-history'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogHistoryController.prototype, "listSearchHistory", null);
__decorate([
    Delete('search-history/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: HttpStatus.NO_CONTENT }),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CatalogHistoryController.prototype, "deleteSearchHistoryItem", null);
__decorate([
    Delete('search-history'),
    HttpCode(HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: HttpStatus.NO_CONTENT }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogHistoryController.prototype, "deleteAllSearchHistory", null);
__decorate([
    Get('recently-viewed'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogHistoryController.prototype, "listRecentlyViewed", null);
__decorate([
    Get('recently-viewed/details'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogHistoryController.prototype, "listRecentlyViewedDetails", null);
__decorate([
    Post('albums/:deezerId/view'),
    HttpCode(HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: HttpStatus.NO_CONTENT }),
    __param(0, CurrentUser()),
    __param(1, Param('deezerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CatalogHistoryController.prototype, "recordAlbumView", null);
__decorate([
    Post('tracks/:deezerId/view'),
    HttpCode(HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: HttpStatus.NO_CONTENT }),
    __param(0, CurrentUser()),
    __param(1, Param('deezerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CatalogHistoryController.prototype, "recordTrackView", null);
__decorate([
    Post('artists/:deezerId/view'),
    HttpCode(HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: HttpStatus.NO_CONTENT }),
    __param(0, CurrentUser()),
    __param(1, Param('deezerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CatalogHistoryController.prototype, "recordArtistView", null);
CatalogHistoryController = __decorate([
    Controller('catalog'),
    __metadata("design:paramtypes", [CatalogHistoryService])
], CatalogHistoryController);
export { CatalogHistoryController };
//# sourceMappingURL=catalog-history.controller.js.map