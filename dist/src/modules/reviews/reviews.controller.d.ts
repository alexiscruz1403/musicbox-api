import type { Request } from 'express';
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
            albumId: string | null;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            trackId: string | null;
        };
    }>;
    findOne(id: string, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
            likesCount: number;
            dislikesCount: number;
            commentsCount: number;
            userReaction: "LIKE" | "DISLIKE" | null;
            album: {
                deezerId: string;
            } | null;
            track: {
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
                rating: import("@prisma/client-runtime-utils").Decimal;
                trackId: string;
                position: number;
                reviewId: string;
            })[];
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
            id: string;
            albumId: string | null;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            trackId: string | null;
        };
    }>;
    update(user: JwtPayload, id: string, dto: UpdateReviewDto): Promise<{
        data: ({
            album: {
                deezerId: string;
            } | null;
            track: {
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
                rating: import("@prisma/client-runtime-utils").Decimal;
                trackId: string;
                position: number;
                reviewId: string;
            })[];
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
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            trackId: string | null;
        }) | null;
    }>;
    remove(user: JwtPayload, id: string): Promise<void>;
}
