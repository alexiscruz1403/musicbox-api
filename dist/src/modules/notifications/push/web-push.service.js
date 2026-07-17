var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebPushService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import webpush from 'web-push';
import { PushSubscriptionsRepository } from './push-subscriptions.repository.js';
let WebPushService = WebPushService_1 = class WebPushService {
    repo;
    config;
    logger = new Logger(WebPushService_1.name);
    constructor(repo, config) {
        this.repo = repo;
        this.config = config;
    }
    onModuleInit() {
        webpush.setVapidDetails(this.config.getOrThrow('VAPID_SUBJECT'), this.config.getOrThrow('VAPID_PUBLIC_KEY'), this.config.getOrThrow('VAPID_PRIVATE_KEY'));
    }
    async sendToUser(recipientId, notification) {
        try {
            const subscriptions = await this.repo.listByUserId(recipientId);
            if (subscriptions.length === 0)
                return;
            const payload = JSON.stringify({
                type: notification.type,
                actor: notification.actor,
                review: notification.review,
                commentId: notification.commentId,
                actorCount: notification.actorCount,
                createdAt: notification.createdAt,
            });
            const results = await Promise.allSettled(subscriptions.map((sub) => webpush.sendNotification({
                endpoint: sub.endpoint,
                keys: { p256dh: sub.p256dh, auth: sub.auth },
            }, payload)));
            await Promise.all(results.map(async (result, index) => {
                if (result.status === 'fulfilled')
                    return;
                const sub = subscriptions[index];
                const err = result.reason;
                if (err.statusCode === 404 || err.statusCode === 410) {
                    await this.repo.deleteById(sub.id);
                    return;
                }
                this.logger.warn(`Push send failed for subscription ${sub.id}: ${String(result.reason)}`);
            }));
        }
        catch (err) {
            this.logger.warn(`Push fan-out failed for user ${recipientId}: ${err}`);
        }
    }
};
WebPushService = WebPushService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PushSubscriptionsRepository,
        ConfigService])
], WebPushService);
export { WebPushService };
//# sourceMappingURL=web-push.service.js.map