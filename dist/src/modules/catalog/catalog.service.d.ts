import { RedisService } from '../../redis/redis.service.js';
import { CatalogSyncService } from './catalog-sync.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { type ArtistTrackItem, type CatalogAlbum, type CatalogArtist, type CatalogPage, type CatalogSearchType, type CatalogTrack, type MusicCatalogProvider } from './providers/music-catalog.provider.js';
export interface CatalogTrackWithUserRating extends CatalogTrack {
    userRating: number | null;
}
export interface CatalogAlbumDetail extends Omit<CatalogAlbum, 'tracks'> {
    reviewCount: number;
    userRating: number | null;
    tracks: CatalogTrackWithUserRating[];
}
export interface CatalogTrackDetail extends CatalogTrack {
    reviewCount: number;
    userRating: number | null;
}
export interface CatalogArtistDetail extends CatalogArtist {
    reviewCount: number;
}
export type EnrichedCatalogSearchResult = {
    type: 'artist';
    item: CatalogArtistDetail;
} | {
    type: 'album';
    item: CatalogAlbumDetail;
} | {
    type: 'track';
    item: CatalogTrackDetail;
};
export declare class CatalogService {
    private readonly catalogProvider;
    private readonly repo;
    private readonly redis;
    private readonly catalogSyncService;
    private readonly CACHE_TTL;
    constructor(catalogProvider: MusicCatalogProvider, repo: CatalogRepository, redis: RedisService, catalogSyncService: CatalogSyncService);
    private withCacheTtl;
    private withCache;
    search(query: string, type: CatalogSearchType, limit: number, cursor: string | null, viewerId?: string): Promise<CatalogPage<EnrichedCatalogSearchResult>>;
    private enrichSearchResults;
    getAlbum(deezerId: string, viewerId?: string): Promise<CatalogAlbumDetail>;
    private resolveAlbumPreviewMap;
    getTrack(deezerId: string, viewerId?: string): Promise<CatalogTrackDetail>;
    private resolveTrackPreviewUrl;
    getArtist(deezerId: string): Promise<CatalogArtistDetail>;
    getArtistAlbums(deezerId: string, limit: number, cursor: string | null): Promise<CatalogPage<CatalogAlbum>>;
    getArtistTracks(deezerId: string, limit: number, cursor: string | null): Promise<CatalogPage<ArtistTrackItem>>;
}
