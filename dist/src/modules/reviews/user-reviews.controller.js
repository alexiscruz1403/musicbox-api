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
import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator.js';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { ListUserReviewsQueryDto } from './dto/list-user-reviews-query.dto.js';
import { ReviewsService } from './reviews.service.js';
let UserReviewsController = class UserReviewsController {
    reviews;
    constructor(reviews) {
        this.reviews = reviews;
    }
    async getReviews(handle, query, req) {
        const result = await this.reviews.listByUserHandle(handle, query, req.user?.sub);
        return { data: result.items, meta: { cursor: result.nextCursor } };
    }
};
__decorate([
    Get('users/:handle/reviews'),
    __param(0, Param('handle')),
    __param(1, Query()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ListUserReviewsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], UserReviewsController.prototype, "getReviews", null);
UserReviewsController = __decorate([
    Public(),
    UseGuards(OptionalJwtAuthGuard),
    Controller(),
    __metadata("design:paramtypes", [ReviewsService])
], UserReviewsController);
export { UserReviewsController };
//# sourceMappingURL=user-reviews.controller.js.map