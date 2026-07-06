var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { NOTIFICATION_GROUP_WINDOW_MS } from './notifications.constants.js';
import { NotificationsRepository, } from './notifications.repository.js';
import { NotificationsSseService } from './notifications-sse.service.js';
let NotificationsService = class NotificationsService {
    repo;
    sse;
    constructor(repo, sse) {
        this.repo = repo;
        this.sse = sse;
    }
    async list(userId, query) {
        return this.repo.list(userId, query.cursor, query.limit, query.unreadOnly ?? false);
    }
    async markRead(userId, id) {
        const notification = await this.getOwnedNotification(userId, id);
        if (notification.readAt)
            return notification;
        return this.repo.markRead(id);
    }
    async markAllRead(userId) {
        await this.repo.markAllRead(userId);
    }
    async createFromEvent(jobName, payload) {
        const input = this.buildInput(jobName, payload);
        if (!input)
            return;
        if (input.recipientId === input.actorId)
            return;
        const gate = await this.repo.getRecipientGate(input.recipientId);
        if (!gate || !gate.notifEnabled || !this.isTypeEnabled(input.type, gate))
            return;
        const notification = input.type === 'LIKE' || input.type === 'DISLIKE'
            ? await this.createOrGroupReaction(input)
            : await this.repo.create(input);
        this.sse.push(input.recipientId, notification);
    }
    buildInput(jobName, payload) {
        switch (jobName) {
            case 'reaction.added': {
                const p = payload;
                return {
                    recipientId: p.reviewOwnerId,
                    actorId: p.userId,
                    type: p.type,
                    reviewId: p.reviewId,
                };
            }
            case 'comment.created': {
                const p = payload;
                return {
                    recipientId: p.reviewOwnerId,
                    actorId: p.userId,
                    type: 'COMMENT',
                    reviewId: p.reviewId,
                    commentId: p.commentId,
                };
            }
            case 'follow.created': {
                const p = payload;
                return {
                    recipientId: p.followeeId,
                    actorId: p.followerId,
                    type: 'FOLLOW',
                };
            }
            default:
                return null;
        }
    }
    isTypeEnabled(type, gate) {
        const prefs = gate.notifPreference;
        if (!prefs)
            return true;
        switch (type) {
            case 'LIKE':
                return prefs.likesEnabled;
            case 'DISLIKE':
                return prefs.dislikesEnabled;
            case 'COMMENT':
                return prefs.commentsEnabled;
            case 'FOLLOW':
                return prefs.followsEnabled;
        }
    }
    async createOrGroupReaction(input) {
        const type = input.type;
        const since = new Date(Date.now() - NOTIFICATION_GROUP_WINDOW_MS);
        const existing = await this.repo.findRecentGroupable(input.recipientId, input.reviewId, type, since);
        if (!existing)
            return this.repo.create(input);
        const nextCount = (existing.actorCount ?? 1) + 1;
        return this.repo.incrementGroup(existing.id, input.actorId, nextCount);
    }
    async getOwnedNotification(userId, id) {
        const notification = await this.repo.findById(id);
        if (!notification) {
            throw new NotFoundException({
                code: 'NOTIFICATION_NOT_FOUND',
                message: 'Notificación no encontrada.',
            });
        }
        if (notification.recipientId !== userId) {
            throw new ForbiddenException({
                code: 'NOT_NOTIFICATION_RECIPIENT',
                message: 'No puedes modificar esta notificación.',
            });
        }
        return notification;
    }
};
NotificationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NotificationsRepository,
        NotificationsSseService])
], NotificationsService);
export { NotificationsService };
//# sourceMappingURL=notifications.service.js.map