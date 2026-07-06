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
const HYDRATE_INCLUDE = {
    actor: { select: { handle: true, displayName: true, avatarUrl: true } },
    review: {
        select: {
            id: true,
            externalTitle: true,
            externalArtistName: true,
            externalCoverUrl: true,
        },
    },
};
let NotificationsRepository = class NotificationsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getRecipientGate(recipientId) {
        return this.prisma.user.findUnique({
            where: { id: recipientId },
            select: { notifEnabled: true, notifPreference: true },
        });
    }
    findRecentGroupable(recipientId, reviewId, type, since) {
        return this.prisma.notification.findFirst({
            where: { recipientId, reviewId, type, createdAt: { gte: since } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async incrementGroup(id, actorId, actorCount) {
        await this.prisma.notification.update({
            where: { id },
            data: { actorId, actorCount, readAt: null },
        });
        return this.findHydratedById(id);
    }
    async create(data) {
        const notification = await this.prisma.notification.create({ data });
        return this.findHydratedById(notification.id);
    }
    findHydratedById(id) {
        return this.prisma.notification.findUniqueOrThrow({
            where: { id },
            include: HYDRATE_INCLUDE,
        });
    }
    findById(id) {
        return this.prisma.notification.findUnique({ where: { id } });
    }
    async list(recipientId, cursor, limit, unreadOnly) {
        const take = Math.min(limit, 50);
        const cursorId = cursor
            ? Buffer.from(cursor, 'base64').toString('utf8')
            : undefined;
        const rows = await this.prisma.notification.findMany({
            where: { recipientId, ...(unreadOnly ? { readAt: null } : {}) },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take: take + 1,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            include: HYDRATE_INCLUDE,
        });
        return this.paginate(rows, take);
    }
    markRead(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { readAt: new Date() },
        });
    }
    markAllRead(recipientId) {
        return this.prisma.notification.updateMany({
            where: { recipientId, readAt: null },
            data: { readAt: new Date() },
        });
    }
    paginate(rows, take) {
        const hasMore = rows.length > take;
        const items = hasMore ? rows.slice(0, take) : rows;
        const nextCursor = hasMore
            ? Buffer.from(items[items.length - 1].id).toString('base64')
            : null;
        return { items, nextCursor };
    }
};
NotificationsRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], NotificationsRepository);
export { NotificationsRepository };
//# sourceMappingURL=notifications.repository.js.map