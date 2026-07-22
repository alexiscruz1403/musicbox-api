import { Test, type TestingModule } from '@nestjs/testing';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  NOTIFICATIONS_QUEUE,
  SOCIAL_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
import { SocialQueueProcessor } from './social-queue.processor.js';

const mockService = {
  recompute: vi.fn(),
};

// pg-boss: los relays se hacen con boss.send; el worker se registra con
// boss.work. Capturamos el handler que el processor registra y lo invocamos
// directo con un envelope { event, payload }.
const mockBoss = {
  send: vi.fn(),
  work: vi.fn(),
};
const mockPgBoss = { boss: mockBoss };

type WorkHandler = (jobs: { data: JobEnvelope }[]) => Promise<void>;

describe('SocialQueueProcessor', () => {
  let handle: WorkHandler;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialQueueProcessor,
        { provide: FollowSuggestionsService, useValue: mockService },
        { provide: PgBossService, useValue: mockPgBoss },
      ],
    }).compile();

    const processor = module.get(SocialQueueProcessor);
    await processor.onApplicationBootstrap();
    handle = mockBoss.work.mock.calls[0][1] as WorkHandler;
  });

  const deliver = (event: string, payload: object) =>
    handle([{ data: { event, payload } }]);

  const reactionPayload = (type: 'LIKE' | 'DISLIKE' = 'LIKE') => ({
    reactionId: 'r1',
    reviewId: 'rev1',
    reviewOwnerId: 'owner1',
    userId: 'u1',
    type,
  });
  const commentPayload = {
    commentId: 'c1',
    reviewId: 'rev1',
    reviewOwnerId: 'owner1',
    userId: 'u1',
  };
  const followPayload = { followerId: 'u1', followeeId: 'owner1' };
  const followRequestedPayload = { requesterId: 'u1', targetId: 'owner1' };
  const followAcceptedPayload = { requesterId: 'u1', accepterId: 'owner1' };

  it('registers a worker on the social queue', () => {
    expect(mockBoss.work).toHaveBeenCalledWith(
      SOCIAL_QUEUE,
      expect.any(Function),
    );
  });

  it('recomputes suggestions for reaction.added with type LIKE', async () => {
    await deliver('reaction.added', reactionPayload('LIKE'));
    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('recomputes suggestions for reaction.changed with type LIKE', async () => {
    await deliver('reaction.changed', reactionPayload('LIKE'));
    expect(mockService.recompute).toHaveBeenCalledWith('u1');
  });

  it('no-ops recompute for reaction.added with type DISLIKE', async () => {
    await deliver('reaction.added', reactionPayload('DISLIKE'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops recompute for reaction.changed with type DISLIKE', async () => {
    await deliver('reaction.changed', reactionPayload('DISLIKE'));
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops recompute for comment.created', async () => {
    await deliver('comment.created', commentPayload);
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('no-ops recompute for follow.created', async () => {
    await deliver('follow.created', followPayload);
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('relays reaction.added (any type) to the notifications queue', async () => {
    const payload = reactionPayload('DISLIKE');
    await deliver('reaction.added', payload);
    expect(mockBoss.send).toHaveBeenCalledWith(NOTIFICATIONS_QUEUE, {
      event: 'reaction.added',
      payload,
    });
  });

  it('relays comment.created to the notifications queue', async () => {
    await deliver('comment.created', commentPayload);
    expect(mockBoss.send).toHaveBeenCalledWith(NOTIFICATIONS_QUEUE, {
      event: 'comment.created',
      payload: commentPayload,
    });
  });

  it('relays follow.created to the notifications queue', async () => {
    await deliver('follow.created', followPayload);
    expect(mockBoss.send).toHaveBeenCalledWith(NOTIFICATIONS_QUEUE, {
      event: 'follow.created',
      payload: followPayload,
    });
  });

  it('does not relay reaction.changed to the notifications queue', async () => {
    await deliver('reaction.changed', reactionPayload('LIKE'));
    expect(mockBoss.send).not.toHaveBeenCalled();
  });

  it('relays follow.requested without recomputing suggestions', async () => {
    await deliver('follow.requested', followRequestedPayload);
    expect(mockBoss.send).toHaveBeenCalledWith(NOTIFICATIONS_QUEUE, {
      event: 'follow.requested',
      payload: followRequestedPayload,
    });
    expect(mockService.recompute).not.toHaveBeenCalled();
  });

  it('relays follow.request.accepted without recomputing suggestions', async () => {
    await deliver('follow.request.accepted', followAcceptedPayload);
    expect(mockBoss.send).toHaveBeenCalledWith(NOTIFICATIONS_QUEUE, {
      event: 'follow.request.accepted',
      payload: followAcceptedPayload,
    });
    expect(mockService.recompute).not.toHaveBeenCalled();
  });
});
