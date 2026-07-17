import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogHistoryRepository } from './catalog-history.repository.js';
import { CatalogService } from './catalog.service.js';
import type { CatalogAlbum, CatalogArtist, CatalogTrack } from './providers/music-catalog.provider.js';
import type { CatalogResourceType } from '../../../generated/prisma/client.js';
export interface RecentlyViewedDetailItem {
    resourceType: CatalogResourceType;
    deezerId: string;
    viewedAt: Date;
    detail: unknown;
    error: {
        code: string;
        message: string;
    } | null;
}
export declare class CatalogHistoryService {
    private readonly repo;
    private readonly catalog;
    private readonly artistDetail;
    private readonly logger;
    constructor(repo: CatalogHistoryRepository, catalog: CatalogService, artistDetail: ArtistDetailService);
    recordSearch(userId: string, query: string): Promise<void>;
    listSearchHistory(userId: string): Promise<{
        query: string;
        id: string;
        userId: string;
        searchedAt: Date;
    }[]>;
    deleteSearchHistoryItem(userId: string, id: string): Promise<void>;
    deleteAllSearchHistory(userId: string): Promise<void>;
    recordAlbumView(userId: string, album: CatalogAlbum): Promise<void>;
    recordTrackView(userId: string, track: CatalogTrack): Promise<void>;
    recordArtistView(userId: string, artist: CatalogArtist): Promise<void>;
    listRecentlyViewed(userId: string): Promise<{
        id: string;
        userId: string;
        resourceType: CatalogResourceType;
        deezerId: string;
        title: string;
        artistName: string | null;
        coverUrl: string | null;
        albumsCount: number | null;
        viewedAt: Date;
    }[]>;
    getRecentlyViewedDetails(userId: string): Promise<RecentlyViewedDetailItem[]>;
    private hydrateOne;
    private fetchDetail;
}
