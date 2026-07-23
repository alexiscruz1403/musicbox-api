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
            id: string;
            name: string;
            reviewCount: number;
            deezerId: string;
            mbid: string | null;
            lastSyncedAt: Date;
            imageUrl: string | null;
            catalogSyncedAt: Date | null;
        };
    } & {
        id: string;
        coverUrl: string | null;
        reviewCount: number;
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        releaseDate: Date | null;
        genreLabel: string | null;
        lastSyncedAt: Date;
    })[]>;
    hydrateTracks(ids: string[]): Promise<never[]> | Prisma.PrismaPromise<({
        artist: {
            id: string;
            name: string;
            reviewCount: number;
            deezerId: string;
            mbid: string | null;
            lastSyncedAt: Date;
            imageUrl: string | null;
            catalogSyncedAt: Date | null;
        };
        album: {
            coverUrl: string | null;
            deezerId: string;
        } | null;
    } & {
        id: string;
        albumId: string | null;
        reviewCount: number;
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        lastSyncedAt: Date;
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
    findLatestSnapshot(): Prisma.Prisma__TrendingSnapshotClient<{
        id: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        snapshotAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
