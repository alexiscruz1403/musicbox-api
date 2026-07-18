import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CatalogHistoryService } from './catalog-history.service.js';
export declare class CatalogHistoryController {
    private readonly history;
    constructor(history: CatalogHistoryService);
    listSearchHistory(user: JwtPayload): Promise<{
        data: {
            query: string;
            id: string;
            userId: string;
            searchedAt: Date;
        }[];
    }>;
    deleteSearchHistoryItem(user: JwtPayload, id: string): Promise<void>;
    deleteAllSearchHistory(user: JwtPayload): Promise<void>;
    listRecentlyViewed(user: JwtPayload): Promise<{
        data: {
            deezerId: string;
            title: string;
            coverUrl: string | null;
            id: string;
            albumsCount: number | null;
            userId: string;
            resourceType: import("../../../generated/prisma/enums.js").CatalogResourceType;
            artistName: string | null;
            viewedAt: Date;
        }[];
    }>;
    listRecentlyViewedDetails(user: JwtPayload): Promise<{
        data: import("./catalog-history.service.js").RecentlyViewedDetailItem[];
    }>;
}
