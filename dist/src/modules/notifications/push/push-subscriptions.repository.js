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
import { PrismaService } from '../../../prisma/prisma.service.js';
let PushSubscriptionsRepository = class PushSubscriptionsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    upsert(data) {
        return this.prisma.pushSubscription.upsert({
            where: { endpoint: data.endpoint },
            update: {
                userId: data.userId,
                p256dh: data.p256dh,
                auth: data.auth,
                userAgent: data.userAgent,
                lastSeenAt: new Date(),
            },
            create: data,
        });
    }
    async deleteByEndpoint(userId, endpoint) {
        await this.prisma.pushSubscription.deleteMany({
            where: { userId, endpoint },
        });
    }
    async deleteById(id) {
        await this.prisma.pushSubscription.deleteMany({ where: { id } });
    }
    listByUserId(userId) {
        return this.prisma.pushSubscription.findMany({ where: { userId } });
    }
};
PushSubscriptionsRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PushSubscriptionsRepository);
export { PushSubscriptionsRepository };
//# sourceMappingURL=push-subscriptions.repository.js.map