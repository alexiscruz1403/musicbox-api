import { PrismaService } from '../../prisma/prisma.service.js';
export interface CreateNotificationInput {
    recipientId: string;
    actorId: string;
    type: 'LIKE' | 'DISLIKE' | 'COMMENT' | 'FOLLOW';
    reviewId?: string;
    commentId?: string;
}
export declare class NotificationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getRecipientGate(recipientId: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        notifEnabled: boolean;
        notifPreference: {
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
        } | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findRecentGroupable(recipientId: string, reviewId: string, type: 'LIKE' | 'DISLIKE', since: Date): import("../../../generated/prisma/models.js").Prisma__NotificationClient<{
        type: import("../../../generated/prisma/enums.js").NotificationType;
        id: string;
        createdAt: Date;
        reviewId: string | null;
        recipientId: string;
        actorId: string;
        commentId: string | null;
        actorCount: number | null;
        readAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    incrementGroup(id: string, actorId: string, actorCount: number): Promise<{
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
        };
    } & {
        type: import("../../../generated/prisma/enums.js").NotificationType;
        id: string;
        createdAt: Date;
        reviewId: string | null;
        recipientId: string;
        actorId: string;
        commentId: string | null;
        actorCount: number | null;
        readAt: Date | null;
    }>;
    create(data: CreateNotificationInput): Promise<{
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
        };
    } & {
        type: import("../../../generated/prisma/enums.js").NotificationType;
        id: string;
        createdAt: Date;
        reviewId: string | null;
        recipientId: string;
        actorId: string;
        commentId: string | null;
        actorCount: number | null;
        readAt: Date | null;
    }>;
    findHydratedById(id: string): import("../../../generated/prisma/models.js").Prisma__NotificationClient<{
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
        };
    } & {
        type: import("../../../generated/prisma/enums.js").NotificationType;
        id: string;
        createdAt: Date;
        reviewId: string | null;
        recipientId: string;
        actorId: string;
        commentId: string | null;
        actorCount: number | null;
        readAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findById(id: string): import("../../../generated/prisma/models.js").Prisma__NotificationClient<{
        type: import("../../../generated/prisma/enums.js").NotificationType;
        id: string;
        createdAt: Date;
        reviewId: string | null;
        recipientId: string;
        actorId: string;
        commentId: string | null;
        actorCount: number | null;
        readAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    list(recipientId: string, cursor: string | undefined, limit: number, unreadOnly: boolean): Promise<{
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
            };
        } & {
            type: import("../../../generated/prisma/enums.js").NotificationType;
            id: string;
            createdAt: Date;
            reviewId: string | null;
            recipientId: string;
            actorId: string;
            commentId: string | null;
            actorCount: number | null;
            readAt: Date | null;
        })[];
        nextCursor: string | null;
    }>;
    markRead(id: string): import("../../../generated/prisma/models.js").Prisma__NotificationClient<{
        type: import("../../../generated/prisma/enums.js").NotificationType;
        id: string;
        createdAt: Date;
        reviewId: string | null;
        recipientId: string;
        actorId: string;
        commentId: string | null;
        actorCount: number | null;
        readAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    markAllRead(recipientId: string): import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<import("../../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    private paginate;
}
