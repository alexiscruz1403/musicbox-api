import type { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
export declare class FollowSuggestionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOwnReviewSignals(userId: string): Prisma.PrismaPromise<{
        albumId: string | null;
        trackId: string | null;
        album: {
            artistId: string;
        } | null;
        track: {
            artistId: string;
        } | null;
    }[]>;
    getOwnLikeSignals(userId: string): Prisma.PrismaPromise<{
        review: {
            albumId: string | null;
            trackId: string | null;
            album: {
                artistId: string;
            } | null;
            track: {
                artistId: string;
            } | null;
        };
    }[]>;
    findReviewsByAlbumIds(albumIds: string[]): Promise<never[]> | Prisma.PrismaPromise<{
        userId: string;
        albumId: string | null;
    }[]>;
    findReviewsByTrackIds(trackIds: string[]): Promise<never[]> | Prisma.PrismaPromise<{
        userId: string;
        trackId: string | null;
    }[]>;
    findReviewsByArtistIds(artistIds: string[]): Promise<never[]> | Prisma.PrismaPromise<{
        userId: string;
        album: {
            artistId: string;
        } | null;
        track: {
            artistId: string;
        } | null;
    }[]>;
    findLikesByAlbumIds(albumIds: string[]): Promise<never[]> | Prisma.PrismaPromise<{
        userId: string;
        review: {
            albumId: string | null;
        };
    }[]>;
    findLikesByTrackIds(trackIds: string[]): Promise<never[]> | Prisma.PrismaPromise<{
        userId: string;
        review: {
            trackId: string | null;
        };
    }[]>;
    findLikesByArtistIds(artistIds: string[]): Promise<never[]> | Prisma.PrismaPromise<{
        userId: string;
        review: {
            album: {
                artistId: string;
            } | null;
            track: {
                artistId: string;
            } | null;
        };
    }[]>;
    getFollowedIds(userId: string): Prisma.PrismaPromise<{
        followeeId: string;
    }[]>;
    findPopularUsers(excludeIds: string[], limit: number): Promise<never[]> | Prisma.PrismaPromise<{
        id: string;
        handle: string;
        displayName: string;
        avatarUrl: string | null;
    }[]>;
    hydrateUsers(ids: string[]): Promise<never[]> | Prisma.PrismaPromise<{
        id: string;
        handle: string;
        displayName: string;
        avatarUrl: string | null;
    }[]>;
    getSnapshot(userId: string): Prisma.Prisma__FollowSuggestionSnapshotClient<{
        userId: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        generatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    upsertSnapshot(userId: string, payload: Prisma.InputJsonValue, generatedAt: Date): Prisma.Prisma__FollowSuggestionSnapshotClient<{
        userId: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        generatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
