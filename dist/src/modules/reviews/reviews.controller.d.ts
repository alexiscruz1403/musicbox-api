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
                handle: string;
                displayName: string;
                id: string;
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
                reviewId: string;
                trackId: string;
                description: string | null;
                rating: number;
                position: number;
            })[];
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
        };
    }>;
    update(user: JwtPayload, id: string, dto: UpdateReviewDto): Promise<{
        data: ({
            user: {
                handle: string;
                displayName: string;
                id: string;
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
                reviewId: string;
                trackId: string;
                description: string | null;
                rating: number;
                position: number;
            })[];
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
        }) | null;
    }>;
    remove(user: JwtPayload, id: string): Promise<void>;
}
