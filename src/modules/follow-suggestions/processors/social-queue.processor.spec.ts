import { Test, TestingModule } from '@nestjs/testing';
import type { Job } from 'bullmq';
import type { ReactionEventPayload } from '../../events/social-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
import { SocialQueueProcessor } from './social-queue.processor.js';

const mockService = {
  recompute: vi.fn(),
};

describe('SocialQueueProcessor', () => {
  let processor: SocialQueueProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialQueueProcessor,
        { provide: FollowSuggestionsService, useValue: mockService },
      ],
    }).compile();

    processor = module.get(SocialQueueProcessor);
    vi.clearAllMocks();
  });

  const buildJob = (
    name: string,
    type: 'LIKE' | 'DISLIKE' = 'LIKE',
  ): Job<ReactionEventPayload> =>
    ({
      name,
      data: {
        reactionId: 'r1',
        reviewId: 'rev1',
        reviewOwnerId: 'owner1',
        userId: 'u1',
        type,
      },
    }) as Job<ReactionEventPayload>;

  it('recomputes suggestions for reaction.added with type LIKE', async () => {
    await processor.process(buildJob('reaction.added', 'LIKE'));
    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('recomputes suggestions for reaction.changed with type LIKE', async () => {
    await processor.process(buildJob('reaction.changed', 'LIKE'));
    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('no-ops for reaction.added with type DISLIKE', async () => {
    await processor.process(buildJob('reaction.added', 'DISLIKE'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops for reaction.changed with type DISLIKE', async () => {
    await processor.process(buildJob('reaction.changed', 'DISLIKE'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops for comment.created', async () => {
    await processor.process(buildJob('comment.created'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops for follow.created', async () => {
    await processor.process(buildJob('follow.created'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });
});
