import type { Request } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { ListUserReviewsQueryDto } from './dto/list-user-reviews-query.dto.js';
import { ReviewsService } from './reviews.service.js';
export declare class UserReviewsController {
    private readonly reviews;
    constructor(reviews: ReviewsService);
    getReviews(handle: string, query: ListUserReviewsQueryDto, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
            avatarUrl: string | null;
            createdAt: Date;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            albumId: string | null;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        }[];
        meta: {
            cursor: string | null;
        };
    }>;
}
