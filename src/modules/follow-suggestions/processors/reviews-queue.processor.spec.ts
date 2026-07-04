import { Test, TestingModule } from '@nestjs/testing';
import type { Job } from 'bullmq';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
import { ReviewsQueueProcessor } from './reviews-queue.processor.js';

const mockService = {
  recompute: vi.fn(),
};

describe('ReviewsQueueProcessor', () => {
  let processor: ReviewsQueueProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsQueueProcessor,
        { provide: FollowSuggestionsService, useValue: mockService },
      ],
    }).compile();

    processor = module.get(ReviewsQueueProcessor);
    vi.clearAllMocks();
  });

  const buildJob = (name: string) =>
    ({
      name,
      data: { userId: 'u1' },
    }) as Job<ReviewEventPayload>;

  it('recomputes suggestions for review.created', async () => {
    await processor.process(buildJob('review.created'));
    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('no-ops for review.updated', async () => {
    await processor.process(buildJob('review.updated'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops for review.deleted', async () => {
    await processor.process(buildJob('review.deleted'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });
});
