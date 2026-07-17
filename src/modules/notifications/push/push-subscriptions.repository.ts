import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';

export interface UpsertPushSubscriptionData {
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  userAgent?: string;
}

@Injectable()
export class PushSubscriptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Upsert keyed on endpoint (not userId+endpoint): a browser subscription
  // endpoint is unique per push service subscription, so re-subscribing from
  // a different account on the same browser must reassign it rather than
  // create a duplicate row that would silently push to the wrong user.
  upsert(data: UpsertPushSubscriptionData) {
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

  async deleteByEndpoint(userId: string, endpoint: string): Promise<void> {
    await this.prisma.pushSubscription.deleteMany({
      where: { userId, endpoint },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.pushSubscription.deleteMany({ where: { id } });
  }

  listByUserId(userId: string) {
    return this.prisma.pushSubscription.findMany({ where: { userId } });
  }
}
