var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
const SEARCH_HISTORY_LIMIT = 10;
const RECENTLY_VIEWED_LIMIT = 10;
let CatalogHistoryRepository = class CatalogHistoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    upsertSearchHistory(userId, query) {
        const now = new Date();
        return this.prisma.catalogSearchHistory.upsert({
            where: { userId_query: { userId, query } },
            update: { searchedAt: now },
            create: { userId, query, searchedAt: now },
        });
    }
    listSearchHistory(userId) {
        return this.prisma.catalogSearchHistory.findMany({
            where: { userId },
            orderBy: { searchedAt: 'desc' },
            take: SEARCH_HISTORY_LIMIT,
        });
    }
    async deleteSearchHistoryItem(userId, id) {
        const { count } = await this.prisma.catalogSearchHistory.deleteMany({
            where: { id, userId },
        });
        return count > 0;
    }
    deleteAllSearchHistory(userId) {
        return this.prisma.catalogSearchHistory.deleteMany({ where: { userId } });
    }
    upsertRecentlyViewed(userId, resourceType, deezerId, data) {
        const now = new Date();
        return this.prisma.recentlyViewedItem.upsert({
            where: {
                userId_resourceType_deezerId: { userId, resourceType, deezerId },
            },
            update: { ...data, viewedAt: now },
            create: { userId, resourceType, deezerId, ...data, viewedAt: now },
        });
    }
    listRecentlyViewed(userId) {
        return this.prisma.recentlyViewedItem.findMany({
            where: { userId },
            orderBy: { viewedAt: 'desc' },
            take: RECENTLY_VIEWED_LIMIT,
        });
    }
};
CatalogHistoryRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CatalogHistoryRepository);
export { CatalogHistoryRepository };
//# sourceMappingURL=catalog-history.repository.js.map