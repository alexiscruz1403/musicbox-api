import { ListTrendingQueryDto } from './dto/list-trending-query.dto.js';
import { TrendingService } from './trending.service.js';
export declare class TrendingController {
    private readonly service;
    constructor(service: TrendingService);
    getAlbums(query: ListTrendingQueryDto): Promise<{
        data: import("./trending.service.js").RankedTrendingAlbumItem[];
    }>;
    getTracks(query: ListTrendingQueryDto): Promise<{
        data: import("./trending.service.js").RankedTrendingTrackItem[];
    }>;
}
