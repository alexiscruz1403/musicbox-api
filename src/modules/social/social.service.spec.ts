import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import { SocialRepository } from './social.repository.js';
import { SocialService } from './social.service.js';

const mockRepo = {
  getActiveReviewOwner: vi.fn(),
  isOwnerVisibleTo: vi.fn(),
  findReaction: vi.fn(),
  upsertReaction: vi.fn(),
  deleteReaction: vi.fn(),
  createComment: vi.fn(),
  findCommentById: vi.fn(),
  updateComment: vi.fn(),
  softDeleteComment: vi.fn(),
  listComments: vi.fn(),
};

const mockEvents = {
  emitReactionAdded: vi.fn(),
  emitReactionChanged: vi.fn(),
  emitCommentCreated: vi.fn(),
  emitFollowCreated: vi.fn(),
};

describe('SocialService', () => {
  let service: SocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialService,
        { provide: SocialRepository, useValue: mockRepo },
        { provide: SocialEventsProducer, useValue: mockEvents },
      ],
    }).compile();

    service = module.get(SocialService);
    vi.clearAllMocks();
    mockRepo.isOwnerVisibleTo.mockResolvedValue(true);
  });

  describe('react', () => {
    it('throws NotFoundException if review is missing/inactive', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue(null);
      await expect(service.react('u1', 'r1', { type: 'LIKE' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('emits reaction.added when no prior reaction exists', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.findReaction.mockResolvedValue(null);
      mockRepo.upsertReaction.mockResolvedValue({
        id: 'react1',
        type: 'LIKE',
      });

      await service.react('u1', 'r1', { type: 'LIKE' });

      expect(mockEvents.emitReactionAdded).toHaveBeenCalledWith({
        reactionId: 'react1',
        reviewId: 'r1',
        reviewOwnerId: 'owner1',
        userId: 'u1',
        type: 'LIKE',
      });
      expect(mockEvents.emitReactionChanged).not.toHaveBeenCalled();
    });

    it('emits reaction.changed when type flips', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.findReaction.mockResolvedValue({
        id: 'react1',
        type: 'LIKE',
      });
      mockRepo.upsertReaction.mockResolvedValue({
        id: 'react1',
        type: 'DISLIKE',
      });

      await service.react('u1', 'r1', { type: 'DISLIKE' });

      expect(mockEvents.emitReactionChanged).toHaveBeenCalledWith({
        reactionId: 'react1',
        reviewId: 'r1',
        reviewOwnerId: 'owner1',
        userId: 'u1',
        type: 'DISLIKE',
      });
      expect(mockEvents.emitReactionAdded).not.toHaveBeenCalled();
    });

    it('emits no event when re-submitting the same type', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.findReaction.mockResolvedValue({
        id: 'react1',
        type: 'LIKE',
      });
      mockRepo.upsertReaction.mockResolvedValue({
        id: 'react1',
        type: 'LIKE',
      });

      await service.react('u1', 'r1', { type: 'LIKE' });

      expect(mockEvents.emitReactionAdded).not.toHaveBeenCalled();
      expect(mockEvents.emitReactionChanged).not.toHaveBeenCalled();
    });

    it('throws ForbiddenException when the review owner is private and not visible', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.isOwnerVisibleTo.mockResolvedValue(false);

      await expect(service.react('u1', 'r1', { type: 'LIKE' })).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockRepo.findReaction).not.toHaveBeenCalled();
    });
  });

  describe('removeReaction', () => {
    it('throws NotFoundException if review is missing/inactive', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue(null);
      await expect(service.removeReaction('u1', 'r1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException if no reaction exists', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.findReaction.mockResolvedValue(null);
      await expect(service.removeReaction('u1', 'r1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deletes reaction on success', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.findReaction.mockResolvedValue({ id: 'react1', type: 'LIKE' });
      mockRepo.deleteReaction.mockResolvedValue({});
      await service.removeReaction('u1', 'r1');
      expect(mockRepo.deleteReaction).toHaveBeenCalledWith('u1', 'r1');
    });

    it('throws ForbiddenException when the review owner is private and not visible', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.isOwnerVisibleTo.mockResolvedValue(false);

      await expect(service.removeReaction('u1', 'r1')).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockRepo.findReaction).not.toHaveBeenCalled();
    });
  });

  describe('listComments', () => {
    it('throws NotFoundException if review is missing/inactive', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue(null);
      await expect(service.listComments('r1', { limit: 10 })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns paginated comments', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.listComments.mockResolvedValue({
        items: [{ id: 'c1' }],
        nextCursor: null,
      });
      const result = await service.listComments('r1', {
        limit: 10,
        cursor: undefined,
      });
      expect(result).toEqual({ items: [{ id: 'c1' }], nextCursor: null });
      expect(mockRepo.listComments).toHaveBeenCalledWith('r1', undefined, 10);
    });

    it('throws ForbiddenException when the review owner is private and not visible to the viewer', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.isOwnerVisibleTo.mockResolvedValue(false);

      await expect(
        service.listComments('r1', { limit: 10 }, 'stranger'),
      ).rejects.toThrow(ForbiddenException);
      expect(mockRepo.listComments).not.toHaveBeenCalled();
    });
  });

  describe('createComment', () => {
    it('throws NotFoundException if review is missing/inactive', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue(null);
      await expect(
        service.createComment('u1', 'r1', { content: 'hi' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('sanitizes content, creates comment, and emits comment.created', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.createComment.mockResolvedValue({ id: 'c1' });

      await service.createComment('u1', 'r1', {
        content: '<script>xss</script>hello',
      });

      expect(mockRepo.createComment).toHaveBeenCalledWith({
        userId: 'u1',
        reviewId: 'r1',
        content: 'hello',
      });
      expect(mockEvents.emitCommentCreated).toHaveBeenCalledWith({
        commentId: 'c1',
        reviewId: 'r1',
        reviewOwnerId: 'owner1',
        userId: 'u1',
      });
    });

    it('throws ForbiddenException when the review owner is private and not visible', async () => {
      mockRepo.getActiveReviewOwner.mockResolvedValue({
        id: 'r1',
        userId: 'owner1',
      });
      mockRepo.isOwnerVisibleTo.mockResolvedValue(false);

      await expect(
        service.createComment('u1', 'r1', { content: 'hi' }),
      ).rejects.toThrow(ForbiddenException);
      expect(mockRepo.createComment).not.toHaveBeenCalled();
    });
  });

  describe('updateComment', () => {
    it('throws NotFoundException if comment is missing/deleted', async () => {
      mockRepo.findCommentById.mockResolvedValue(null);
      await expect(
        service.updateComment('u1', 'c1', { content: 'x' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException if not the owner', async () => {
      mockRepo.findCommentById.mockResolvedValue({
        id: 'c1',
        userId: 'other',
        status: 'ACTIVE',
        deletedAt: null,
      });
      await expect(
        service.updateComment('u1', 'c1', { content: 'x' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('sanitizes and updates content for the owner', async () => {
      mockRepo.findCommentById.mockResolvedValue({
        id: 'c1',
        userId: 'u1',
        status: 'ACTIVE',
        deletedAt: null,
      });
      mockRepo.updateComment.mockResolvedValue({ id: 'c1', content: 'hi' });

      await service.updateComment('u1', 'c1', {
        content: '<b>hi</b>',
      });

      expect(mockRepo.updateComment).toHaveBeenCalledWith('c1', 'hi');
    });
  });

  describe('removeComment', () => {
    it('throws NotFoundException if comment is missing/deleted', async () => {
      mockRepo.findCommentById.mockResolvedValue(null);
      await expect(service.removeComment('u1', 'c1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws ForbiddenException if not the owner', async () => {
      mockRepo.findCommentById.mockResolvedValue({
        id: 'c1',
        userId: 'other',
        status: 'ACTIVE',
        deletedAt: null,
      });
      await expect(service.removeComment('u1', 'c1')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('soft deletes for the owner', async () => {
      mockRepo.findCommentById.mockResolvedValue({
        id: 'c1',
        userId: 'u1',
        status: 'ACTIVE',
        deletedAt: null,
      });
      mockRepo.softDeleteComment.mockResolvedValue({});
      await service.removeComment('u1', 'c1');
      expect(mockRepo.softDeleteComment).toHaveBeenCalledWith('c1');
    });
  });
});
