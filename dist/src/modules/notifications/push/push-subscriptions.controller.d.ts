import type { Request } from 'express';
import type { JwtPayload } from '../../auth/strategies/jwt.strategy.js';
import { CreatePushSubscriptionDto } from './dto/create-push-subscription.dto.js';
import { PushSubscriptionsService } from './push-subscriptions.service.js';
export declare class PushSubscriptionsController {
    private readonly push;
    constructor(push: PushSubscriptionsService);
    getVapidPublicKey(): {
        data: {
            publicKey: string;
        };
    };
    subscribe(user: JwtPayload, dto: CreatePushSubscriptionDto, req: Request): Promise<void>;
    unsubscribe(user: JwtPayload, endpoint: string): Promise<void>;
}
