import { RedisService } from '../../redis/redis.service.js';
import type { TrendingAlbumItem, TrendingTrackItem } from '../trending/trending.service.js';
import { CatalogRepository } from './catalog.repository.js';
import type { CatalogArtistDetail } from './catalog.service.js';
import { CatalogService } from './catalog.service.js';
export interface ArtistDetailResponse {
    artist: CatalogArtistDetail;
    topReviewedAlbums: TrendingAlbumItem[];
    topReviewedTracks: TrendingTrackItem[];
    trendingAlbums: TrendingAlbumItem[];
    trendingTracks: TrendingTrackItem[];
}
export declare class ArtistDetailService {
    private readonly catalogService;
    private readonly repo;
    private readonly redis;
    constructor(catalogService: CatalogService, repo: CatalogRepository, redis: RedisService);
    getDetail(deezerId: string): Promise<ArtistDetailResponse>;
    private buildDetail;
}
