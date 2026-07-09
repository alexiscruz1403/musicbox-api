import type { ListNotificationsQueryDto } from './dto/list-notifications-query.dto.js';
import { NotificationsRepository } from './notifications.repository.js';
import { NotificationsSseService } from './notifications-sse.service.js';
export declare class NotificationsService {
    private readonly repo;
    private readonly sse;
    constructor(repo: NotificationsRepository, sse: NotificationsSseService);
    list(userId: string, query: ListNotificationsQueryDto): Promise<{
        items: ({
            review: {
                id: string;
                externalTitle: string;
                externalArtistName: string;
                externalCoverUrl: string | null;
            } | null;
            actor: {
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            } | null;
        } & {
            type: import("../../../generated/prisma/enums.js").NotificationType;
            id: string;
            createdAt: Date;
            reviewId: string | null;
            recipientId: string;
            actorId: string | null;
            commentId: string | null;
            actorCount: number | null;
            readAt: Date | null;
        })[];
        nextCursor: string | null;
    }>;
    markRead(userId: string, id: string): Promise<{
        type: import("../../../generated/prisma/enums.js").NotificationType;
        id: string;
        createdAt: Date;
        reviewId: string | null;
        recipientId: string;
        actorId: string | null;
        commentId: string | null;
        actorCount: number | null;
        readAt: Date | null;
    }>;
    markAllRead(userId: string): Promise<void>;
    notifyModeration(recipientId: string, payload: {
        reviewId?: string;
        commentId?: string;
    }): Promise<void>;
    createFromEvent(jobName: string, payload: unknown): Promise<void>;
    private buildInput;
    private isTypeEnabled;
    private createOrGroupReaction;
    private getOwnedNotification;
}
