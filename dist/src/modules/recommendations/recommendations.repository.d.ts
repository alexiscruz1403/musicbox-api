import type { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
export declare class RecommendationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    countActiveReviews(userId: string): Promise<number>;
    getFavoriteArtistSignals(userId: string): Prisma.PrismaPromise<{
        track: {
            artistId: string;
            artist: {
                name: string;
            };
        } | null;
        album: {
            artistId: string;
            artist: {
                name: string;
            };
        } | null;
    }[]>;
    getGenreSignals(userId: string): Prisma.PrismaPromise<{
        track: {
            album: {
                genreLabel: string | null;
            } | null;
        } | null;
        album: {
            genreLabel: string | null;
        } | null;
    }[]>;
    getReviewedAlbumDeezerIds(userId: string): Prisma.PrismaPromise<{
        track: {
            album: {
                deezerId: string;
            } | null;
        } | null;
        album: {
            deezerId: string;
        } | null;
    }[]>;
    findAlbumsByGenres(genres: string[], excludeDeezerIds: string[], limit: number): Promise<never[]> | Prisma.PrismaPromise<({
        artist: {
            id: string;
            deezerId: string;
            mbid: string | null;
            lastSyncedAt: Date;
            name: string;
            imageUrl: string | null;
        };
    } & {
        id: string;
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        coverUrl: string | null;
        releaseDate: Date | null;
        genreLabel: string | null;
        lastSyncedAt: Date;
    })[]>;
    listUserIdsWithSnapshot(): Promise<{
        userId: string;
    }[]>;
    getSnapshot(userId: string): Prisma.Prisma__RecommendationSnapshotClient<{
        userId: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        generatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    upsertSnapshot(userId: string, payload: Prisma.InputJsonValue, generatedAt: Date): Prisma.Prisma__RecommendationSnapshotClient<{
        userId: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        generatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
