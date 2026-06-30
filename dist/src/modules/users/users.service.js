var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import sanitizeHtml from 'sanitize-html';
import { UsersRepository } from './users.repository.js';
let UsersService = class UsersService {
    repo;
    config;
    constructor(repo, config) {
        this.repo = repo;
        this.config = config;
        cloudinary.config({
            cloud_name: config.getOrThrow('CLOUDINARY_CLOUD_NAME'),
            api_key: config.getOrThrow('CLOUDINARY_API_KEY'),
            api_secret: config.getOrThrow('CLOUDINARY_API_SECRET'),
        });
    }
    async getMe(userId) {
        const user = await this.repo.findById(userId);
        if (!user)
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
                message: 'Usuario no encontrado.',
            });
        const [reviewCount, followersCount, followingCount] = await this.repo.getStats(userId);
        return { user, stats: { reviewCount, followersCount, followingCount } };
    }
    async updateProfile(userId, dto) {
        if (dto.handle) {
            const existing = await this.repo.findByHandle(dto.handle);
            if (existing && existing.id !== userId) {
                throw new ConflictException({
                    code: 'HANDLE_TAKEN',
                    message: 'El handle ya está en uso.',
                });
            }
        }
        const sanitized = {
            ...dto,
            ...(dto.displayName && {
                displayName: sanitizeHtml(dto.displayName, {
                    allowedTags: [],
                    allowedAttributes: {},
                }),
            }),
            ...(dto.bio && {
                bio: sanitizeHtml(dto.bio, { allowedTags: [], allowedAttributes: {} }),
            }),
        };
        return this.repo.updateProfile(userId, sanitized);
    }
    async uploadAvatar(userId, buffer) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: 'avatars', resource_type: 'image' }, (error, result) => {
                if (error || !result)
                    return reject(new Error(error?.message ?? 'Upload failed'));
                this.repo
                    .updateAvatarUrl(userId, result.secure_url)
                    .then(() => {
                    resolve(result.secure_url);
                })
                    .catch((err) => reject(err instanceof Error ? err : new Error(String(err))));
            });
            stream.end(buffer);
        });
    }
    async deleteAccount(userId) {
        await this.repo.anonimize(userId);
    }
    async getNotifPrefs(userId) {
        const prefs = await this.repo.getNotifPrefs(userId);
        if (!prefs)
            throw new NotFoundException({
                code: 'PREFS_NOT_FOUND',
                message: 'Preferencias no encontradas.',
            });
        return prefs;
    }
    async updateNotifPrefs(userId, dto) {
        return this.repo.updateNotifPrefs(userId, dto);
    }
    async checkHandle(handle, currentUserId) {
        if (!/^[a-zA-Z0-9_]{3,30}$/.test(handle)) {
            throw new BadRequestException({
                code: 'HANDLE_INVALID_FORMAT',
                message: 'El handle solo puede contener letras, números y guiones bajos (3–30 caracteres).',
            });
        }
        const existing = await this.repo.findByHandle(handle);
        return { available: !existing || existing.id === currentUserId };
    }
    async getPublicProfile(handle, viewerId) {
        const user = await this.repo.findByHandle(handle);
        if (!user || user.status === 'DELETED') {
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
                message: 'Usuario no encontrado.',
            });
        }
        const [reviewCount, followersCount, followingCount] = await this.repo.getStats(user.id);
        let isFollowing = false;
        if (viewerId) {
            isFollowing = !!(await this.repo.followExists(viewerId, user.id));
        }
        const { email: _email, passwordHash: _pw, googleId: _gid, deletedAt: _da, ...publicFields } = user;
        return {
            user: publicFields,
            stats: { reviewCount, followersCount, followingCount },
            isFollowing,
        };
    }
    async getFollowers(handle, cursor, limit) {
        return this.repo.getFollowers(handle, cursor, limit);
    }
    async getFollowing(handle, cursor, limit) {
        return this.repo.getFollowing(handle, cursor, limit);
    }
    async follow(followerId, handle) {
        const target = await this.repo.findByHandle(handle);
        if (!target || target.status === 'DELETED') {
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
                message: 'Usuario no encontrado.',
            });
        }
        if (target.id === followerId) {
            throw new BadRequestException({
                code: 'CANNOT_FOLLOW_SELF',
                message: 'No puedes seguirte a ti mismo.',
            });
        }
        const exists = await this.repo.followExists(followerId, target.id);
        if (exists)
            throw new ConflictException({
                code: 'ALREADY_FOLLOWING',
                message: 'Ya sigues a este usuario.',
            });
        await this.repo.createFollow(followerId, target.id);
    }
    async unfollow(followerId, handle) {
        const target = await this.repo.findByHandle(handle);
        if (!target)
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
                message: 'Usuario no encontrado.',
            });
        const exists = await this.repo.followExists(followerId, target.id);
        if (!exists)
            throw new NotFoundException({
                code: 'NOT_FOLLOWING',
                message: 'No sigues a este usuario.',
            });
        await this.repo.deleteFollow(followerId, target.id);
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersRepository,
        ConfigService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map