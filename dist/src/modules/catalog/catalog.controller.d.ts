import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogService } from './catalog.service.js';
import { ArtistTracksQueryDto } from './dto/artist-tracks-query.dto.js';
import { SearchCatalogDto } from './dto/search-catalog.dto.js';
export declare class CatalogController {
    private readonly catalog;
    private readonly artistDetail;
    constructor(catalog: CatalogService, artistDetail: ArtistDetailService);
    search(dto: SearchCatalogDto): Promise<{
        data: import("./providers/music-catalog.provider.js").CatalogPage<import("./providers/music-catalog.provider.js").CatalogSearchResult>;
    }>;
    getAlbum(deezerId: string): Promise<{
        data: import("./providers/music-catalog.provider.js").CatalogAlbum;
    }>;
    getTrack(deezerId: string): Promise<{
        data: import("./providers/music-catalog.provider.js").CatalogTrack;
    }>;
    getArtistAlbums(deezerId: string, limit?: string, cursor?: string): Promise<{
        data: import("./providers/music-catalog.provider.js").CatalogPage<import("./providers/music-catalog.provider.js").CatalogAlbum>;
    }>;
    getArtist(deezerId: string): Promise<{
        data: import("./providers/music-catalog.provider.js").CatalogArtist;
    }>;
    getArtistDetail(deezerId: string): Promise<{
        data: import("./artist-detail.service.js").ArtistDetailResponse;
    }>;
    getArtistTracks(deezerId: string, dto: ArtistTracksQueryDto): Promise<{
        data: import("./providers/music-catalog.provider.js").CatalogPage<import("./providers/music-catalog.provider.js").ArtistTrackItem>;
    }>;
}
