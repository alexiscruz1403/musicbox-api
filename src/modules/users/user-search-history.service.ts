import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserSearchHistoryRepository } from './user-search-history.repository.js';

@Injectable()
export class UserSearchHistoryService {
  private readonly logger = new Logger(UserSearchHistoryService.name);

  constructor(private readonly repo: UserSearchHistoryRepository) {}

  // Auxiliary side effect hung off the public GET /users/search endpoint — a
  // transient DB hiccup here must never turn a successful search into a 500.
  async recordSearch(searcherId: string, query: string): Promise<void> {
    try {
      await this.repo.upsertSearchHistory(searcherId, query);
    } catch (err) {
      this.logger.warn(`Failed to record user search history: ${err}`);
    }
  }

  async listHistory(searcherId: string) {
    return this.repo.listSearchHistory(searcherId);
  }

  async deleteHistoryItem(searcherId: string, id: string): Promise<void> {
    const deleted = await this.repo.deleteSearchHistoryItem(searcherId, id);
    if (!deleted)
      throw new NotFoundException({ code: 'SEARCH_HISTORY_ITEM_NOT_FOUND' });
  }

  async deleteAllHistory(searcherId: string): Promise<void> {
    await this.repo.deleteAllSearchHistory(searcherId);
  }
}
