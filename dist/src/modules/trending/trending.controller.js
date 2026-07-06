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
import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator.js';
import { ListTrendingQueryDto } from './dto/list-trending-query.dto.js';
import { TrendingService } from './trending.service.js';
let TrendingController = class TrendingController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAlbums(query) {
        return { data: await this.service.getAlbums(query.limit) };
    }
    async getTracks(query) {
        return { data: await this.service.getTracks(query.limit) };
    }
};
__decorate([
    Get('albums'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListTrendingQueryDto]),
    __metadata("design:returntype", Promise)
], TrendingController.prototype, "getAlbums", null);
__decorate([
    Get('tracks'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListTrendingQueryDto]),
    __metadata("design:returntype", Promise)
], TrendingController.prototype, "getTracks", null);
TrendingController = __decorate([
    Public(),
    Controller('trending'),
    __metadata("design:paramtypes", [TrendingService])
], TrendingController);
export { TrendingController };
//# sourceMappingURL=trending.controller.js.map