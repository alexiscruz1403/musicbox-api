import { RedisService } from '../../redis/redis.service.js';
import { CatalogService } from '../catalog/catalog.service.js';
import { TrendingRepository } from './trending.repository.js';
export interface TrendingAlbumItem {
    deezerId: string;
    title: string;
    artist: {
        deezerId: string;
        name: string;
        imageUrl: string | null;
    };
    coverUrl: string | null;
    reviewCount: number;
    avgRating: number;
}
export interface TrendingTrackItem {
    deezerId: string;
    title: string;
    artist: {
        deezerId: string;
        name: string;
        imageUrl: string | null;
    };
    albumDeezerId: string | null;
    coverUrl: string | null;
    reviewCount: number;
    avgRating: number;
}
export interface RankedTrendingAlbumItem extends TrendingAlbumItem {
    rank: number;
    rankChange: number | null;
}
export interface RankedTrendingTrackItem extends TrendingTrackItem {
    rank: number;
    rankChange: number | null;
}
export declare class TrendingService {
    private readonly repo;
    private readonly redis;
    private readonly catalogService;
    constructor(repo: TrendingRepository, redis: RedisService, catalogService: CatalogService);
    getAlbums(limit: number): Promise<RankedTrendingAlbumItem[]>;
    getTracks(limit: number): Promise<RankedTrendingTrackItem[]>;
    recalculate(): Promise<{
        albums: RankedTrendingAlbumItem[];
        tracks: RankedTrendingTrackItem[];
    }>;
    private getCached;
    private applyRankChange;
    private computeAlbums;
    private computeTracks;
    private resolveAlbumFallback;
}
