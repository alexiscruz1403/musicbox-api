import { type MessageEvent } from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { ListNotificationsQueryDto } from './dto/list-notifications-query.dto.js';
import { NotificationsSseService } from './notifications-sse.service.js';
import { NotificationsService } from './notifications.service.js';
export declare class NotificationsController {
    private readonly service;
    private readonly sse;
    constructor(service: NotificationsService, sse: NotificationsSseService);
    list(user: JwtPayload, query: ListNotificationsQueryDto): Promise<{
        data: ({
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
        } & {
            id: string;
            createdAt: Date;
            type: import("../../../generated/prisma/enums.js").NotificationType;
            reviewId: string | null;
            recipientId: string;
            actorId: string | null;
            commentId: string | null;
            actorCount: number | null;
            readAt: Date | null;
        })[];
        meta: {
            cursor: string | null;
        };
    }>;
    markRead(user: JwtPayload, id: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            type: import("../../../generated/prisma/enums.js").NotificationType;
            reviewId: string | null;
            recipientId: string;
            actorId: string | null;
            commentId: string | null;
            actorCount: number | null;
            readAt: Date | null;
        };
    }>;
    markAllRead(user: JwtPayload): Promise<void>;
    stream(user: JwtPayload): Observable<MessageEvent>;
}
