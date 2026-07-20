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
            createdAt: Date;
            id: string;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReactionType;
            reviewId: string;
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
            createdAt: Date;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
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
            createdAt: Date;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            reviewId: string;
            content: string;
        };
    }>;
}
