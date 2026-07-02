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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { ListUserReviewsQueryDto } from '../reviews/dto/list-user-reviews-query.dto.js';
import { ReviewsService } from '../reviews/reviews.service.js';
import { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersService } from './users.service.js';
let UsersController = class UsersController {
    users;
    reviews;
    constructor(users, reviews) {
        this.users = users;
        this.reviews = reviews;
    }
    async getMe(user) {
        return { data: await this.users.getMe(user.sub) };
    }
    async updateMe(user, dto) {
        return { data: await this.users.updateProfile(user.sub, dto) };
    }
    async uploadAvatar(user, file) {
        const url = await this.users.uploadAvatar(user.sub, file.buffer);
        return { data: { avatarUrl: url } };
    }
    async deleteMe(user) {
        await this.users.deleteAccount(user.sub);
    }
    async getNotifPrefs(user) {
        return { data: await this.users.getNotifPrefs(user.sub) };
    }
    async updateNotifPrefs(user, dto) {
        return { data: await this.users.updateNotifPrefs(user.sub, dto) };
    }
    async checkHandle(handle, req) {
        return { data: await this.users.checkHandle(handle, req.user?.sub) };
    }
    async getPublicProfile(handle, req) {
        return { data: await this.users.getPublicProfile(handle, req.user?.sub) };
    }
    async getFollowers(handle, cursor, limit) {
        return {
            data: await this.users.getFollowers(handle, cursor, limit ? parseInt(limit, 10) : undefined),
        };
    }
    async getFollowing(handle, cursor, limit) {
        return {
            data: await this.users.getFollowing(handle, cursor, limit ? parseInt(limit, 10) : undefined),
        };
    }
    async getReviews(handle, query) {
        const result = await this.reviews.listByUserHandle(handle, query);
        return { data: result.items, meta: { cursor: result.nextCursor } };
    }
    async follow(user, handle) {
        await this.users.follow(user.sub, handle);
    }
    async unfollow(user, handle) {
        await this.users.unfollow(user.sub, handle);
    }
};
__decorate([
    Get('me'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    Patch('me'),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMe", null);
__decorate([
    Post('me/avatar'),
    UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
            if (!file.mimetype.startsWith('image/')) {
                return cb(new Error('Solo se permiten imágenes.'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, CurrentUser()),
    __param(1, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadAvatar", null);
__decorate([
    Delete('me'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteMe", null);
__decorate([
    Get('me/notifications-prefs'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getNotifPrefs", null);
__decorate([
    Patch('me/notifications-prefs'),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateNotifPrefsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateNotifPrefs", null);
__decorate([
    Public(),
    Get('check-handle'),
    UseGuards(OptionalJwtAuthGuard),
    __param(0, Query('handle')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkHandle", null);
__decorate([
    Public(),
    Get(':handle'),
    UseGuards(OptionalJwtAuthGuard),
    __param(0, Param('handle')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPublicProfile", null);
__decorate([
    Public(),
    Get(':handle/followers'),
    __param(0, Param('handle')),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFollowers", null);
__decorate([
    Public(),
    Get(':handle/following'),
    __param(0, Param('handle')),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFollowing", null);
__decorate([
    Public(),
    Get(':handle/reviews'),
    __param(0, Param('handle')),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ListUserReviewsQueryDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getReviews", null);
__decorate([
    Post(':handle/follow'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('handle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "follow", null);
__decorate([
    Delete(':handle/follow'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('handle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unfollow", null);
UsersController = __decorate([
    Controller('users'),
    __metadata("design:paramtypes", [UsersService,
        ReviewsService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map