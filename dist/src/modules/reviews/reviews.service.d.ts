import { CatalogService } from '../catalog/catalog.service.js';
import { ReviewEventsProducer } from '../events/review-events.producer.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';
import type { ListReviewsQueryDto } from './dto/list-reviews-query.dto.js';
import type { ListUserReviewsQueryDto } from './dto/list-user-reviews-query.dto.js';
import type { UpdateReviewDto } from './dto/update-review.dto.js';
import { ReviewsRepository } from './reviews.repository.js';
export declare class ReviewsService {
    private readonly repo;
    private readonly catalog;
    private readonly events;
    constructor(repo: ReviewsRepository, catalog: CatalogService, events: ReviewEventsProducer);
    create(userId: string, dto: CreateReviewDto): Promise<{
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
    }>;
    private createTrackReview;
    private createAlbumReview;
    private buildAlbumReviewItems;
    findById(id: string): Promise<{
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
    }>;
    update(userId: string, id: string, dto: UpdateReviewDto): Promise<({
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
    }) | null>;
    remove(userId: string, id: string): Promise<void>;
    listByAlbum(deezerId: string, query: ListReviewsQueryDto): Promise<{
        items: ({
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
        nextCursor: string | null;
    }>;
    listByTrack(deezerId: string, query: ListReviewsQueryDto): Promise<{
        items: ({
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
        nextCursor: string | null;
    }>;
    listByUserHandle(handle: string, query: ListUserReviewsQueryDto): Promise<{
        items: {
            avatarUrl: string | null;
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
        }[];
        nextCursor: string | null;
    }>;
    private findAlbumOrThrow;
    private findTrackOrThrow;
    private getActiveReview;
    private getOwnedActiveReview;
    private computeAverageRating;
    private translatePrismaError;
}
