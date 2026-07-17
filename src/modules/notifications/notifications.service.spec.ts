import { Test, TestingModule } from '@nestjs/testing';
import { ListNotificationsQueryDto } from './dto/list-notifications-query.dto.js';
import { NotificationsRepository } from './notifications.repository.js';
import { NotificationsService } from './notifications.service.js';
import { NotificationsSseService } from './notifications-sse.service.js';
import { WebPushService } from './push/web-push.service.js';

const mockRepo = {
  getRecipientGate: vi.fn(),
  findRecentGroupable: vi.fn(),
  incrementGroup: vi.fn(),
  create: vi.fn(),
  findHydratedById: vi.fn(),
  findById: vi.fn(),
  list: vi.fn(),
  markRead: vi.fn(),
  markAllRead: vi.fn(),
};

const mockSse = {
  push: vi.fn(),
};

const mockWebPush = {
  sendToUser: vi.fn(),
};

const enabledGate = {
  notifEnabled: true,
  notifPreference: {
    likesEnabled: true,
    dislikesEnabled: true,
    commentsEnabled: true,
    followsEnabled: true,
    followRequestsEnabled: true,
  },
};

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: NotificationsRepository, useValue: mockRepo },
        { provide: NotificationsSseService, useValue: mockSse },
        { provide: WebPushService, useValue: mockWebPush },
      ],
    }).compile();

    service = module.get(NotificationsService);
    vi.clearAllMocks();
    mockRepo.getRecipientGate.mockResolvedValue(enabledGate);
  });

  describe('createFromEvent', () => {
    it('ignores unrecognized job names', async () => {
      await service.createFromEvent('some.other.event', {});
      expect(mockRepo.getRecipientGate).not.toHaveBeenCalled();
    });

    it('skips self-actions (actor reacting to their own review)', async () => {
      await service.createFromEvent('reaction.added', {
        reactionId: 'r1',
        reviewId: 'rev1',
        reviewOwnerId: 'u1',
        userId: 'u1',
        type: 'LIKE',
      });
      expect(mockRepo.getRecipientGate).not.toHaveBeenCalled();
      expect(mockRepo.create).not.toHaveBeenCalled();
    });

    it('skips when the recipient has notifEnabled=false (global kill switch)', async () => {
      mockRepo.getRecipientGate.mockResolvedValue({
        ...enabledGate,
        notifEnabled: false,
      });
      await service.createFromEvent('comment.created', {
        commentId: 'c1',
        reviewId: 'rev1',
        reviewOwnerId: 'owner1',
        userId: 'actor1',
      });
      expect(mockRepo.create).not.toHaveBeenCalled();
    });

    it('skips when the specific preference (commentsEnabled) is disabled', async () => {
      mockRepo.getRecipientGate.mockResolvedValue({
        ...enabledGate,
        notifPreference: {
          ...enabledGate.notifPreference,
          commentsEnabled: false,
        },
      });
      await service.createFromEvent('comment.created', {
        commentId: 'c1',
        reviewId: 'rev1',
        reviewOwnerId: 'owner1',
        userId: 'actor1',
      });
      expect(mockRepo.create).not.toHaveBeenCalled();
    });

    it('defaults to enabled when no NotificationPreference row exists', async () => {
      mockRepo.getRecipientGate.mockResolvedValue({
        notifEnabled: true,
        notifPreference: null,
      });
      mockRepo.findRecentGroupable.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ id: 'n1' });

      await service.createFromEvent('follow.created', {
        followerId: 'a1',
        followeeId: 'owner1',
      });

      expect(mockRepo.create).toHaveBeenCalledWith({
        recipientId: 'owner1',
        actorId: 'a1',
        type: 'FOLLOW',
      });
    });

    it('creates a comment notification and pushes it over SSE', async () => {
      mockRepo.create.mockResolvedValue({ id: 'n1', type: 'COMMENT' });

      await service.createFromEvent('comment.created', {
        commentId: 'c1',
        reviewId: 'rev1',
        reviewOwnerId: 'owner1',
        userId: 'actor1',
      });

      expect(mockRepo.create).toHaveBeenCalledWith({
        recipientId: 'owner1',
        actorId: 'actor1',
        type: 'COMMENT',
        reviewId: 'rev1',
        commentId: 'c1',
      });
      expect(mockSse.push).toHaveBeenCalledWith('owner1', {
        id: 'n1',
        type: 'COMMENT',
      });
      expect(mockWebPush.sendToUser).toHaveBeenCalledWith('owner1', {
        id: 'n1',
        type: 'COMMENT',
      });
    });

    it('creates a new reaction notification when none exists in the grouping window', async () => {
      mockRepo.findRecentGroupable.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ id: 'n1' });

      await service.createFromEvent('reaction.added', {
        reactionId: 'r1',
        reviewId: 'rev1',
        reviewOwnerId: 'owner1',
        userId: 'actor1',
        type: 'LIKE',
      });

      expect(mockRepo.create).toHaveBeenCalledWith({
        recipientId: 'owner1',
        actorId: 'actor1',
        type: 'LIKE',
        reviewId: 'rev1',
      });
    });

    it('groups a second LIKE within the window into the same notification (actorCount 2)', async () => {
      mockRepo.findRecentGroupable.mockResolvedValue({
        id: 'existing1',
        actorCount: null,
      });
      mockRepo.incrementGroup.mockResolvedValue({
        id: 'existing1',
        actorCount: 2,
      });

      await service.createFromEvent('reaction.added', {
        reactionId: 'r2',
        reviewId: 'rev1',
        reviewOwnerId: 'owner1',
        userId: 'actor2',
        type: 'LIKE',
      });

      expect(mockRepo.incrementGroup).toHaveBeenCalledWith(
        'existing1',
        'actor2',
        2,
      );
    });

    it('increments actorCount further on a third LIKE in the same window', async () => {
      mockRepo.findRecentGroupable.mockResolvedValue({
        id: 'existing1',
        actorCount: 2,
      });
      mockRepo.incrementGroup.mockResolvedValue({
        id: 'existing1',
        actorCount: 3,
      });

      await service.createFromEvent('reaction.added', {
        reactionId: 'r3',
        reviewId: 'rev1',
        reviewOwnerId: 'owner1',
        userId: 'actor3',
        type: 'LIKE',
      });

      expect(mockRepo.incrementGroup).toHaveBeenCalledWith(
        'existing1',
        'actor3',
        3,
      );
    });

    it('keeps LIKE and DISLIKE in separate buckets (queries findRecentGroupable with the right type)', async () => {
      mockRepo.findRecentGroupable.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ id: 'n1' });

      await service.createFromEvent('reaction.added', {
        reactionId: 'r1',
        reviewId: 'rev1',
        reviewOwnerId: 'owner1',
        userId: 'actor1',
        type: 'DISLIKE',
      });

      expect(mockRepo.findRecentGroupable).toHaveBeenCalledWith(
        'owner1',
        'rev1',
        'DISLIKE',
        expect.any(Date),
      );
    });

    it('never groups comments or follows (no findRecentGroupable call)', async () => {
      mockRepo.create.mockResolvedValue({ id: 'n1' });

      await service.createFromEvent('follow.created', {
        followerId: 'a1',
        followeeId: 'owner1',
      });

      expect(mockRepo.findRecentGroupable).not.toHaveBeenCalled();
      expect(mockRepo.create).toHaveBeenCalled();
    });

    it('creates a FOLLOW_REQUEST notification for the target', async () => {
      mockRepo.create.mockResolvedValue({ id: 'n1', type: 'FOLLOW_REQUEST' });

      await service.createFromEvent('follow.requested', {
        requesterId: 'a1',
        targetId: 'owner1',
      });

      expect(mockRepo.create).toHaveBeenCalledWith({
        recipientId: 'owner1',
        actorId: 'a1',
        type: 'FOLLOW_REQUEST',
      });
      expect(mockSse.push).toHaveBeenCalledWith('owner1', {
        id: 'n1',
        type: 'FOLLOW_REQUEST',
      });
    });

    it('creates a FOLLOW_REQUEST_ACCEPTED notification for the requester', async () => {
      mockRepo.create.mockResolvedValue({
        id: 'n1',
        type: 'FOLLOW_REQUEST_ACCEPTED',
      });

      await service.createFromEvent('follow.request.accepted', {
        requesterId: 'a1',
        accepterId: 'owner1',
      });

      expect(mockRepo.create).toHaveBeenCalledWith({
        recipientId: 'a1',
        actorId: 'owner1',
        type: 'FOLLOW_REQUEST_ACCEPTED',
      });
      expect(mockSse.push).toHaveBeenCalledWith('a1', {
        id: 'n1',
        type: 'FOLLOW_REQUEST_ACCEPTED',
      });
    });

    it('gates FOLLOW_REQUEST behind followRequestsEnabled (distinct from followsEnabled)', async () => {
      mockRepo.getRecipientGate.mockResolvedValue({
        ...enabledGate,
        notifPreference: {
          ...enabledGate.notifPreference,
          followRequestsEnabled: false,
        },
      });

      await service.createFromEvent('follow.requested', {
        requesterId: 'a1',
        targetId: 'owner1',
      });

      expect(mockRepo.create).not.toHaveBeenCalled();
    });

    it('gates FOLLOW_REQUEST_ACCEPTED behind followRequestsEnabled', async () => {
      mockRepo.getRecipientGate.mockResolvedValue({
        ...enabledGate,
        notifPreference: {
          ...enabledGate.notifPreference,
          followRequestsEnabled: false,
        },
      });

      await service.createFromEvent('follow.request.accepted', {
        requesterId: 'a1',
        accepterId: 'owner1',
      });

      expect(mockRepo.create).not.toHaveBeenCalled();
    });

    it('does not gate FOLLOW_REQUEST behind followsEnabled (the two preferences are independent)', async () => {
      mockRepo.getRecipientGate.mockResolvedValue({
        ...enabledGate,
        notifPreference: {
          ...enabledGate.notifPreference,
          followsEnabled: false,
          followRequestsEnabled: true,
        },
      });
      mockRepo.create.mockResolvedValue({ id: 'n1', type: 'FOLLOW_REQUEST' });

      await service.createFromEvent('follow.requested', {
        requesterId: 'a1',
        targetId: 'owner1',
      });

      expect(mockRepo.create).toHaveBeenCalled();
    });
  });

  describe('markRead', () => {
    it('throws NOTIFICATION_NOT_FOUND when the notification does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(service.markRead('u1', 'missing')).rejects.toMatchObject({
        response: { code: 'NOTIFICATION_NOT_FOUND' },
      });
    });

    it('throws NOT_NOTIFICATION_RECIPIENT when the caller is not the recipient', async () => {
      mockRepo.findById.mockResolvedValue({
        id: 'n1',
        recipientId: 'someone-else',
        readAt: null,
      });
      await expect(service.markRead('u1', 'n1')).rejects.toMatchObject({
        response: { code: 'NOT_NOTIFICATION_RECIPIENT' },
      });
    });

    it('is idempotent when already read', async () => {
      const notification = { id: 'n1', recipientId: 'u1', readAt: new Date() };
      mockRepo.findById.mockResolvedValue(notification);

      const result = await service.markRead('u1', 'n1');

      expect(result).toBe(notification);
      expect(mockRepo.markRead).not.toHaveBeenCalled();
    });

    it('marks an unread notification as read', async () => {
      mockRepo.findById.mockResolvedValue({
        id: 'n1',
        recipientId: 'u1',
        readAt: null,
      });
      mockRepo.markRead.mockResolvedValue({
        id: 'n1',
        recipientId: 'u1',
        readAt: new Date(),
      });

      await service.markRead('u1', 'n1');

      expect(mockRepo.markRead).toHaveBeenCalledWith('n1');
    });
  });

  it('markAllRead delegates to the repository', async () => {
    await service.markAllRead('u1');
    expect(mockRepo.markAllRead).toHaveBeenCalledWith('u1');
  });

  it('list forwards cursor/limit/unreadOnly to the repository', async () => {
    mockRepo.list.mockResolvedValue({ items: [], nextCursor: null });
    const query: ListNotificationsQueryDto = {
      cursor: 'c',
      limit: 10,
      unreadOnly: true,
    };

    await service.list('u1', query);

    expect(mockRepo.list).toHaveBeenCalledWith('u1', 'c', 10, true);
  });

  describe('notifyModeration', () => {
    it('creates a MODERATION notification without gating and pushes it over SSE', async () => {
      mockRepo.create.mockResolvedValue({ id: 'n1', type: 'MODERATION' });

      await service.notifyModeration('owner1', { reviewId: 'rev1' });

      expect(mockRepo.getRecipientGate).not.toHaveBeenCalled();
      expect(mockRepo.create).toHaveBeenCalledWith({
        recipientId: 'owner1',
        type: 'MODERATION',
        reviewId: 'rev1',
      });
      expect(mockSse.push).toHaveBeenCalledWith('owner1', {
        id: 'n1',
        type: 'MODERATION',
      });
      expect(mockWebPush.sendToUser).toHaveBeenCalledWith('owner1', {
        id: 'n1',
        type: 'MODERATION',
      });
    });
  });
});
