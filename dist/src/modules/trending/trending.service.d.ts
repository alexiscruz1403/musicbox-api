import { RedisService } from '../../redis/redis.service.js';
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
export declare class TrendingService {
    private readonly repo;
    private readonly redis;
    constructor(repo: TrendingRepository, redis: RedisService);
    getAlbums(limit: number): Promise<TrendingAlbumItem[]>;
    getTracks(limit: number): Promise<TrendingTrackItem[]>;
    recalculate(): Promise<{
        albums: TrendingAlbumItem[];
        tracks: TrendingTrackItem[];
    }>;
    private getCached;
    private computeAlbums;
    private computeTracks;
}
