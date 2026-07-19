import { CatalogService } from '../catalog/catalog.service.js';
import { ReviewEventsProducer } from '../events/review-events.producer.js';
import { SocialService } from '../social/social.service.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';
import type { ListReviewsQueryDto } from './dto/list-reviews-query.dto.js';
import type { ListUserReviewsQueryDto } from './dto/list-user-reviews-query.dto.js';
import type { UpdateReviewDto } from './dto/update-review.dto.js';
import { ReviewsRepository } from './reviews.repository.js';
export declare class ReviewsService {
    private readonly repo;
    private readonly catalog;
    private readonly events;
    private readonly social;
    constructor(repo: ReviewsRepository, catalog: CatalogService, events: ReviewEventsProducer, social: SocialService);
    create(userId: string, dto: CreateReviewDto): Promise<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        albumId: string | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        trackId: string | null;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }>;
    private createTrackReview;
    private createAlbumReview;
    private buildAlbumReviewItems;
    findById(id: string, viewerId?: string): Promise<{
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
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        albumId: string | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        trackId: string | null;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }>;
    update(userId: string, id: string, dto: UpdateReviewDto): Promise<({
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
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        albumId: string | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        trackId: string | null;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }) | null>;
    remove(userId: string, id: string): Promise<void>;
    listByAlbum(deezerId: string, query: ListReviewsQueryDto, viewerId?: string): Promise<{
        items: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        } & import("../social/social.repository.js").ReviewStats)[];
        nextCursor: string | null;
    }>;
    listByTrack(deezerId: string, query: ListReviewsQueryDto, viewerId?: string): Promise<{
        items: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        } & import("../social/social.repository.js").ReviewStats)[];
        nextCursor: string | null;
    }>;
    private withReviewStats;
    listByUserHandle(handle: string, query: ListUserReviewsQueryDto, viewerId?: string): Promise<{
        items: {
            avatarUrl: string | null;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    private findAlbumOrThrow;
    private findTrackOrThrow;
    private getActiveReview;
    private getOwnedActiveReview;
    private getOwnedReviewAllowDeleted;
    private assertOwnerVisible;
    private computeAverageRating;
    private translatePrismaError;
}
