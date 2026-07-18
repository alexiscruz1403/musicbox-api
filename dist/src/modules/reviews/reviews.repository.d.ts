import { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { UserReviewSortMode } from './dto/list-user-reviews-query.dto.js';
export interface AlbumReviewItemInput {
    trackId: string;
    rating: number;
    description?: string;
    position: number;
}
type SortMode = 'recent' | 'rating';
export declare class ReviewsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAlbumByDeezerId(deezerId: string): Prisma.Prisma__AlbumClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        coverUrl: string | null;
        releaseDate: Date | null;
        genreLabel: string | null;
        lastSyncedAt: Date;
        reviewCount: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findTrackByDeezerId(deezerId: string): Prisma.Prisma__TrackClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        lastSyncedAt: Date;
        reviewCount: number;
        albumId: string | null;
        durationMs: number | null;
        trackNumber: number | null;
        previewUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findTracksByDeezerIds(deezerIds: string[]): Prisma.PrismaPromise<{
        id: string;
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        lastSyncedAt: Date;
        reviewCount: number;
        albumId: string | null;
        durationMs: number | null;
        trackNumber: number | null;
        previewUrl: string | null;
    }[]>;
    findUserIdByHandle(handle: string): Prisma.Prisma__UserClient<{
        id: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    isOwnerVisibleTo(ownerId: string, viewerId?: string): Promise<boolean>;
    createTrackReview(data: {
        userId: string;
        trackId: string;
        artistId: string;
        description: string | null;
        rating: number;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }): Promise<{
        id: string;
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }>;
    createAlbumReview(data: {
        userId: string;
        albumId: string;
        artistId: string;
        description: string | null;
        rating: number;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        items: AlbumReviewItemInput[];
    }): Promise<{
        id: string;
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }>;
    findById(id: string): Prisma.Prisma__ReviewClient<({
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
            rating: import("@prisma/client-runtime-utils").Decimal;
            trackId: string;
            position: number;
            reviewId: string;
        })[];
        track: {
            deezerId: string;
        } | null;
        user: {
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    updateTrackReview(id: string, data: {
        description?: string;
        rating?: number;
    }): Prisma.Prisma__ReviewClient<{
        id: string;
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    updateAlbumReviewItems(reviewId: string, description: string | undefined, rating: number, items: AlbumReviewItemInput[]): Promise<{
        id: string;
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }>;
    updateAlbumReviewDescription(id: string, description: string): Prisma.Prisma__ReviewClient<{
        id: string;
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    softDelete(id: string, type: 'TRACK' | 'ALBUM', trackId: string | null, albumId: string | null): Promise<{
        id: string;
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }>;
    listByAlbum(albumId: string, cursor: string | undefined, limit: number, sort: SortMode, viewerId?: string): Promise<{
        items: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            albumId: string | null;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            userId: string;
            trackId: string | null;
        })[];
        nextCursor: string | null;
    }>;
    listByTrack(trackId: string, cursor: string | undefined, limit: number, sort: SortMode, viewerId?: string): Promise<{
        items: ({
            user: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            albumId: string | null;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            userId: string;
            trackId: string | null;
        })[];
        nextCursor: string | null;
    }>;
    private buildVisibilityFilter;
    listByUserId(userId: string, cursor: string | undefined, limit: number, sort: UserReviewSortMode, textQuery?: string): Promise<{
        items: ({
            user: {
                avatarUrl: string | null;
            };
        } & {
            id: string;
            albumId: string | null;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            userId: string;
            trackId: string | null;
        })[];
        nextCursor: string | null;
    }>;
    private buildOrderBy;
    private buildUserReviewsOrderBy;
    private decodeCursor;
    private paginate;
}
export {};
