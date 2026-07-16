import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

const SEARCH_HISTORY_LIMIT = 10;

@Injectable()
export class UserSearchHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertSearchHistory(searcherId: string, query: string) {
    const now = new Date();
    return this.prisma.userSearchHistory.upsert({
      where: { searcherId_query: { searcherId, query } },
      update: { searchedAt: now },
      create: { searcherId, query, searchedAt: now },
    });
  }

  listSearchHistory(searcherId: string) {
    return this.prisma.userSearchHistory.findMany({
      where: { searcherId },
      orderBy: { searchedAt: 'desc' },
      take: SEARCH_HISTORY_LIMIT,
    });
  }

  async deleteSearchHistoryItem(
    searcherId: string,
    id: string,
  ): Promise<boolean> {
    const { count } = await this.prisma.userSearchHistory.deleteMany({
      where: { id, searcherId },
    });
    return count > 0;
  }

  deleteAllSearchHistory(searcherId: string) {
    return this.prisma.userSearchHistory.deleteMany({ where: { searcherId } });
  }
}
