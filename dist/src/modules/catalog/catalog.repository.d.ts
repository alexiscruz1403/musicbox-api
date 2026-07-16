import { PrismaService } from '../../prisma/prisma.service.js';
import type { CatalogAlbum, CatalogArtist, CatalogTrack } from './providers/music-catalog.provider.js';
export interface CatalogReviewGroup {
    id: string;
    reviewCount: number;
    avgRating: number;
}
export declare class CatalogRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsertArtist(data: CatalogArtist): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        name: string;
        imageUrl: string | null;
        lastSyncedAt: Date;
        catalogSyncedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    upsertAlbum(data: CatalogAlbum, artistId: string): import("../../../generated/prisma/models.js").Prisma__AlbumClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        title: string;
        artistId: string;
        coverUrl: string | null;
        releaseDate: Date | null;
        genreLabel: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findStaleArtists(olderThan: Date, take: number): import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        deezerId: string;
        mbid: string | null;
        name: string;
        imageUrl: string | null;
        lastSyncedAt: Date;
        catalogSyncedAt: Date | null;
    }[]>;
    findArtistByDeezerId(deezerId: string): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        name: string;
        imageUrl: string | null;
        lastSyncedAt: Date;
        catalogSyncedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    markCatalogSynced(artistId: string, when: Date): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        name: string;
        imageUrl: string | null;
        lastSyncedAt: Date;
        catalogSyncedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findTracksByArtist(artistId: string, cursor: string | null, limit: number): Promise<{
        items: ({
            album: {
                deezerId: string;
                title: string;
                coverUrl: string | null;
                releaseDate: Date | null;
            } | null;
            artist: {
                id: string;
                deezerId: string;
                mbid: string | null;
                name: string;
                imageUrl: string | null;
                lastSyncedAt: Date;
                catalogSyncedAt: Date | null;
            };
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
        })[];
        nextCursor: string | null;
        total: number;
    }>;
    topReviewedAlbumIds(artistId: string, take: number): Promise<CatalogReviewGroup[]>;
    topReviewedTrackIds(artistId: string, take: number): Promise<CatalogReviewGroup[]>;
    trendingAlbumIds(artistId: string, take: number, windowStart: Date): Promise<CatalogReviewGroup[]>;
    trendingTrackIds(artistId: string, take: number, windowStart: Date): Promise<CatalogReviewGroup[]>;
    hydrateAlbumSummaries(ids: string[]): Promise<never[]> | import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        artist: {
            id: string;
            deezerId: string;
            mbid: string | null;
            name: string;
            imageUrl: string | null;
            lastSyncedAt: Date;
            catalogSyncedAt: Date | null;
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
    hydrateTrackSummaries(ids: string[]): Promise<never[]> | import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        album: {
            deezerId: string;
            coverUrl: string | null;
        } | null;
        artist: {
            id: string;
            deezerId: string;
            mbid: string | null;
            name: string;
            imageUrl: string | null;
            lastSyncedAt: Date;
            catalogSyncedAt: Date | null;
        };
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
    upsertTrack(data: CatalogTrack, artistId: string, albumId: string | null): import("../../../generated/prisma/models.js").Prisma__TrackClient<{
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
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
