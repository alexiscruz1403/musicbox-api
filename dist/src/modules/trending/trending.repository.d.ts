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
            deezerId: string;
            mbid: string | null;
            name: string;
            imageUrl: string | null;
            lastSyncedAt: Date;
            catalogSyncedAt: Date | null;
            reviewCount: number;
        };
    } & {
        id: string;
        coverUrl: string | null;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        reviewCount: number;
        title: string;
        artistId: string;
        releaseDate: Date | null;
        genreLabel: string | null;
    })[]>;
    hydrateTracks(ids: string[]): Promise<never[]> | Prisma.PrismaPromise<({
        artist: {
            id: string;
            deezerId: string;
            mbid: string | null;
            name: string;
            imageUrl: string | null;
            lastSyncedAt: Date;
            catalogSyncedAt: Date | null;
            reviewCount: number;
        };
        album: {
            coverUrl: string | null;
            deezerId: string;
        } | null;
    } & {
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        reviewCount: number;
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
    findLatestSnapshot(): Prisma.Prisma__TrendingSnapshotClient<{
        id: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        snapshotAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
