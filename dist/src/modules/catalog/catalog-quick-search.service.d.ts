import { CatalogService } from './catalog.service.js';
export type QuickSearchCatalogItem = {
    type: 'artist';
    deezerId: string;
    coverUrl: string | null;
    title: string;
    artist: null;
    albumsCount: number;
} | {
    type: 'album' | 'track';
    deezerId: string;
    coverUrl: string | null;
    title: string;
    artist: string;
};
export declare class CatalogQuickSearchService {
    private readonly catalog;
    constructor(catalog: CatalogService);
    quickSearch(query: string): Promise<QuickSearchCatalogItem[]>;
}
