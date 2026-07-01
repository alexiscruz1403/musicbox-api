import { CatalogService } from './catalog.service.js';
import { SearchCatalogDto } from './dto/search-catalog.dto.js';
export declare class CatalogController {
    private readonly catalog;
    constructor(catalog: CatalogService);
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
}
