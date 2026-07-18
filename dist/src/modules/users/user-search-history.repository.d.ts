import { PrismaService } from '../../prisma/prisma.service.js';
export declare class UserSearchHistoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsertSearchHistory(searcherId: string, query: string): import("../../../generated/prisma/models.js").Prisma__UserSearchHistoryClient<{
        query: string;
        id: string;
        searchedAt: Date;
        searcherId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    listSearchHistory(searcherId: string): import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        query: string;
        id: string;
        searchedAt: Date;
        searcherId: string;
    }[]>;
    deleteSearchHistoryItem(searcherId: string, id: string): Promise<boolean>;
    deleteAllSearchHistory(searcherId: string): import("../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<import("../../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
}
