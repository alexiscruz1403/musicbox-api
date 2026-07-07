import { Test, TestingModule } from '@nestjs/testing';
import type { Job } from 'bullmq';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { RecommendationsRepository } from '../recommendations.repository.js';
import { RecommendationsService } from '../recommendations.service.js';
import { RecommendationsQueueProcessor } from './recommendations-queue.processor.js';

const mockService = {
  recompute: vi.fn(),
};

const mockRepo = {
  countActiveReviews: vi.fn(),
  listUserIdsWithSnapshot: vi.fn(),
};

describe('RecommendationsQueueProcessor', () => {
  let processor: RecommendationsQueueProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecommendationsQueueProcessor,
        { provide: RecommendationsService, useValue: mockService },
        { provide: RecommendationsRepository, useValue: mockRepo },
      ],
    }).compile();

    processor = module.get(RecommendationsQueueProcessor);
    vi.clearAllMocks();
  });

  const buildJob = (name: string, data?: ReviewEventPayload) =>
    ({ name, data }) as Job<ReviewEventPayload | undefined>;

  it('recomputes for review.created when the user has >= 3 active reviews', async () => {
    mockRepo.countActiveReviews.mockResolvedValue(3);

    await processor.process(
      buildJob('review.created', {
        reviewId: 'r1',
        userId: 'u1',
        type: 'ALBUM',
        albumId: 'a1',
        trackId: null,
      }),
    );

    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('no-ops for review.created when the user has < 3 active reviews', async () => {
    mockRepo.countActiveReviews.mockResolvedValue(2);

    await processor.process(
      buildJob('review.created', {
        reviewId: 'r1',
        userId: 'u1',
        type: 'ALBUM',
        albumId: 'a1',
        trackId: null,
      }),
    );

    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('recomputes for every user with an existing snapshot on the daily batch job', async () => {
    mockRepo.listUserIdsWithSnapshot.mockResolvedValue([
      { userId: 'u1' },
      { userId: 'u2' },
    ]);

    await processor.process(buildJob('generate-recommendations'));

    expect(mockService.recompute).toHaveBeenCalledWith('u1');
    expect(mockService.recompute).toHaveBeenCalledWith('u2');
    expect(mockService.recompute).toHaveBeenCalledTimes(2);
  });

  it('no-ops for unrelated job names', async () => {
    await processor.process(buildJob('review.updated'));

    expect(mockService.recompute).not.toHaveBeenCalled();
    expect(mockRepo.countActiveReviews).not.toHaveBeenCalled();
    expect(mockRepo.listUserIdsWithSnapshot).not.toHaveBeenCalled();
  });
});
