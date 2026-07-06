import { getQueueToken } from '@nestjs/bullmq';
import { Test, TestingModule } from '@nestjs/testing';
import type { Job } from 'bullmq';
import { NOTIFICATIONS_QUEUE } from '../../events/events.constants.js';
import type {
  CommentEventPayload,
  FollowEventPayload,
  ReactionEventPayload,
} from '../../events/social-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
import { SocialQueueProcessor } from './social-queue.processor.js';

const mockService = {
  recompute: vi.fn(),
};

const mockNotificationsQueue = {
  add: vi.fn(),
};

describe('SocialQueueProcessor', () => {
  let processor: SocialQueueProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialQueueProcessor,
        { provide: FollowSuggestionsService, useValue: mockService },
        {
          provide: getQueueToken(NOTIFICATIONS_QUEUE),
          useValue: mockNotificationsQueue,
        },
      ],
    }).compile();

    processor = module.get(SocialQueueProcessor);
    vi.clearAllMocks();
  });

  const buildReactionJob = (
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

  const buildCommentJob = (): Job<CommentEventPayload> =>
    ({
      name: 'comment.created',
      data: {
        commentId: 'c1',
        reviewId: 'rev1',
        reviewOwnerId: 'owner1',
        userId: 'u1',
      },
    }) as Job<CommentEventPayload>;

  const buildFollowJob = (): Job<FollowEventPayload> =>
    ({
      name: 'follow.created',
      data: { followerId: 'u1', followeeId: 'owner1' },
    }) as Job<FollowEventPayload>;

  it('recomputes suggestions for reaction.added with type LIKE', async () => {
    await processor.process(buildReactionJob('reaction.added', 'LIKE'));
    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('recomputes suggestions for reaction.changed with type LIKE', async () => {
    await processor.process(buildReactionJob('reaction.changed', 'LIKE'));
    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('no-ops recompute for reaction.added with type DISLIKE', async () => {
    await processor.process(buildReactionJob('reaction.added', 'DISLIKE'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops recompute for reaction.changed with type DISLIKE', async () => {
    await processor.process(buildReactionJob('reaction.changed', 'DISLIKE'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops recompute for comment.created', async () => {
    await processor.process(buildCommentJob());
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops recompute for follow.created', async () => {
    await processor.process(buildFollowJob());
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('relays reaction.added (any type) to the notifications queue', async () => {
    const job = buildReactionJob('reaction.added', 'DISLIKE');
    await processor.process(job);
    expect(mockNotificationsQueue.add).toHaveBeenCalledWith(
      'reaction.added',
      job.data,
    );
  });

  it('relays comment.created to the notifications queue', async () => {
    const job = buildCommentJob();
    await processor.process(job);
    expect(mockNotificationsQueue.add).toHaveBeenCalledWith(
      'comment.created',
      job.data,
    );
  });

  it('relays follow.created to the notifications queue', async () => {
    const job = buildFollowJob();
    await processor.process(job);
    expect(mockNotificationsQueue.add).toHaveBeenCalledWith(
      'follow.created',
      job.data,
    );
  });

  it('does not relay reaction.changed to the notifications queue', async () => {
    await processor.process(buildReactionJob('reaction.changed', 'LIKE'));
    expect(mockNotificationsQueue.add).not.toHaveBeenCalled();
  });
});
