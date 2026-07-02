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
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        coverUrl: string | null;
        releaseDate: Date | null;
        genreLabel: string | null;
        lastSyncedAt: Date;
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
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
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
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string;
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
            rating: number;
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
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findReactionBreakdown(reviewId: string): Prisma.GetReviewReactionGroupByPayload<{
        by: "type"[];
        where: {
            reviewId: string;
        };
        _count: true;
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
        description: string;
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
        description: string;
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
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    softDelete(id: string): Prisma.Prisma__ReviewClient<{
        id: string;
        albumId: string | null;
        status: import("../../../generated/prisma/enums.js").ContentStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        type: import("../../../generated/prisma/enums.js").ReviewType;
        description: string;
        rating: import("@prisma/client-runtime-utils").Decimal;
        externalTitle: string;
        externalArtistName: string;
        externalCoverUrl: string | null;
        userId: string;
        trackId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    listByAlbum(albumId: string, cursor: string | undefined, limit: number, sort: SortMode): Promise<{
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
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            userId: string;
            trackId: string | null;
        })[];
        nextCursor: string | null;
    }>;
    listByTrack(trackId: string, cursor: string | undefined, limit: number, sort: SortMode): Promise<{
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
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
            userId: string;
            trackId: string | null;
        })[];
        nextCursor: string | null;
    }>;
    listByUserId(userId: string, cursor: string | undefined, limit: number): Promise<{
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
            description: string;
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
    private decodeCursor;
    private paginate;
}
export {};
