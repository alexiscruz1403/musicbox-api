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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards, UseInterceptors, } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { NotPenalizedGuard } from '../common/guards/not-penalized.guard.js';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { IdempotencyInterceptor } from '../common/interceptors/idempotency.interceptor.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CreateReactionDto } from './dto/create-reaction.dto.js';
import { ListCommentsQueryDto } from './dto/list-comments-query.dto.js';
import { SocialService } from './social.service.js';
let ReviewSocialController = class ReviewSocialController {
    social;
    constructor(social) {
        this.social = social;
    }
    async react(user, id, dto) {
        return { data: await this.social.react(user.sub, id, dto) };
    }
    async removeReaction(user, id) {
        await this.social.removeReaction(user.sub, id);
    }
    async listComments(id, query, req) {
        const result = await this.social.listComments(id, query, req.user?.sub);
        return { data: result.items, meta: { cursor: result.nextCursor } };
    }
    async createComment(user, id, dto) {
        return { data: await this.social.createComment(user.sub, id, dto) };
    }
};
__decorate([
    Post(':id/reactions'),
    UseInterceptors(IdempotencyInterceptor),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreateReactionDto]),
    __metadata("design:returntype", Promise)
], ReviewSocialController.prototype, "react", null);
__decorate([
    Delete(':id/reactions'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReviewSocialController.prototype, "removeReaction", null);
__decorate([
    Public(),
    Get(':id/comments'),
    UseGuards(OptionalJwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Query()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ListCommentsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ReviewSocialController.prototype, "listComments", null);
__decorate([
    Post(':id/comments'),
    Throttle({ default: { limit: 30, ttl: 3600 } }),
    UseGuards(NotPenalizedGuard),
    UseInterceptors(IdempotencyInterceptor),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreateCommentDto]),
    __metadata("design:returntype", Promise)
], ReviewSocialController.prototype, "createComment", null);
ReviewSocialController = __decorate([
    Controller('reviews'),
    __metadata("design:paramtypes", [SocialService])
], ReviewSocialController);
export { ReviewSocialController };
//# sourceMappingURL=review-social.controller.js.map