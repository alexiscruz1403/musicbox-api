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
                    email: `deleted_${userId}@vinlyst.invalid`,
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
            this.prisma.pushSubscription.deleteMany({ where: { userId } }),
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
};
UsersRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UsersRepository);
export { UsersRepository };
//# sourceMappingURL=users.repository.js.map