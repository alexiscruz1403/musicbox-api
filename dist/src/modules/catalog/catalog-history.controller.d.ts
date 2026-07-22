import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CatalogHistoryService } from './catalog-history.service.js';
export declare class CatalogHistoryController {
    private readonly history;
    constructor(history: CatalogHistoryService);
    listSearchHistory(user: JwtPayload): Promise<{
        data: {
            query: string;
            userId: string;
            id: string;
            searchedAt: Date;
        }[];
    }>;
    deleteSearchHistoryItem(user: JwtPayload, id: string): Promise<void>;
    deleteAllSearchHistory(user: JwtPayload): Promise<void>;
    listRecentlyViewed(user: JwtPayload): Promise<{
        data: {
            userId: string;
            id: string;
            coverUrl: string | null;
            deezerId: string;
            title: string;
            resourceType: import("../../../generated/prisma/enums.js").CatalogResourceType;
            artistName: string | null;
            albumsCount: number | null;
            viewedAt: Date;
        }[];
    }>;
    listRecentlyViewedDetails(user: JwtPayload): Promise<{
        data: import("./catalog-history.service.js").RecentlyViewedDetailItem[];
    }>;
}
