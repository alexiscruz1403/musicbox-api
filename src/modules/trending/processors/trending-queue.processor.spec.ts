import { Test, TestingModule } from '@nestjs/testing';
import type { Job } from 'bullmq';
import { TrendingService } from '../trending.service.js';
import { TrendingQueueProcessor } from './trending-queue.processor.js';

const mockService = {
  recalculate: vi.fn(),
};

describe('TrendingQueueProcessor', () => {
  let processor: TrendingQueueProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrendingQueueProcessor,
        { provide: TrendingService, useValue: mockService },
      ],
    }).compile();

    processor = module.get(TrendingQueueProcessor);
    vi.clearAllMocks();
  });

  const buildJob = (name: string): Job => ({ name }) as Job;

  it('recalculates trending for the recalculate-trending job', async () => {
    await processor.process(buildJob('recalculate-trending'));
    expect(mockService.recalculate).toHaveBeenCalled();
  });

  it('no-ops for unrelated job names', async () => {
    await processor.process(buildJob('some-other-job'));
    expect(mockService.recalculate).not.toHaveBeenCalled();
  });
});
