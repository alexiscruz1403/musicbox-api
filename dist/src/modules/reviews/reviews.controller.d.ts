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
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
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
                trackId: string;
                description: string | null;
                rating: import("@prisma/client-runtime-utils").Decimal;
                reviewId: string;
                position: number;
            })[];
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
                trackId: string;
                description: string | null;
                rating: import("@prisma/client-runtime-utils").Decimal;
                reviewId: string;
                position: number;
            })[];
        } & {
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
        }) | null;
    }>;
    remove(user: JwtPayload, id: string): Promise<void>;
}
