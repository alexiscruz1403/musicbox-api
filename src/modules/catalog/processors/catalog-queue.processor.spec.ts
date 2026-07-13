import { Test, TestingModule } from '@nestjs/testing';
import type { Job } from 'bullmq';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CatalogSyncService } from '../catalog-sync.service.js';
import { CatalogQueueProcessor } from './catalog-queue.processor.js';

const mockSyncService = {
  syncStaleArtists: vi.fn(),
};

describe('CatalogQueueProcessor', () => {
  let processor: CatalogQueueProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogQueueProcessor,
        { provide: CatalogSyncService, useValue: mockSyncService },
      ],
    }).compile();

    processor = module.get(CatalogQueueProcessor);
    vi.clearAllMocks();
  });

  const buildJob = (name: string): Job => ({ name }) as Job;

  it('syncs stale catalog for the sync-stale-catalog job', async () => {
    await processor.process(buildJob('sync-stale-catalog'));
    expect(mockSyncService.syncStaleArtists).toHaveBeenCalled();
  });

  it('no-ops for unrelated job names', async () => {
    await processor.process(buildJob('some-other-job'));
    expect(mockSyncService.syncStaleArtists).not.toHaveBeenCalled();
  });
});
