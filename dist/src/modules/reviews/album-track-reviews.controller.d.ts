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
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            albumId: string | null;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
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
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            albumId: string | null;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        } & import("../social/social.repository.js").ReviewStats)[];
        meta: {
            cursor: string | null;
        };
    }>;
}
