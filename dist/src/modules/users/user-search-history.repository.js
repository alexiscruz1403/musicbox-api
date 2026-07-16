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
let UserSearchHistoryRepository = class UserSearchHistoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    upsertSearchHistory(searcherId, query) {
        const now = new Date();
        return this.prisma.userSearchHistory.upsert({
            where: { searcherId_query: { searcherId, query } },
            update: { searchedAt: now },
            create: { searcherId, query, searchedAt: now },
        });
    }
    listSearchHistory(searcherId) {
        return this.prisma.userSearchHistory.findMany({
            where: { searcherId },
            orderBy: { searchedAt: 'desc' },
            take: SEARCH_HISTORY_LIMIT,
        });
    }
    async deleteSearchHistoryItem(searcherId, id) {
        const { count } = await this.prisma.userSearchHistory.deleteMany({
            where: { id, searcherId },
        });
        return count > 0;
    }
    deleteAllSearchHistory(searcherId) {
        return this.prisma.userSearchHistory.deleteMany({ where: { searcherId } });
    }
};
UserSearchHistoryRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UserSearchHistoryRepository);
export { UserSearchHistoryRepository };
//# sourceMappingURL=user-search-history.repository.js.map