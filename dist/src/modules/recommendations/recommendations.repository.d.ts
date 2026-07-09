import type { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
export declare class RecommendationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    countActiveReviews(userId: string): Promise<number>;
    getFavoriteArtistSignals(userId: string): Prisma.PrismaPromise<{
        album: {
            artist: {
                name: string;
            };
            artistId: string;
        } | null;
        track: {
            artist: {
                name: string;
            };
            artistId: string;
        } | null;
    }[]>;
    getGenreSignals(userId: string): Prisma.PrismaPromise<{
        album: {
            genreLabel: string | null;
        } | null;
        track: {
            album: {
                genreLabel: string | null;
            } | null;
        } | null;
    }[]>;
    getReviewedAlbumDeezerIds(userId: string): Prisma.PrismaPromise<{
        album: {
            deezerId: string;
        } | null;
        track: {
            album: {
                deezerId: string;
            } | null;
        } | null;
    }[]>;
    findAlbumsByGenres(genres: string[], excludeDeezerIds: string[], limit: number): Promise<never[]> | Prisma.PrismaPromise<({
        artist: {
            name: string;
            id: string;
            deezerId: string;
            mbid: string | null;
            imageUrl: string | null;
            lastSyncedAt: Date;
        };
    } & {
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        title: string;
        artistId: string;
        coverUrl: string | null;
        releaseDate: Date | null;
        genreLabel: string | null;
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
