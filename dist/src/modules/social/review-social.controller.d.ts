import type { Request } from 'express';
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
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReactionType;
            id: string;
            reviewId: string;
            createdAt: Date;
        };
    }>;
    removeReaction(user: JwtPayload, id: string): Promise<void>;
    listComments(id: string, query: ListCommentsQueryDto, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            userId: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            id: string;
            reviewId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            content: string;
        })[];
        meta: {
            cursor: string | null;
        };
    }>;
    createComment(user: JwtPayload, id: string, dto: CreateCommentDto): Promise<{
        data: {
            userId: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            id: string;
            reviewId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            content: string;
        };
    }>;
}
