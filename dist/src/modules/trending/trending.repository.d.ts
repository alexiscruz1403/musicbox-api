import type { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
export interface TrendingGroup {
    id: string;
    reviewCount: number;
    avgRating: number;
}
export declare class TrendingRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private windowStart;
    topAlbumGroups(): Promise<TrendingGroup[]>;
    topTrackGroups(): Promise<TrendingGroup[]>;
    hydrateAlbums(ids: string[]): Promise<never[]> | Prisma.PrismaPromise<({
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
    hydrateTracks(ids: string[]): Promise<never[]> | Prisma.PrismaPromise<({
        artist: {
            name: string;
            id: string;
            deezerId: string;
            mbid: string | null;
            imageUrl: string | null;
            lastSyncedAt: Date;
        };
        album: {
            deezerId: string;
            coverUrl: string | null;
        } | null;
    } & {
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
    })[]>;
    saveSnapshot(payload: Prisma.InputJsonValue): Prisma.Prisma__TrendingSnapshotClient<{
        id: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        snapshotAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
