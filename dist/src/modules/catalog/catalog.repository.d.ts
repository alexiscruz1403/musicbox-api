import { PrismaService } from '../../prisma/prisma.service.js';
import type { CatalogAlbum, CatalogArtist, CatalogTrack } from './providers/music-catalog.provider.js';
export interface CatalogReviewGroup {
    id: string;
    reviewCount: number;
    avgRating: number;
}
export interface ResourceReviewStats {
    reviewCount: number;
    userRating: number | null;
}
export interface AlbumReviewStats extends ResourceReviewStats {
    trackRatings: Map<string, number>;
}
export declare class CatalogRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAlbumStats(deezerId: string, userId?: string): Promise<AlbumReviewStats | null>;
    getTrackStats(deezerId: string, userId?: string): Promise<ResourceReviewStats | null>;
    getArtistStats(deezerId: string): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        reviewCount: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getAlbumStatsBatch(deezerIds: string[], userId?: string): Promise<Map<string, ResourceReviewStats>>;
    getTrackStatsBatch(deezerIds: string[], userId?: string): Promise<Map<string, ResourceReviewStats>>;
    getArtistStatsBatch(deezerIds: string[]): Promise<Map<string, {
        reviewCount: number;
    }>>;
    upsertArtist(data: CatalogArtist): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        name: string;
        imageUrl: string | null;
        lastSyncedAt: Date;
        catalogSyncedAt: Date | null;
        reviewCount: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    upsertAlbum(data: CatalogAlbum, artistId: string): import("../../../generated/prisma/models.js").Prisma__AlbumClient<{
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
        reviewCount: number;
    }[]>;
    findArtistByDeezerId(deezerId: string): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        name: string;
        imageUrl: string | null;
        lastSyncedAt: Date;
        catalogSyncedAt: Date | null;
        reviewCount: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findAlbumIdByDeezerId(deezerId: string): Promise<string | null>;
    markCatalogSynced(artistId: string, when: Date): import("../../../generated/prisma/models.js").Prisma__ArtistClient<{
        id: string;
        deezerId: string;
        mbid: string | null;
        name: string;
        imageUrl: string | null;
        lastSyncedAt: Date;
        catalogSyncedAt: Date | null;
        reviewCount: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findTracksByArtist(artistId: string, cursor: string | null, limit: number): Promise<{
        items: ({
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
                title: string;
                releaseDate: Date | null;
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
    hydrateTrackSummaries(ids: string[]): Promise<never[]> | import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
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
    upsertTrack(data: CatalogTrack, artistId: string, albumId: string | null): import("../../../generated/prisma/models.js").Prisma__TrackClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
