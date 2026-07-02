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
import { ListReviewsQueryDto } from './dto/list-reviews-query.dto.js';
import { ReviewsService } from './reviews.service.js';
let AlbumTrackReviewsController = class AlbumTrackReviewsController {
    reviews;
    constructor(reviews) {
        this.reviews = reviews;
    }
    async listByAlbum(deezerId, query) {
        const result = await this.reviews.listByAlbum(deezerId, query);
        return { data: result.items, meta: { cursor: result.nextCursor } };
    }
    async listByTrack(deezerId, query) {
        const result = await this.reviews.listByTrack(deezerId, query);
        return { data: result.items, meta: { cursor: result.nextCursor } };
    }
};
__decorate([
    Get('albums/:deezerId/reviews'),
    __param(0, Param('deezerId')),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ListReviewsQueryDto]),
    __metadata("design:returntype", Promise)
], AlbumTrackReviewsController.prototype, "listByAlbum", null);
__decorate([
    Get('tracks/:deezerId/reviews'),
    __param(0, Param('deezerId')),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ListReviewsQueryDto]),
    __metadata("design:returntype", Promise)
], AlbumTrackReviewsController.prototype, "listByTrack", null);
AlbumTrackReviewsController = __decorate([
    Public(),
    Controller(),
    __metadata("design:paramtypes", [ReviewsService])
], AlbumTrackReviewsController);
export { AlbumTrackReviewsController };
//# sourceMappingURL=album-track-reviews.controller.js.map