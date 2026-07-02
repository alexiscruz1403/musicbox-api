import { ListReviewsQueryDto } from './dto/list-reviews-query.dto.js';
import { ReviewsService } from './reviews.service.js';
export declare class AlbumTrackReviewsController {
    private readonly reviews;
    constructor(reviews: ReviewsService);
    listByAlbum(deezerId: string, query: ListReviewsQueryDto): Promise<{
        data: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            userId: string;
            trackId: string | null;
            albumId: string | null;
        })[];
        meta: {
            cursor: string | null;
        };
    }>;
    listByTrack(deezerId: string, query: ListReviewsQueryDto): Promise<{
        data: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            userId: string;
            trackId: string | null;
            albumId: string | null;
        })[];
        meta: {
            cursor: string | null;
        };
    }>;
}
