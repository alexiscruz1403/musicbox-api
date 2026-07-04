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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards, UseInterceptors, } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { IdempotencyInterceptor } from '../common/interceptors/idempotency.interceptor.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { ReviewsService } from './reviews.service.js';
let ReviewsController = class ReviewsController {
    reviews;
    constructor(reviews) {
        this.reviews = reviews;
    }
    async create(user, dto) {
        return { data: await this.reviews.create(user.sub, dto) };
    }
    async findOne(id, req) {
        return { data: await this.reviews.findById(id, req.user?.sub) };
    }
    async update(user, id, dto) {
        return { data: await this.reviews.update(user.sub, id, dto) };
    }
    async remove(user, id) {
        await this.reviews.remove(user.sub, id);
    }
};
__decorate([
    Post(),
    Throttle({ default: { limit: 10, ttl: 3600 } }),
    UseInterceptors(IdempotencyInterceptor),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
__decorate([
    Public(),
    Get(':id'),
    UseGuards(OptionalJwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "remove", null);
ReviewsController = __decorate([
    Controller('reviews'),
    __metadata("design:paramtypes", [ReviewsService])
], ReviewsController);
export { ReviewsController };
//# sourceMappingURL=reviews.controller.js.map