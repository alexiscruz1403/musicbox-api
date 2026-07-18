import type { Request } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogHistoryService } from './catalog-history.service.js';
import { CatalogQuickSearchService } from './catalog-quick-search.service.js';
import { CatalogService } from './catalog.service.js';
import { ArtistTracksQueryDto } from './dto/artist-tracks-query.dto.js';
import { QuickSearchCatalogDto } from './dto/quick-search-catalog.dto.js';
import { SearchCatalogDto } from './dto/search-catalog.dto.js';
export declare class CatalogController {
    private readonly catalog;
    private readonly artistDetail;
    private readonly quickSearch;
    private readonly history;
    constructor(catalog: CatalogService, artistDetail: ArtistDetailService, quickSearch: CatalogQuickSearchService, history: CatalogHistoryService);
    search(dto: SearchCatalogDto, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: import("./providers/music-catalog.provider.js").CatalogPage<import("./catalog.service.js").EnrichedCatalogSearchResult>;
    }>;
    quickSearchCatalog(dto: QuickSearchCatalogDto): Promise<{
        data: import("./catalog-quick-search.service.js").QuickSearchCatalogItem[];
    }>;
    getAlbum(deezerId: string, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: import("./catalog.service.js").CatalogAlbumDetail;
    }>;
    getTrack(deezerId: string, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: import("./catalog.service.js").CatalogTrackDetail;
    }>;
    getArtistAlbums(deezerId: string, limit?: string, cursor?: string): Promise<{
        data: import("./providers/music-catalog.provider.js").CatalogPage<import("./providers/music-catalog.provider.js").CatalogAlbum>;
    }>;
    getArtist(deezerId: string): Promise<{
        data: import("./catalog.service.js").CatalogArtistDetail;
    }>;
    getArtistDetail(deezerId: string, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: import("./artist-detail.service.js").ArtistDetailResponse;
    }>;
    getArtistTracks(deezerId: string, dto: ArtistTracksQueryDto): Promise<{
        data: import("./providers/music-catalog.provider.js").CatalogPage<import("./providers/music-catalog.provider.js").CatalogTrack>;
    }>;
}
