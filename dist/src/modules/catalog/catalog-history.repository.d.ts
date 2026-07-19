import { PrismaService } from '../../prisma/prisma.service.js';
import type { CatalogResourceType } from '../../../generated/prisma/client.js';
export interface RecordViewData {
    title: string;
    artistName: string | null;
    coverUrl: string | null;
    albumsCount: number | null;
}
export declare class CatalogHistoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsertSearchHistory(userId: string, query: string): import("../../../generated/prisma/models.js").Prisma__CatalogSearchHistoryClient<{
        id: string;
        userId: string;
        query: string;
        searchedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    listSearchHistory(userId: string): import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        userId: string;
        query: string;
        searchedAt: Date;
    }[]>;
    deleteSearchHistoryItem(userId: string, id: string): Promise<boolean>;
    deleteAllSearchHistory(userId: string): import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<import("../../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    upsertRecentlyViewed(userId: string, resourceType: CatalogResourceType, deezerId: string, data: RecordViewData): import("../../../generated/prisma/models.js").Prisma__RecentlyViewedItemClient<{
        id: string;
        coverUrl: string | null;
        userId: string;
        deezerId: string;
        title: string;
        resourceType: CatalogResourceType;
        artistName: string | null;
        albumsCount: number | null;
        viewedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    listRecentlyViewed(userId: string): import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        coverUrl: string | null;
        userId: string;
        deezerId: string;
        title: string;
        resourceType: CatalogResourceType;
        artistName: string | null;
        albumsCount: number | null;
        viewedAt: Date;
    }[]>;
}
