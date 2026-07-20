import { SocialEventsProducer } from '../events/social-events.producer.js';
import type { CreateCommentDto } from './dto/create-comment.dto.js';
import type { CreateReactionDto } from './dto/create-reaction.dto.js';
import type { ListCommentsQueryDto } from './dto/list-comments-query.dto.js';
import type { UpdateCommentDto } from './dto/update-comment.dto.js';
import { SocialRepository } from './social.repository.js';
export declare class SocialService {
    private readonly repo;
    private readonly events;
    constructor(repo: SocialRepository, events: SocialEventsProducer);
    getReviewStats(reviewIds: string[], viewerId?: string): Promise<Map<string, import("./social.repository.js").ReviewStats>>;
    react(userId: string, reviewId: string, dto: CreateReactionDto): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        type: import("../../../generated/prisma/enums.js").ReactionType;
        reviewId: string;
    }>;
    removeReaction(userId: string, reviewId: string): Promise<void>;
    listComments(reviewId: string, query: ListCommentsQueryDto, viewerId?: string): Promise<{
        items: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            createdAt: Date;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            reviewId: string;
            content: string;
        })[];
        nextCursor: string | null;
    }>;
    createComment(userId: string, reviewId: string, dto: CreateCommentDto): Promise<{
        createdAt: Date;
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        reviewId: string;
        content: string;
    }>;
    updateComment(userId: string, id: string, dto: UpdateCommentDto): Promise<{
        createdAt: Date;
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        reviewId: string;
        content: string;
    }>;
    removeComment(userId: string, id: string): Promise<void>;
    private getActiveReviewOrThrow;
    private assertReviewVisible;
    private getActiveComment;
    private getOwnedActiveComment;
}
