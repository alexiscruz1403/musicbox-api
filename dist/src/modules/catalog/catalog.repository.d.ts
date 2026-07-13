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
        name: string;
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        imageUrl: string | null;
        catalogSyncedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    upsertAlbum(data: CatalogAlbum, artistId: string): import("../../../generated/prisma/models.js").Prisma__AlbumClient<{
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
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findStaleArtists(olderThan: Date, take: number): import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        name: string;
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        imageUrl: string | null;
        catalogSyncedAt: Date | null;
    }[]>;
    findArtistByDeezerId(deezerId: string): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        name: string;
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        imageUrl: string | null;
        catalogSyncedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    markCatalogSynced(artistId: string, when: Date): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        name: string;
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        imageUrl: string | null;
        catalogSyncedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findTracksByArtist(artistId: string, cursor: string | null, limit: number): Promise<{
        items: ({
            artist: {
                name: string;
                id: string;
                deezerId: string;
                mbid: string | null;
                lastSyncedAt: Date;
                imageUrl: string | null;
                catalogSyncedAt: Date | null;
            };
            album: {
                deezerId: string;
                title: string;
                coverUrl: string | null;
                releaseDate: Date | null;
            } | null;
        } & {
            id: string;
            albumId: string | null;
            deezerId: string;
            mbid: string | null;
            title: string;
            artistId: string;
            lastSyncedAt: Date;
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
            name: string;
            id: string;
            deezerId: string;
            mbid: string | null;
            lastSyncedAt: Date;
            imageUrl: string | null;
            catalogSyncedAt: Date | null;
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
    hydrateTrackSummaries(ids: string[]): Promise<never[]> | import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        artist: {
            name: string;
            id: string;
            deezerId: string;
            mbid: string | null;
            lastSyncedAt: Date;
            imageUrl: string | null;
            catalogSyncedAt: Date | null;
        };
        album: {
            deezerId: string;
            coverUrl: string | null;
        } | null;
    } & {
        id: string;
        albumId: string | null;
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        lastSyncedAt: Date;
        durationMs: number | null;
        trackNumber: number | null;
        previewUrl: string | null;
    })[]>;
    upsertTrack(data: CatalogTrack, artistId: string, albumId: string | null): import("../../../generated/prisma/models.js").Prisma__TrackClient<{
        id: string;
        albumId: string | null;
        deezerId: string;
        mbid: string | null;
        title: string;
        artistId: string;
        lastSyncedAt: Date;
        durationMs: number | null;
        trackNumber: number | null;
        previewUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
