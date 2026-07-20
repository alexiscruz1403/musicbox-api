import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { SocialService } from './social.service.js';
export declare class CommentsController {
    private readonly social;
    constructor(social: SocialService);
    update(user: JwtPayload, id: string, dto: UpdateCommentDto): Promise<{
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
    remove(user: JwtPayload, id: string): Promise<void>;
}
