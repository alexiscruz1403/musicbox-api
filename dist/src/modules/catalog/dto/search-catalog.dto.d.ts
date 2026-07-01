import type { CatalogSearchType } from '../providers/music-catalog.provider.js';
export declare class SearchCatalogDto {
    q: string;
    type: CatalogSearchType;
    limit: number;
    cursor?: string;
}
