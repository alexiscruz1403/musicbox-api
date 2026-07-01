import { RedisService } from '../../redis/redis.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { type CatalogAlbum, type CatalogArtist, type CatalogPage, type CatalogSearchResult, type CatalogSearchType, type CatalogTrack, type MusicCatalogProvider } from './providers/music-catalog.provider.js';
export declare class CatalogService {
    private readonly catalogProvider;
    private readonly repo;
    private readonly redis;
    private readonly CACHE_TTL;
    constructor(catalogProvider: MusicCatalogProvider, repo: CatalogRepository, redis: RedisService);
    private withCache;
    search(query: string, type: CatalogSearchType, limit: number, cursor: string | null): Promise<CatalogPage<CatalogSearchResult>>;
    getAlbum(deezerId: string): Promise<CatalogAlbum>;
    getTrack(deezerId: string): Promise<CatalogTrack>;
    getArtist(deezerId: string): Promise<CatalogArtist>;
    getArtistAlbums(deezerId: string, limit: number, cursor: string | null): Promise<CatalogPage<CatalogAlbum>>;
}
