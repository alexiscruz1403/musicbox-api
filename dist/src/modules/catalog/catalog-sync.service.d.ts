import { RedisService } from '../../redis/redis.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { type MusicCatalogProvider } from './providers/music-catalog.provider.js';
export declare class CatalogSyncService {
    private readonly catalogProvider;
    private readonly repo;
    private readonly redis;
    private readonly logger;
    constructor(catalogProvider: MusicCatalogProvider, repo: CatalogRepository, redis: RedisService);
    syncStaleArtists(): Promise<void>;
    ensureArtistSynced(deezerId: string): Promise<{
        name: string;
        id: string;
        deezerId: string;
        mbid: string | null;
        lastSyncedAt: Date;
        imageUrl: string | null;
        catalogSyncedAt: Date | null;
    }>;
    private syncArtist;
    private fetchFullDiscography;
}
