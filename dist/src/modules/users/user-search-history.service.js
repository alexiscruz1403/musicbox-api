var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserSearchHistoryService_1;
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserSearchHistoryRepository } from './user-search-history.repository.js';
let UserSearchHistoryService = UserSearchHistoryService_1 = class UserSearchHistoryService {
    repo;
    logger = new Logger(UserSearchHistoryService_1.name);
    constructor(repo) {
        this.repo = repo;
    }
    async recordSearch(searcherId, query) {
        try {
            await this.repo.upsertSearchHistory(searcherId, query);
        }
        catch (err) {
            this.logger.warn(`Failed to record user search history: ${err}`);
        }
    }
    async listHistory(searcherId) {
        return this.repo.listSearchHistory(searcherId);
    }
    async deleteHistoryItem(searcherId, id) {
        const deleted = await this.repo.deleteSearchHistoryItem(searcherId, id);
        if (!deleted)
            throw new NotFoundException({ code: 'SEARCH_HISTORY_ITEM_NOT_FOUND' });
    }
    async deleteAllHistory(searcherId) {
        await this.repo.deleteAllSearchHistory(searcherId);
    }
};
UserSearchHistoryService = UserSearchHistoryService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserSearchHistoryRepository])
], UserSearchHistoryService);
export { UserSearchHistoryService };
//# sourceMappingURL=user-search-history.service.js.map