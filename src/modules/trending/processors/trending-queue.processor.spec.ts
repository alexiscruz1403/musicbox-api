import { Test, type TestingModule } from '@nestjs/testing';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  TRENDING_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import { TRENDING_JOB_NAME } from '../trending.constants.js';
import { TrendingService } from '../trending.service.js';
import { TrendingQueueProcessor } from './trending-queue.processor.js';

const mockService = {
  recalculate: vi.fn(),
};

const mockBoss = {
  send: vi.fn(),
  work: vi.fn(),
};
const mockPgBoss = { boss: mockBoss };

type WorkHandler = (jobs: { data: JobEnvelope }[]) => Promise<void>;

describe('TrendingQueueProcessor', () => {
  let handle: WorkHandler;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrendingQueueProcessor,
        { provide: TrendingService, useValue: mockService },
        { provide: PgBossService, useValue: mockPgBoss },
      ],
    }).compile();

    const processor = module.get(TrendingQueueProcessor);
    await processor.onApplicationBootstrap();
    handle = mockBoss.work.mock.calls[0][1] as WorkHandler;
  });

  const deliver = (event: string) => handle([{ data: { event, payload: {} } }]);

  it('registers a worker on the trending queue', () => {
    expect(mockBoss.work).toHaveBeenCalledWith(
      TRENDING_QUEUE,
      expect.any(Function),
    );
  });

  it('recalculates trending for the recalculate-trending job', async () => {
    await deliver(TRENDING_JOB_NAME);
    expect(mockService.recalculate).toHaveBeenCalled();
  });

  it('no-ops for unrelated events', async () => {
    await deliver('some-other-job');
    expect(mockService.recalculate).not.toHaveBeenCalled();
  });
});
