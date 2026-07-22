import { Test, type TestingModule } from '@nestjs/testing';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  RECOMMENDATIONS_QUEUE,
  REVIEWS_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
import { ReviewsQueueProcessor } from './reviews-queue.processor.js';

const mockService = {
  recompute: vi.fn(),
};

const mockBoss = {
  send: vi.fn(),
  work: vi.fn(),
};
const mockPgBoss = { boss: mockBoss };

type WorkHandler = (jobs: { data: JobEnvelope }[]) => Promise<void>;

describe('ReviewsQueueProcessor', () => {
  let handle: WorkHandler;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsQueueProcessor,
        { provide: FollowSuggestionsService, useValue: mockService },
        { provide: PgBossService, useValue: mockPgBoss },
      ],
    }).compile();

    const processor = module.get(ReviewsQueueProcessor);
    await processor.onApplicationBootstrap();
    handle = mockBoss.work.mock.calls[0][1] as WorkHandler;
  });

  const payload: ReviewEventPayload = {
    reviewId: 'r1',
    userId: 'u1',
    type: 'ALBUM',
    albumId: 'a1',
    trackId: null,
  };
  const deliver = (event: string) => handle([{ data: { event, payload } }]);

  it('registers a worker on the reviews queue', () => {
    expect(mockBoss.work).toHaveBeenCalledWith(
      REVIEWS_QUEUE,
      expect.any(Function),
    );
  });

  it('recomputes suggestions for review.created', async () => {
    await deliver('review.created');
    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('no-ops for review.updated', async () => {
    await deliver('review.updated');
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops for review.deleted', async () => {
    await deliver('review.deleted');
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('relays review.created to the recommendations queue', async () => {
    await deliver('review.created');
    expect(mockBoss.send).toHaveBeenCalledWith(RECOMMENDATIONS_QUEUE, {
      event: 'review.created',
      payload,
    });
  });

  it('does not relay review.updated to the recommendations queue', async () => {
    await deliver('review.updated');
    expect(mockBoss.send).not.toHaveBeenCalled();
  });

  it('does not relay review.deleted to the recommendations queue', async () => {
    await deliver('review.deleted');
    expect(mockBoss.send).not.toHaveBeenCalled();
  });
});
