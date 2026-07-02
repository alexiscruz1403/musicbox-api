import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { ReviewsService } from './reviews.service.js';
export declare class ReviewsController {
    private readonly reviews;
    constructor(reviews: ReviewsService);
    create(user: JwtPayload, dto: CreateReviewDto): Promise<{
        data: {
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
        };
    }>;
    findOne(id: string): Promise<{
        data: {
            reactionStats: {
                likes: number;
                dislikes: number;
            };
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
            track: {
                deezerId: string;
            } | null;
            album: {
                deezerId: string;
            } | null;
            trackReviewItems: ({
                track: {
                    deezerId: string;
                    title: string;
                    trackNumber: number | null;
                };
            } & {
                id: string;
                description: string | null;
                rating: number;
                trackId: string;
                position: number;
                reviewId: string;
            })[];
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
        };
    }>;
    update(user: JwtPayload, id: string, dto: UpdateReviewDto): Promise<{
        data: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
            track: {
                deezerId: string;
            } | null;
            album: {
                deezerId: string;
            } | null;
            trackReviewItems: ({
                track: {
                    deezerId: string;
                    title: string;
                    trackNumber: number | null;
                };
            } & {
                id: string;
                description: string | null;
                rating: number;
                trackId: string;
                position: number;
                reviewId: string;
            })[];
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
        }) | null;
    }>;
    remove(user: JwtPayload, id: string): Promise<void>;
}
