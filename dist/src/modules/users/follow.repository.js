var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { decodeIdCursor, paginate, } from '../common/pagination/id-cursor.util.js';
import { hydrateIsFollowing } from './follow-hydration.util.js';
let FollowRepository = class FollowRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFollowers(handle, cursor, limit = 20, viewerId) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { handle },
            select: { id: true },
        });
        const take = Math.min(limit, 50);
        const cursorDate = cursor
            ? new Date(Buffer.from(cursor, 'base64').toString('utf8'))
            : undefined;
        const follows = await this.prisma.follow.findMany({
            where: {
                followeeId: user.id,
                ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
            },
            take: take + 1,
            orderBy: { createdAt: 'desc' },
            include: {
                follower: {
                    select: {
                        id: true,
                        handle: true,
                        displayName: true,
                        avatarUrl: true,
                        isPrivate: true,
                    },
                },
            },
        });
        const hasMore = follows.length > take;
        const rows = hasMore ? follows.slice(0, take) : follows;
        const nextCursor = hasMore
            ? Buffer.from(rows[rows.length - 1].createdAt.toISOString()).toString('base64')
            : null;
        const items = await hydrateIsFollowing(this.prisma, rows.map((f) => f.follower), viewerId);
        return { items, nextCursor };
    }
    async getFollowing(handle, cursor, limit = 20, viewerId) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { handle },
            select: { id: true },
        });
        const take = Math.min(limit, 50);
        const cursorDate = cursor
            ? new Date(Buffer.from(cursor, 'base64').toString('utf8'))
            : undefined;
        const follows = await this.prisma.follow.findMany({
            where: {
                followerId: user.id,
                ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
            },
            take: take + 1,
            orderBy: { createdAt: 'desc' },
            include: {
                followee: {
                    select: {
                        id: true,
                        handle: true,
                        displayName: true,
                        avatarUrl: true,
                        isPrivate: true,
                    },
                },
            },
        });
        const hasMore = follows.length > take;
        const rows = hasMore ? follows.slice(0, take) : follows;
        const nextCursor = hasMore
            ? Buffer.from(rows[rows.length - 1].createdAt.toISOString()).toString('base64')
            : null;
        const items = await hydrateIsFollowing(this.prisma, rows.map((f) => f.followee), viewerId);
        return { items, nextCursor };
    }
    followExists(followerId, followeeId) {
        return this.prisma.follow.findUnique({
            where: { followerId_followeeId: { followerId, followeeId } },
        });
    }
    createFollow(followerId, followeeId) {
        return this.prisma.follow.create({ data: { followerId, followeeId } });
    }
    deleteFollow(followerId, followeeId) {
        return this.prisma.follow.delete({
            where: { followerId_followeeId: { followerId, followeeId } },
        });
    }
    findFollowRequest(requesterId, targetId) {
        return this.prisma.followRequest.findUnique({
            where: { requesterId_targetId: { requesterId, targetId } },
        });
    }
    createOrResetFollowRequest(requesterId, targetId) {
        return this.prisma.followRequest.upsert({
            where: { requesterId_targetId: { requesterId, targetId } },
            create: { requesterId, targetId },
            update: { status: 'PENDING', respondedAt: null },
        });
    }
    deleteFollowRequest(requesterId, targetId) {
        return this.prisma.followRequest.delete({
            where: { requesterId_targetId: { requesterId, targetId } },
        });
    }
    findFollowRequestById(id) {
        return this.prisma.followRequest.findUnique({ where: { id } });
    }
    async listIncomingFollowRequests(targetId, cursor, limit = 20) {
        const take = Math.min(limit, 50);
        const cursorId = decodeIdCursor(cursor);
        const requests = await this.prisma.followRequest.findMany({
            where: { targetId, status: 'PENDING' },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take: take + 1,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            include: {
                requester: {
                    select: {
                        id: true,
                        handle: true,
                        displayName: true,
                        avatarUrl: true,
                    },
                },
            },
        });
        return paginate(requests, take);
    }
    acceptFollowRequest(id) {
        return this.prisma.$transaction(async (tx) => {
            const request = await tx.followRequest.update({
                where: { id },
                data: { status: 'ACCEPTED', respondedAt: new Date() },
            });
            await tx.follow.create({
                data: {
                    followerId: request.requesterId,
                    followeeId: request.targetId,
                },
            });
            return request;
        });
    }
    rejectFollowRequest(id) {
        return this.prisma.followRequest.update({
            where: { id },
            data: { status: 'REJECTED', respondedAt: new Date() },
        });
    }
    async acceptAllPendingFollowRequests(targetId) {
        return this.prisma.$transaction(async (tx) => {
            const pending = await tx.followRequest.findMany({
                where: { targetId, status: 'PENDING' },
                select: { id: true, requesterId: true },
            });
            if (pending.length === 0)
                return [];
            await tx.follow.createMany({
                data: pending.map((p) => ({
                    followerId: p.requesterId,
                    followeeId: targetId,
                })),
                skipDuplicates: true,
            });
            await tx.followRequest.updateMany({
                where: { id: { in: pending.map((p) => p.id) } },
                data: { status: 'ACCEPTED', respondedAt: new Date() },
            });
            return pending.map((p) => p.requesterId);
        });
    }
};
FollowRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], FollowRepository);
export { FollowRepository };
//# sourceMappingURL=follow.repository.js.map