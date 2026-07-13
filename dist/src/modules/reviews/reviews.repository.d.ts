import { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
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
        coverUrl: string | null;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        title: string;
        artistId: string;
        releaseDate: Date | null;
        genreLabel: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findTrackByDeezerId(deezerId: string): Prisma.Prisma__TrackClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        title: string;
        artistId: string;
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
        lastSyncedAt: Date;
        title: string;
        artistId: string;
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
        description: string;
        rating: number;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }): Prisma.Prisma__ReviewClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        albumId: string | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        trackId: string | null;
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    createAlbumReview(data: {
        userId: string;
        albumId: string;
        description: string;
        rating: number;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        items: AlbumReviewItemInput[];
    }): Promise<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        albumId: string | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        trackId: string | null;
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }>;
    findById(id: string): Prisma.Prisma__ReviewClient<({
        album: {
            deezerId: string;
        } | null;
        track: {
            deezerId: string;
        } | null;
        user: {
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        };
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
            rating: number;
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
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    updateTrackReview(id: string, data: {
        description?: string;
        rating?: number;
    }): Prisma.Prisma__ReviewClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        albumId: string | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        trackId: string | null;
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    updateAlbumReviewItems(reviewId: string, description: string | undefined, rating: number, items: AlbumReviewItemInput[]): Promise<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        albumId: string | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        trackId: string | null;
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }>;
    updateAlbumReviewDescription(id: string, description: string): Prisma.Prisma__ReviewClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        albumId: string | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        trackId: string | null;
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    softDelete(id: string): Prisma.Prisma__ReviewClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        albumId: string | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        trackId: string | null;
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
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
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
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
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        })[];
        nextCursor: string | null;
    }>;
    private buildVisibilityFilter;
    listByUserId(userId: string, cursor: string | undefined, limit: number): Promise<{
        items: ({
            user: {
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
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        })[];
        nextCursor: string | null;
    }>;
    private buildOrderBy;
    private decodeCursor;
    private paginate;
}
export {};
