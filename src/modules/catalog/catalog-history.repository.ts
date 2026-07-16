import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { CatalogResourceType } from '../../../generated/prisma/client.js';

const SEARCH_HISTORY_LIMIT = 10;
const RECENTLY_VIEWED_LIMIT = 10;

export interface RecordViewData {
  title: string;
  artistName: string | null;
  coverUrl: string | null;
  albumsCount: number | null;
}

@Injectable()
export class CatalogHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertSearchHistory(userId: string, query: string) {
    const now = new Date();
    return this.prisma.catalogSearchHistory.upsert({
      where: { userId_query: { userId, query } },
      update: { searchedAt: now },
      create: { userId, query, searchedAt: now },
    });
  }

  listSearchHistory(userId: string) {
    return this.prisma.catalogSearchHistory.findMany({
      where: { userId },
      orderBy: { searchedAt: 'desc' },
      take: SEARCH_HISTORY_LIMIT,
    });
  }

  async deleteSearchHistoryItem(userId: string, id: string): Promise<boolean> {
    const { count } = await this.prisma.catalogSearchHistory.deleteMany({
      where: { id, userId },
    });
    return count > 0;
  }

  deleteAllSearchHistory(userId: string) {
    return this.prisma.catalogSearchHistory.deleteMany({ where: { userId } });
  }

  upsertRecentlyViewed(
    userId: string,
    resourceType: CatalogResourceType,
    deezerId: string,
    data: RecordViewData,
  ) {
    const now = new Date();
    return this.prisma.recentlyViewedItem.upsert({
      where: {
        userId_resourceType_deezerId: { userId, resourceType, deezerId },
      },
      update: { ...data, viewedAt: now },
      create: { userId, resourceType, deezerId, ...data, viewedAt: now },
    });
  }

  listRecentlyViewed(userId: string) {
    return this.prisma.recentlyViewedItem.findMany({
      where: { userId },
      orderBy: { viewedAt: 'desc' },
      take: RECENTLY_VIEWED_LIMIT,
    });
  }
}
