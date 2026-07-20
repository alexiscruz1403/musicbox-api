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
import { SocialEventsProducer } from '../events/social-events.producer.js';
import { FollowRepository } from './follow.repository.js';
import { UsersRepository } from './users.repository.js';
let FollowService = class FollowService {
    repo;
    usersRepo;
    events;
    constructor(repo, usersRepo, events) {
        this.repo = repo;
        this.usersRepo = usersRepo;
        this.events = events;
    }
    async getFollowers(handle, cursor, limit, viewerId) {
        return this.repo.getFollowers(handle, cursor, limit, viewerId);
    }
    async getFollowing(handle, cursor, limit, viewerId) {
        return this.repo.getFollowing(handle, cursor, limit, viewerId);
    }
    async getFollowStatus(viewerId, targetId) {
        if (!viewerId)
            return { isFollowing: false, followRequestPending: false };
        const isFollowing = !!(await this.repo.followExists(viewerId, targetId));
        if (isFollowing)
            return { isFollowing: true, followRequestPending: false };
        const request = await this.repo.findFollowRequest(viewerId, targetId);
        return {
            isFollowing: false,
            followRequestPending: request?.status === 'PENDING',
        };
    }
    async follow(followerId, handle) {
        const target = await this.usersRepo.findByHandle(handle);
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
        const target = await this.usersRepo.findByHandle(handle);
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
    async acceptAllPendingFollowRequests(targetId) {
        const requesterIds = await this.repo.acceptAllPendingFollowRequests(targetId);
        await Promise.all(requesterIds.map((requesterId) => this.events.emitFollowRequestAccepted({
            requesterId,
            accepterId: targetId,
        })));
    }
};
FollowService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FollowRepository,
        UsersRepository,
        SocialEventsProducer])
], FollowService);
export { FollowService };
//# sourceMappingURL=follow.service.js.map