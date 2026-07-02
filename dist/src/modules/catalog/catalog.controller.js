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
import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator.js';
import { CatalogService } from './catalog.service.js';
import { SearchCatalogDto } from './dto/search-catalog.dto.js';
let CatalogController = class CatalogController {
    catalog;
    constructor(catalog) {
        this.catalog = catalog;
    }
    async search(dto) {
        return {
            data: await this.catalog.search(dto.q, dto.type, dto.limit, dto.cursor ?? null),
        };
    }
    async getAlbum(deezerId) {
        return { data: await this.catalog.getAlbum(deezerId) };
    }
    async getTrack(deezerId) {
        return { data: await this.catalog.getTrack(deezerId) };
    }
    async getArtistAlbums(deezerId, limit, cursor) {
        const parsedLimit = limit
            ? Math.min(Math.max(parseInt(limit, 10), 1), 50)
            : 20;
        return {
            data: await this.catalog.getArtistAlbums(deezerId, parsedLimit, cursor ?? null),
        };
    }
    async getArtist(deezerId) {
        return { data: await this.catalog.getArtist(deezerId) };
    }
};
__decorate([
    Get('search'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SearchCatalogDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "search", null);
__decorate([
    Get('albums/:deezerId'),
    __param(0, Param('deezerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getAlbum", null);
__decorate([
    Get('tracks/:deezerId'),
    __param(0, Param('deezerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getTrack", null);
__decorate([
    Get('artists/:deezerId/albums'),
    __param(0, Param('deezerId')),
    __param(1, Query('limit')),
    __param(2, Query('cursor')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getArtistAlbums", null);
__decorate([
    Get('artists/:deezerId'),
    __param(0, Param('deezerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getArtist", null);
CatalogController = __decorate([
    Public(),
    Controller('catalog'),
    __metadata("design:paramtypes", [CatalogService])
], CatalogController);
export { CatalogController };
//# sourceMappingURL=catalog.controller.js.map