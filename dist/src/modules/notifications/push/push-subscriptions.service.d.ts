import { ConfigService } from '@nestjs/config';
import type { CreatePushSubscriptionDto } from './dto/create-push-subscription.dto.js';
import { PushSubscriptionsRepository } from './push-subscriptions.repository.js';
export declare class PushSubscriptionsService {
    private readonly repo;
    private readonly config;
    constructor(repo: PushSubscriptionsRepository, config: ConfigService);
    getVapidPublicKey(): string;
    subscribe(userId: string, dto: CreatePushSubscriptionDto, userAgent?: string): Promise<void>;
    unsubscribe(userId: string, endpoint: string): Promise<void>;
}
