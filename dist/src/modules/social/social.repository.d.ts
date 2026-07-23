import { PrismaService } from '../../prisma/prisma.service.js';
export interface ReviewStats {
    likesCount: number;
    dislikesCount: number;
    commentsCount: number;
    userReaction: 'LIKE' | 'DISLIKE' | null;
}
export declare class SocialRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getReviewStats(reviewIds: string[], viewerId?: string): Promise<Map<string, ReviewStats>>;
    getActiveReviewOwner(reviewId: string): import("../../../generated/prisma/models.js").Prisma__ReviewClient<{
        id: string;
        userId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    isOwnerVisibleTo(ownerId: string, viewerId?: string): Promise<boolean>;
    findReaction(userId: string, reviewId: string): import("../../../generated/prisma/models.js").Prisma__ReviewReactionClient<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import("../../../generated/prisma/enums.js").ReactionType;
        reviewId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    upsertReaction(userId: string, reviewId: string, type: 'LIKE' | 'DISLIKE'): import("../../../generated/prisma/models.js").Prisma__ReviewReactionClient<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import("../../../generated/prisma/enums.js").ReactionType;
        reviewId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    deleteReaction(userId: string, reviewId: string): import("../../../generated/prisma/models.js").Prisma__ReviewReactionClient<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import("../../../generated/prisma/enums.js").ReactionType;
        reviewId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    createComment(data: {
        userId: string;
        reviewId: string;
        content: string;
    }): import("../../../generated/prisma/models.js").Prisma__CommentClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        reviewId: string;
        content: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findCommentById(id: string): import("../../../generated/prisma/models.js").Prisma__CommentClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        reviewId: string;
        content: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    updateComment(id: string, content: string): import("../../../generated/prisma/models.js").Prisma__CommentClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        reviewId: string;
        content: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    softDeleteComment(id: string): import("../../../generated/prisma/models.js").Prisma__CommentClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        reviewId: string;
        content: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    listComments(reviewId: string, cursor: string | undefined, limit: number): Promise<{
        items: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            reviewId: string;
            content: string;
        })[];
        nextCursor: string | null;
    }>;
}
