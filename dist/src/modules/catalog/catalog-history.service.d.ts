import { CatalogHistoryRepository } from './catalog-history.repository.js';
import type { CatalogAlbum, CatalogArtist, CatalogTrack } from './providers/music-catalog.provider.js';
import type { CatalogResourceType } from '../../../generated/prisma/client.js';
export declare class CatalogHistoryService {
    private readonly repo;
    private readonly logger;
    constructor(repo: CatalogHistoryRepository);
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
}
