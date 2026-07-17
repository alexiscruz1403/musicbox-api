import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CreatePushSubscriptionDto } from './dto/create-push-subscription.dto.js';
import { PushSubscriptionsRepository } from './push-subscriptions.repository.js';

@Injectable()
export class PushSubscriptionsService {
  constructor(
    private readonly repo: PushSubscriptionsRepository,
    private readonly config: ConfigService,
  ) {}

  getVapidPublicKey(): string {
    return this.config.getOrThrow<string>('VAPID_PUBLIC_KEY');
  }

  async subscribe(
    userId: string,
    dto: CreatePushSubscriptionDto,
    userAgent?: string,
  ): Promise<void> {
    await this.repo.upsert({
      userId,
      endpoint: dto.endpoint,
      p256dh: dto.keys.p256dh,
      auth: dto.keys.auth,
      userAgent,
    });
  }

  async unsubscribe(userId: string, endpoint: string): Promise<void> {
    await this.repo.deleteByEndpoint(userId, endpoint);
  }
}
