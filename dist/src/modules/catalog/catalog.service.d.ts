import { RedisService } from '../../redis/redis.service.js';
import { CatalogSyncService } from './catalog-sync.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { type ArtistTrackItem, type CatalogAlbum, type CatalogArtist, type CatalogPage, type CatalogSearchResult, type CatalogSearchType, type CatalogTrack, type MusicCatalogProvider } from './providers/music-catalog.provider.js';
export declare class CatalogService {
    private readonly catalogProvider;
    private readonly repo;
    private readonly redis;
    private readonly catalogSyncService;
    private readonly CACHE_TTL;
    constructor(catalogProvider: MusicCatalogProvider, repo: CatalogRepository, redis: RedisService, catalogSyncService: CatalogSyncService);
    private withCache;
    search(query: string, type: CatalogSearchType, limit: number, cursor: string | null): Promise<CatalogPage<CatalogSearchResult>>;
    getAlbum(deezerId: string): Promise<CatalogAlbum>;
    getTrack(deezerId: string): Promise<CatalogTrack>;
    getArtist(deezerId: string): Promise<CatalogArtist>;
    getArtistAlbums(deezerId: string, limit: number, cursor: string | null): Promise<CatalogPage<CatalogAlbum>>;
    getArtistTracks(deezerId: string, limit: number, cursor: string | null): Promise<CatalogPage<ArtistTrackItem>>;
}
