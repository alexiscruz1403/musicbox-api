import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PushSubscriptionsRepository } from './push-subscriptions.repository.js';
export interface PushableNotification {
    id: string;
    type: string;
    commentId: string | null;
    actorCount: number | null;
    createdAt: Date;
    actor: {
        handle: string;
        displayName: string;
        avatarUrl: string | null;
    } | null;
    review: {
        id: string;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    } | null;
}
export declare class WebPushService implements OnModuleInit {
    private readonly repo;
    private readonly config;
    private readonly logger;
    constructor(repo: PushSubscriptionsRepository, config: ConfigService);
    onModuleInit(): void;
    sendToUser(recipientId: string, notification: PushableNotification): Promise<void>;
}
