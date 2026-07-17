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
import { ConfigService } from '@nestjs/config';
import { PushSubscriptionsRepository } from './push-subscriptions.repository.js';
let PushSubscriptionsService = class PushSubscriptionsService {
    repo;
    config;
    constructor(repo, config) {
        this.repo = repo;
        this.config = config;
    }
    getVapidPublicKey() {
        return this.config.getOrThrow('VAPID_PUBLIC_KEY');
    }
    async subscribe(userId, dto, userAgent) {
        await this.repo.upsert({
            userId,
            endpoint: dto.endpoint,
            p256dh: dto.keys.p256dh,
            auth: dto.keys.auth,
            userAgent,
        });
    }
    async unsubscribe(userId, endpoint) {
        await this.repo.deleteByEndpoint(userId, endpoint);
    }
};
PushSubscriptionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PushSubscriptionsRepository,
        ConfigService])
], PushSubscriptionsService);
export { PushSubscriptionsService };
//# sourceMappingURL=push-subscriptions.service.js.map