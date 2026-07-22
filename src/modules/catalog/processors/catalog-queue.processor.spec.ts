import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  CATALOG_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import { CatalogSyncService } from '../catalog-sync.service.js';
import { CATALOG_SYNC_JOB_NAME } from '../catalog.constants.js';
import { CatalogQueueProcessor } from './catalog-queue.processor.js';

const mockSyncService = {
  syncStaleArtists: vi.fn(),
};

const mockBoss = {
  send: vi.fn(),
  work: vi.fn(),
};
const mockPgBoss = { boss: mockBoss };

type WorkHandler = (jobs: { data: JobEnvelope }[]) => Promise<void>;

describe('CatalogQueueProcessor', () => {
  let handle: WorkHandler;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogQueueProcessor,
        { provide: CatalogSyncService, useValue: mockSyncService },
        { provide: PgBossService, useValue: mockPgBoss },
      ],
    }).compile();

    const processor = module.get(CatalogQueueProcessor);
    await processor.onApplicationBootstrap();
    handle = mockBoss.work.mock.calls[0][1] as WorkHandler;
  });

  const deliver = (event: string) => handle([{ data: { event, payload: {} } }]);

  it('registers a worker on the catalog queue', () => {
    expect(mockBoss.work).toHaveBeenCalledWith(
      CATALOG_QUEUE,
      expect.any(Function),
    );
  });

  it('syncs stale catalog for the sync-stale-catalog job', async () => {
    await deliver(CATALOG_SYNC_JOB_NAME);
    expect(mockSyncService.syncStaleArtists).toHaveBeenCalled();
  });

  it('no-ops for unrelated events', async () => {
    await deliver('some-other-job');
    expect(mockSyncService.syncStaleArtists).not.toHaveBeenCalled();
  });
});
