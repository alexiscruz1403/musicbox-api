import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSearchHistoryRepository } from './user-search-history.repository.js';
import { UserSearchHistoryService } from './user-search-history.service.js';

const mockRepo = {
  upsertSearchHistory: vi.fn(),
  listSearchHistory: vi.fn(),
  deleteSearchHistoryItem: vi.fn(),
  deleteAllSearchHistory: vi.fn(),
};

describe('UserSearchHistoryService', () => {
  let service: UserSearchHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSearchHistoryService,
        { provide: UserSearchHistoryRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get(UserSearchHistoryService);
    vi.clearAllMocks();
  });

  describe('recordSearch', () => {
    it('delegates to the repository', async () => {
      mockRepo.upsertSearchHistory.mockResolvedValue({});
      await service.recordSearch('user-1', 'jralexis');
      expect(mockRepo.upsertSearchHistory).toHaveBeenCalledWith(
        'user-1',
        'jralexis',
      );
    });

    it('swallows repository errors instead of throwing', async () => {
      mockRepo.upsertSearchHistory.mockRejectedValue(new Error('db down'));
      await expect(
        service.recordSearch('user-1', 'jralexis'),
      ).resolves.toBeUndefined();
    });
  });

  describe('deleteHistoryItem', () => {
    it('throws NotFoundException when nothing was deleted', async () => {
      mockRepo.deleteSearchHistoryItem.mockResolvedValue(false);
      await expect(
        service.deleteHistoryItem('user-1', 'missing-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('resolves when the item was deleted', async () => {
      mockRepo.deleteSearchHistoryItem.mockResolvedValue(true);
      await expect(
        service.deleteHistoryItem('user-1', 'item-1'),
      ).resolves.toBeUndefined();
    });
  });
});
