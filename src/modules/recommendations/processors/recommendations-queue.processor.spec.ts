import { Test, type TestingModule } from '@nestjs/testing';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  RECOMMENDATIONS_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { RECOMMENDATIONS_JOB_NAME } from '../recommendations.constants.js';
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

const mockBoss = {
  send: vi.fn(),
  work: vi.fn(),
};
const mockPgBoss = { boss: mockBoss };

type WorkHandler = (jobs: { data: JobEnvelope }[]) => Promise<void>;

describe('RecommendationsQueueProcessor', () => {
  let handle: WorkHandler;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecommendationsQueueProcessor,
        { provide: RecommendationsService, useValue: mockService },
        { provide: RecommendationsRepository, useValue: mockRepo },
        { provide: PgBossService, useValue: mockPgBoss },
      ],
    }).compile();

    const processor = module.get(RecommendationsQueueProcessor);
    await processor.onApplicationBootstrap();
    handle = mockBoss.work.mock.calls[0][1] as WorkHandler;
  });

  const reviewPayload: ReviewEventPayload = {
    reviewId: 'r1',
    userId: 'u1',
    type: 'ALBUM',
    albumId: 'a1',
    trackId: null,
  };
  const deliver = (event: string, payload: object = reviewPayload) =>
    handle([{ data: { event, payload } }]);

  it('recomputes for review.created when the user has >= 3 active reviews', async () => {
    mockRepo.countActiveReviews.mockResolvedValue(3);
    await deliver('review.created');
    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('no-ops for review.created when the user has < 3 active reviews', async () => {
    mockRepo.countActiveReviews.mockResolvedValue(2);
    await deliver('review.created');
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('recomputes for every user with an existing snapshot on the daily batch job', async () => {
    mockRepo.listUserIdsWithSnapshot.mockResolvedValue([
      { userId: 'u1' },
      { userId: 'u2' },
    ]);

    await deliver(RECOMMENDATIONS_JOB_NAME, {});

    expect(mockService.recompute).toHaveBeenCalledWith('u1');
    expect(mockService.recompute).toHaveBeenCalledWith('u2');
    expect(mockService.recompute).toHaveBeenCalledTimes(2);
  });

  it('no-ops for unrelated events', async () => {
    await deliver('review.updated');

    expect(mockService.recompute).not.toHaveBeenCalled();
    expect(mockRepo.countActiveReviews).not.toHaveBeenCalled();
    expect(mockRepo.listUserIdsWithSnapshot).not.toHaveBeenCalled();
  });

  it('registers a worker on the recommendations queue', () => {
    expect(mockBoss.work).toHaveBeenCalledWith(
      RECOMMENDATIONS_QUEUE,
      expect.any(Function),
    );
  });
});
