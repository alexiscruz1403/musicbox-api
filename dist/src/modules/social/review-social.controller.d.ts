import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CreateReactionDto } from './dto/create-reaction.dto.js';
import { ListCommentsQueryDto } from './dto/list-comments-query.dto.js';
import { SocialService } from './social.service.js';
export declare class ReviewSocialController {
    private readonly social;
    constructor(social: SocialService);
    react(user: JwtPayload, id: string, dto: CreateReactionDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReactionType;
            reviewId: string;
        };
    }>;
    removeReaction(user: JwtPayload, id: string): Promise<void>;
    listComments(id: string, query: ListCommentsQueryDto): Promise<{
        data: ({
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
        meta: {
            cursor: string | null;
        };
    }>;
    createComment(user: JwtPayload, id: string, dto: CreateCommentDto): Promise<{
        data: {
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            reviewId: string;
            content: string;
        };
    }>;
}
