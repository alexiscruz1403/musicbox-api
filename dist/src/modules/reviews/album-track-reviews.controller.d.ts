import type { Request } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { ListReviewsQueryDto } from './dto/list-reviews-query.dto.js';
import { ReviewsService } from './reviews.service.js';
export declare class AlbumTrackReviewsController {
    private readonly reviews;
    constructor(reviews: ReviewsService);
    listByAlbum(deezerId: string, query: ListReviewsQueryDto, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: ({
            user: {
                handle: string;
                displayName: string;
                id: string;
                avatarUrl: string | null;
            };
        } & {
            type: import("../../../generated/prisma/enums.js").ReviewType;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            trackId: string | null;
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        } & import("../social/social.repository.js").ReviewStats)[];
        meta: {
            cursor: string | null;
        };
    }>;
    listByTrack(deezerId: string, query: ListReviewsQueryDto, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: ({
            user: {
                handle: string;
                displayName: string;
                id: string;
                avatarUrl: string | null;
            };
        } & {
            type: import("../../../generated/prisma/enums.js").ReviewType;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            trackId: string | null;
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        } & import("../social/social.repository.js").ReviewStats)[];
        meta: {
            cursor: string | null;
        };
    }>;
}
