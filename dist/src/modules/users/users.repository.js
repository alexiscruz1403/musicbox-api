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
let UsersRepository = class UsersRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findById(id) {
        return this.prisma.user.findFirst({ where: { id, deletedAt: null } });
    }
    findByHandle(handle) {
        return this.prisma.user.findFirst({ where: { handle, deletedAt: null } });
    }
    getStats(userId) {
        return Promise.all([
            this.prisma.review.count({ where: { userId } }),
            this.prisma.follow.count({ where: { followeeId: userId } }),
            this.prisma.follow.count({ where: { followerId: userId } }),
        ]);
    }
    async updateProfile(userId, data) {
        return this.prisma.user.update({ where: { id: userId }, data });
    }
    async anonimize(userId) {
        const before = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { avatarPublicId: true, coverPublicId: true },
        });
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    email: `deleted_${userId}@musicbox.invalid`,
                    handle: `deleted_${userId}`,
                    displayName: '[usuario eliminado]',
                    passwordHash: null,
                    googleId: null,
                    avatarUrl: null,
                    avatarPublicId: null,
                    coverUrl: null,
                    coverPublicId: null,
                    bio: null,
                    status: 'DELETED',
                    deletedAt: new Date(),
                },
            }),
            this.prisma.refreshToken.updateMany({
                where: { userId, revokedAt: null },
                data: { revokedAt: new Date() },
            }),
        ]);
        return before;
    }
    async getExportData(userId) {
        const [reviews, comments, reactions, followers, following, notifPrefs] = await Promise.all([
            this.prisma.review.findMany({
                where: { userId },
                include: { trackReviewItems: true },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.comment.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.reviewReaction.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.follow.findMany({
                where: { followeeId: userId },
                include: {
                    follower: {
                        select: { id: true, handle: true, displayName: true },
                    },
                },
            }),
            this.prisma.follow.findMany({
                where: { followerId: userId },
                include: {
                    followee: {
                        select: { id: true, handle: true, displayName: true },
                    },
                },
            }),
            this.prisma.notificationPreference.findUnique({
                where: { userId },
            }),
        ]);
        return { reviews, comments, reactions, followers, following, notifPrefs };
    }
    updateAvatar(userId, avatarUrl, avatarPublicId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { avatarUrl, avatarPublicId },
        });
    }
    updateCover(userId, coverUrl, coverPublicId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { coverUrl, coverPublicId },
        });
    }
    getNotifPrefs(userId) {
        return this.prisma.notificationPreference.findUnique({ where: { userId } });
    }
    updateNotifPrefs(userId, data) {
        return this.prisma.notificationPreference.update({
            where: { userId },
            data,
        });
    }
    async hydrateIsFollowing(users, viewerId) {
        const followedIds = viewerId && users.length > 0
            ? new Set((await this.prisma.follow.findMany({
                where: {
                    followerId: viewerId,
                    followeeId: { in: users.map((u) => u.id) },
                },
                select: { followeeId: true },
            })).map((f) => f.followeeId))
            : new Set();
        return users.map((u) => ({ ...u, isFollowing: followedIds.has(u.id) }));
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
        const items = await this.hydrateIsFollowing(rows.map((f) => f.follower), viewerId);
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
        const items = await this.hydrateIsFollowing(rows.map((f) => f.followee), viewerId);
        return { items, nextCursor };
    }
    async searchUsers(query, cursor, limit = 10, viewerId) {
        const take = Math.min(limit, 50);
        const cursorId = cursor
            ? Buffer.from(cursor, 'base64').toString('utf8')
            : undefined;
        const users = await this.prisma.user.findMany({
            where: {
                status: 'ACTIVE',
                OR: [
                    { handle: { contains: query, mode: 'insensitive' } },
                    { displayName: { contains: query, mode: 'insensitive' } },
                ],
            },
            orderBy: [{ handle: 'asc' }, { id: 'asc' }],
            take: take + 1,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            select: { id: true, handle: true, displayName: true, avatarUrl: true },
        });
        const hasMore = users.length > take;
        const rows = hasMore ? users.slice(0, take) : users;
        const nextCursor = hasMore
            ? Buffer.from(rows[rows.length - 1].id).toString('base64')
            : null;
        const followedIds = viewerId && rows.length > 0
            ? new Set((await this.prisma.follow.findMany({
                where: {
                    followerId: viewerId,
                    followeeId: { in: rows.map((r) => r.id) },
                },
                select: { followeeId: true },
            })).map((f) => f.followeeId))
            : new Set();
        const items = rows.map((r) => ({
            ...r,
            isFollowing: followedIds.has(r.id),
        }));
        return { items, nextCursor };
    }
    async quickSearchUsers(query, limit, viewerId) {
        const rows = await this.prisma.user.findMany({
            where: {
                status: 'ACTIVE',
                OR: [
                    { handle: { contains: query, mode: 'insensitive' } },
                    { displayName: { contains: query, mode: 'insensitive' } },
                ],
            },
            orderBy: [{ handle: 'asc' }],
            take: limit,
            select: {
                id: true,
                handle: true,
                displayName: true,
                avatarUrl: true,
                isPrivate: true,
            },
        });
        const followedIds = viewerId && rows.length > 0
            ? new Set((await this.prisma.follow.findMany({
                where: {
                    followerId: viewerId,
                    followeeId: { in: rows.map((r) => r.id) },
                },
                select: { followeeId: true },
            })).map((f) => f.followeeId))
            : new Set();
        return rows.map(({ id, ...rest }) => ({
            ...rest,
            isFollowing: followedIds.has(id),
        }));
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
        const cursorId = cursor
            ? Buffer.from(cursor, 'base64').toString('utf8')
            : undefined;
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
        const hasMore = requests.length > take;
        const items = hasMore ? requests.slice(0, take) : requests;
        const nextCursor = hasMore
            ? Buffer.from(items[items.length - 1].id).toString('base64')
            : null;
        return { items, nextCursor };
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
UsersRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UsersRepository);
export { UsersRepository };
//# sourceMappingURL=users.repository.js.map