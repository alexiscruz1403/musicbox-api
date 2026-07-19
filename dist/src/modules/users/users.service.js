var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';
import { CloudinaryService } from '../../cloudinary/cloudinary.service.js';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import { UsersRepository } from './users.repository.js';
let UsersService = class UsersService {
    repo;
    events;
    cloudinaryService;
    constructor(repo, events, cloudinaryService) {
        this.repo = repo;
        this.events = events;
        this.cloudinaryService = cloudinaryService;
    }
    async getMe(userId) {
        const user = await this.repo.findById(userId);
        if (!user)
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
            });
        const { passwordHash: _pw, googleId: _gid, avatarPublicId: _api, coverPublicId: _cpi, ...safeUser } = user;
        const [reviewCount, followersCount, followingCount] = await this.repo.getStats(userId);
        return {
            user: safeUser,
            stats: { reviewCount, followersCount, followingCount },
        };
    }
    async updateProfile(userId, dto) {
        if (dto.handle) {
            const existing = await this.repo.findByHandle(dto.handle);
            if (existing && existing.id !== userId) {
                throw new ConflictException({
                    code: 'HANDLE_TAKEN',
                });
            }
        }
        const current = dto.isPrivate !== undefined ? await this.repo.findById(userId) : null;
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
        const updated = await this.repo.updateProfile(userId, sanitized);
        if (current?.isPrivate === true && dto.isPrivate === false) {
            await this.autoAcceptPendingFollowRequests(userId);
        }
        return updated;
    }
    async autoAcceptPendingFollowRequests(targetId) {
        const requesterIds = await this.repo.acceptAllPendingFollowRequests(targetId);
        await Promise.all(requesterIds.map((requesterId) => this.events.emitFollowRequestAccepted({
            requesterId,
            accepterId: targetId,
        })));
    }
    async uploadAvatar(userId, buffer) {
        const current = await this.repo.findById(userId);
        if (!current)
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
            });
        const { secureUrl, publicId } = await this.cloudinaryService.upload(buffer, 'avatars');
        await this.repo.updateAvatar(userId, secureUrl, publicId);
        await this.cloudinaryService.destroy(current.avatarPublicId);
        return secureUrl;
    }
    async uploadCover(userId, buffer) {
        const current = await this.repo.findById(userId);
        if (!current)
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
            });
        const { secureUrl, publicId } = await this.cloudinaryService.upload(buffer, 'covers');
        await this.repo.updateCover(userId, secureUrl, publicId);
        await this.cloudinaryService.destroy(current.coverPublicId);
        return secureUrl;
    }
    async deleteAccount(userId) {
        const before = await this.repo.anonimize(userId);
        await Promise.all([
            this.cloudinaryService.destroy(before?.avatarPublicId),
            this.cloudinaryService.destroy(before?.coverPublicId),
        ]);
    }
    async exportAccountData(userId) {
        const user = await this.repo.findById(userId);
        if (!user)
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
            });
        const { passwordHash: _pw, googleId: _gid, ...profile } = user;
        const data = await this.repo.getExportData(userId);
        return {
            profile,
            reviews: data.reviews,
            comments: data.comments,
            reactions: data.reactions,
            follows: {
                followers: data.followers.map((f) => f.follower),
                following: data.following.map((f) => f.followee),
            },
            notificationPreferences: data.notifPrefs,
            exportedAt: new Date().toISOString(),
        };
    }
    async getNotifPrefs(userId) {
        const user = await this.getUserOrThrow(userId);
        const prefs = await this.repo.getNotifPrefs(userId);
        if (!prefs)
            throw new NotFoundException({
                code: 'PREFS_NOT_FOUND',
            });
        return this.applyNotifPrefsVisibility(prefs, user.isPrivate);
    }
    async updateNotifPrefs(userId, dto) {
        const user = await this.getUserOrThrow(userId);
        const sanitized = user.isPrivate
            ? { ...dto, followsEnabled: undefined }
            : { ...dto, followRequestsEnabled: undefined };
        const updated = await this.repo.updateNotifPrefs(userId, sanitized);
        return this.applyNotifPrefsVisibility(updated, user.isPrivate);
    }
    async getUserOrThrow(userId) {
        const user = await this.repo.findById(userId);
        if (!user)
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
            });
        return user;
    }
    applyNotifPrefsVisibility(prefs, isPrivate) {
        const { followsEnabled, followRequestsEnabled, ...rest } = prefs;
        return isPrivate
            ? { ...rest, followRequestsEnabled }
            : { ...rest, followsEnabled };
    }
    async checkHandle(handle, currentUserId) {
        if (!/^[a-zA-Z0-9_]{3,30}$/.test(handle)) {
            throw new BadRequestException({
                code: 'HANDLE_INVALID_FORMAT',
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
            });
        }
        const [reviewCount, followersCount, followingCount] = await this.repo.getStats(user.id);
        let isFollowing = false;
        let followRequestPending = false;
        if (viewerId) {
            isFollowing = !!(await this.repo.followExists(viewerId, user.id));
            if (!isFollowing) {
                const request = await this.repo.findFollowRequest(viewerId, user.id);
                followRequestPending = request?.status === 'PENDING';
            }
        }
        const { email: _email, passwordHash: _pw, googleId: _gid, deletedAt: _da, avatarPublicId: _api, coverPublicId: _cpi, ...publicFields } = user;
        return {
            user: publicFields,
            stats: { reviewCount, followersCount, followingCount },
            isFollowing,
            followRequestPending,
        };
    }
    async searchUsers(q, cursor, limit, viewerId) {
        return this.repo.searchUsers(q.trim(), cursor, limit, viewerId);
    }
    async quickSearchUsers(q, viewerId) {
        return this.repo.quickSearchUsers(q.trim(), 5, viewerId);
    }
    async getFollowers(handle, cursor, limit, viewerId) {
        return this.repo.getFollowers(handle, cursor, limit, viewerId);
    }
    async getFollowing(handle, cursor, limit, viewerId) {
        return this.repo.getFollowing(handle, cursor, limit, viewerId);
    }
    async follow(followerId, handle) {
        const target = await this.repo.findByHandle(handle);
        if (!target || target.status === 'DELETED') {
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
            });
        }
        if (target.id === followerId) {
            throw new BadRequestException({
                code: 'CANNOT_FOLLOW_SELF',
            });
        }
        const exists = await this.repo.followExists(followerId, target.id);
        if (exists)
            throw new ConflictException({
                code: 'ALREADY_FOLLOWING',
            });
        if (!target.isPrivate) {
            await this.repo.createFollow(followerId, target.id);
            await this.events.emitFollowCreated({
                followerId,
                followeeId: target.id,
            });
            return { status: 'FOLLOWING' };
        }
        const existingRequest = await this.repo.findFollowRequest(followerId, target.id);
        if (existingRequest?.status === 'PENDING') {
            throw new ConflictException({
                code: 'FOLLOW_REQUEST_ALREADY_SENT',
            });
        }
        const request = await this.repo.createOrResetFollowRequest(followerId, target.id);
        await this.events.emitFollowRequested({
            requesterId: followerId,
            targetId: target.id,
        });
        return { status: 'PENDING', followRequestId: request.id };
    }
    async unfollow(followerId, handle) {
        const target = await this.repo.findByHandle(handle);
        if (!target)
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
            });
        const exists = await this.repo.followExists(followerId, target.id);
        if (exists) {
            await this.repo.deleteFollow(followerId, target.id);
            return;
        }
        const pendingRequest = await this.repo.findFollowRequest(followerId, target.id);
        if (pendingRequest?.status === 'PENDING') {
            await this.repo.deleteFollowRequest(followerId, target.id);
            return;
        }
        throw new NotFoundException({
            code: 'NOT_FOLLOWING',
        });
    }
    async listFollowRequests(userId, cursor, limit) {
        const result = await this.repo.listIncomingFollowRequests(userId, cursor, limit);
        return {
            items: result.items.map((r) => ({
                id: r.id,
                createdAt: r.createdAt,
                requester: r.requester,
            })),
            nextCursor: result.nextCursor,
        };
    }
    async respondToFollowRequest(userId, requestId, status) {
        const request = await this.repo.findFollowRequestById(requestId);
        if (!request) {
            throw new NotFoundException({
                code: 'FOLLOW_REQUEST_NOT_FOUND',
            });
        }
        if (request.targetId !== userId) {
            throw new ForbiddenException({
                code: 'NOT_FOLLOW_REQUEST_TARGET',
            });
        }
        if (request.status !== 'PENDING') {
            throw new ConflictException({
                code: 'FOLLOW_REQUEST_ALREADY_RESOLVED',
            });
        }
        if (status === 'REJECTED') {
            return this.repo.rejectFollowRequest(requestId);
        }
        const accepted = await this.repo.acceptFollowRequest(requestId);
        await this.events.emitFollowRequestAccepted({
            requesterId: accepted.requesterId,
            accepterId: userId,
        });
        return accepted;
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersRepository,
        SocialEventsProducer,
        CloudinaryService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map