import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import { FollowRepository } from './follow.repository.js';
import { FollowService } from './follow.service.js';
import { UsersRepository } from './users.repository.js';

const mockFollowRepo = {
  getFollowers: vi.fn(),
  getFollowing: vi.fn(),
  followExists: vi.fn(),
  createFollow: vi.fn(),
  deleteFollow: vi.fn(),
  findFollowRequest: vi.fn(),
  createOrResetFollowRequest: vi.fn(),
  deleteFollowRequest: vi.fn(),
  findFollowRequestById: vi.fn(),
  listIncomingFollowRequests: vi.fn(),
  acceptFollowRequest: vi.fn(),
  rejectFollowRequest: vi.fn(),
  acceptAllPendingFollowRequests: vi.fn(),
};

const mockUsersRepo = {
  findByHandle: vi.fn(),
};

const mockEvents = {
  emitFollowCreated: vi.fn(),
  emitFollowRequested: vi.fn(),
  emitFollowRequestAccepted: vi.fn(),
};

describe('FollowService', () => {
  let service: FollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowService,
        { provide: FollowRepository, useValue: mockFollowRepo },
        { provide: UsersRepository, useValue: mockUsersRepo },
        { provide: SocialEventsProducer, useValue: mockEvents },
      ],
    }).compile();

    service = module.get(FollowService);
    vi.clearAllMocks();
  });

  describe('getFollowStatus', () => {
    it('returns both false without querying the repo when there is no viewer', async () => {
      const result = await service.getFollowStatus(undefined, 'u2');
      expect(result).toEqual({
        isFollowing: false,
        followRequestPending: false,
      });
      expect(mockFollowRepo.followExists).not.toHaveBeenCalled();
      expect(mockFollowRepo.findFollowRequest).not.toHaveBeenCalled();
    });

    it('sets isFollowing when the viewer already follows and skips the follow-request lookup', async () => {
      mockFollowRepo.followExists.mockResolvedValue({
        followerId: 'u1',
        followeeId: 'u2',
      });

      const result = await service.getFollowStatus('u1', 'u2');

      expect(result).toEqual({
        isFollowing: true,
        followRequestPending: false,
      });
      expect(mockFollowRepo.followExists).toHaveBeenCalledWith('u1', 'u2');
      expect(mockFollowRepo.findFollowRequest).not.toHaveBeenCalled();
    });

    it('sets followRequestPending when a PENDING request exists and the viewer is not following', async () => {
      mockFollowRepo.followExists.mockResolvedValue(null);
      mockFollowRepo.findFollowRequest.mockResolvedValue({
        status: 'PENDING',
      });

      const result = await service.getFollowStatus('u1', 'u2');

      expect(result).toEqual({
        isFollowing: false,
        followRequestPending: true,
      });
    });

    it('returns both false when neither a Follow nor a PENDING request exists', async () => {
      mockFollowRepo.followExists.mockResolvedValue(null);
      mockFollowRepo.findFollowRequest.mockResolvedValue(null);

      const result = await service.getFollowStatus('u1', 'u2');

      expect(result).toEqual({
        isFollowing: false,
        followRequestPending: false,
      });
    });
  });

  describe('follow', () => {
    it('throws NotFoundException if target user not found', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue(null);
      await expect(service.follow('u1', 'ghost')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws BadRequestException if user tries to follow themselves', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue({
        id: 'u1',
        status: 'ACTIVE',
      });
      await expect(service.follow('u1', 'u1handle')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws ConflictException if already following', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue({
        id: 'u2',
        status: 'ACTIVE',
      });
      mockFollowRepo.followExists.mockResolvedValue({
        followerId: 'u1',
        followeeId: 'u2',
      });
      await expect(service.follow('u1', 'u2handle')).rejects.toThrow(
        ConflictException,
      );
    });

    it('creates follow on success and emits follow.created', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue({
        id: 'u2',
        status: 'ACTIVE',
      });
      mockFollowRepo.followExists.mockResolvedValue(null);
      mockFollowRepo.createFollow.mockResolvedValue({});
      const result = await service.follow('u1', 'u2handle');
      expect(mockFollowRepo.createFollow).toHaveBeenCalledWith('u1', 'u2');
      expect(mockEvents.emitFollowCreated).toHaveBeenCalledWith({
        followerId: 'u1',
        followeeId: 'u2',
      });
      expect(result).toEqual({ status: 'FOLLOWING' });
    });

    it('creates a FollowRequest instead of a Follow when the target is private', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue({
        id: 'u2',
        status: 'ACTIVE',
        isPrivate: true,
      });
      mockFollowRepo.followExists.mockResolvedValue(null);
      mockFollowRepo.findFollowRequest.mockResolvedValue(null);
      mockFollowRepo.createOrResetFollowRequest.mockResolvedValue({
        id: 'req1',
      });

      const result = await service.follow('u1', 'u2handle');

      expect(mockFollowRepo.createFollow).not.toHaveBeenCalled();
      expect(mockFollowRepo.createOrResetFollowRequest).toHaveBeenCalledWith(
        'u1',
        'u2',
      );
      expect(mockEvents.emitFollowRequested).toHaveBeenCalledWith({
        requesterId: 'u1',
        targetId: 'u2',
      });
      expect(result).toEqual({ status: 'PENDING', followRequestId: 'req1' });
    });

    it('throws ConflictException when a follow request to a private target is already pending', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue({
        id: 'u2',
        status: 'ACTIVE',
        isPrivate: true,
      });
      mockFollowRepo.followExists.mockResolvedValue(null);
      mockFollowRepo.findFollowRequest.mockResolvedValue({
        status: 'PENDING',
      });

      await expect(service.follow('u1', 'u2handle')).rejects.toThrow(
        ConflictException,
      );
      expect(mockFollowRepo.createOrResetFollowRequest).not.toHaveBeenCalled();
    });

    it('resets a REJECTED follow request back to PENDING on re-request', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue({
        id: 'u2',
        status: 'ACTIVE',
        isPrivate: true,
      });
      mockFollowRepo.followExists.mockResolvedValue(null);
      mockFollowRepo.findFollowRequest.mockResolvedValue({
        status: 'REJECTED',
      });
      mockFollowRepo.createOrResetFollowRequest.mockResolvedValue({
        id: 'req1',
      });

      const result = await service.follow('u1', 'u2handle');

      expect(mockFollowRepo.createOrResetFollowRequest).toHaveBeenCalledWith(
        'u1',
        'u2',
      );
      expect(result).toEqual({ status: 'PENDING', followRequestId: 'req1' });
    });
  });

  describe('unfollow', () => {
    it('throws NotFoundException if target user not found', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue(null);
      await expect(service.unfollow('u1', 'ghost')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException if not following and no pending request', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue({ id: 'u2' });
      mockFollowRepo.followExists.mockResolvedValue(null);
      mockFollowRepo.findFollowRequest.mockResolvedValue(null);
      await expect(service.unfollow('u1', 'u2handle')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deletes follow on success', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue({ id: 'u2' });
      mockFollowRepo.followExists.mockResolvedValue({
        followerId: 'u1',
        followeeId: 'u2',
      });
      mockFollowRepo.deleteFollow.mockResolvedValue({});
      await service.unfollow('u1', 'u2handle');
      expect(mockFollowRepo.deleteFollow).toHaveBeenCalledWith('u1', 'u2');
    });

    it('cancels a pending outgoing follow request when there is no Follow yet', async () => {
      mockUsersRepo.findByHandle.mockResolvedValue({ id: 'u2' });
      mockFollowRepo.followExists.mockResolvedValue(null);
      mockFollowRepo.findFollowRequest.mockResolvedValue({
        status: 'PENDING',
      });
      mockFollowRepo.deleteFollowRequest.mockResolvedValue({});

      await service.unfollow('u1', 'u2handle');

      expect(mockFollowRepo.deleteFollowRequest).toHaveBeenCalledWith(
        'u1',
        'u2',
      );
      expect(mockFollowRepo.deleteFollow).not.toHaveBeenCalled();
    });
  });

  describe('getFollowers', () => {
    it('forwards cursor/limit/viewerId to the repository', async () => {
      mockFollowRepo.getFollowers.mockResolvedValue({
        items: [],
        nextCursor: null,
      });
      await service.getFollowers('juan', 'cursor-1', 5, 'viewer-1');
      expect(mockFollowRepo.getFollowers).toHaveBeenCalledWith(
        'juan',
        'cursor-1',
        5,
        'viewer-1',
      );
    });

    it('forwards undefined viewerId for anonymous callers', async () => {
      mockFollowRepo.getFollowers.mockResolvedValue({
        items: [],
        nextCursor: null,
      });
      await service.getFollowers('juan');
      expect(mockFollowRepo.getFollowers).toHaveBeenCalledWith(
        'juan',
        undefined,
        undefined,
        undefined,
      );
    });

    it('returns items (with isFollowing/isPrivate) and nextCursor from the repository', async () => {
      const follower = {
        id: 'u2',
        handle: 'juan',
        displayName: 'Juan',
        avatarUrl: null,
        isPrivate: false,
        isFollowing: true,
      };
      mockFollowRepo.getFollowers.mockResolvedValue({
        items: [follower],
        nextCursor: 'next',
      });
      const result = await service.getFollowers('juan');
      expect(result).toEqual({ items: [follower], nextCursor: 'next' });
    });
  });

  describe('getFollowing', () => {
    it('forwards cursor/limit/viewerId to the repository', async () => {
      mockFollowRepo.getFollowing.mockResolvedValue({
        items: [],
        nextCursor: null,
      });
      await service.getFollowing('juan', 'cursor-1', 5, 'viewer-1');
      expect(mockFollowRepo.getFollowing).toHaveBeenCalledWith(
        'juan',
        'cursor-1',
        5,
        'viewer-1',
      );
    });

    it('forwards undefined viewerId for anonymous callers', async () => {
      mockFollowRepo.getFollowing.mockResolvedValue({
        items: [],
        nextCursor: null,
      });
      await service.getFollowing('juan');
      expect(mockFollowRepo.getFollowing).toHaveBeenCalledWith(
        'juan',
        undefined,
        undefined,
        undefined,
      );
    });
  });

  describe('listFollowRequests', () => {
    it('forwards cursor/limit to the repository', async () => {
      mockFollowRepo.listIncomingFollowRequests.mockResolvedValue({
        items: [],
        nextCursor: null,
      });
      await service.listFollowRequests('u1', 'cursor-1', 10);
      expect(mockFollowRepo.listIncomingFollowRequests).toHaveBeenCalledWith(
        'u1',
        'cursor-1',
        10,
      );
    });
  });

  describe('respondToFollowRequest', () => {
    it('throws NotFoundException if the request does not exist', async () => {
      mockFollowRepo.findFollowRequestById.mockResolvedValue(null);
      await expect(
        service.respondToFollowRequest('u2', 'req1', 'ACCEPTED'),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException if the caller is not the target', async () => {
      mockFollowRepo.findFollowRequestById.mockResolvedValue({
        id: 'req1',
        targetId: 'someone-else',
        status: 'PENDING',
      });
      await expect(
        service.respondToFollowRequest('u2', 'req1', 'ACCEPTED'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('throws ConflictException if the request was already resolved', async () => {
      mockFollowRepo.findFollowRequestById.mockResolvedValue({
        id: 'req1',
        targetId: 'u2',
        status: 'ACCEPTED',
      });
      await expect(
        service.respondToFollowRequest('u2', 'req1', 'ACCEPTED'),
      ).rejects.toThrow(ConflictException);
    });

    it('accepts the request, creates the Follow and notifies the requester', async () => {
      mockFollowRepo.findFollowRequestById.mockResolvedValue({
        id: 'req1',
        targetId: 'u2',
        requesterId: 'u1',
        status: 'PENDING',
      });
      mockFollowRepo.acceptFollowRequest.mockResolvedValue({
        id: 'req1',
        requesterId: 'u1',
        targetId: 'u2',
        status: 'ACCEPTED',
      });

      await service.respondToFollowRequest('u2', 'req1', 'ACCEPTED');

      expect(mockFollowRepo.acceptFollowRequest).toHaveBeenCalledWith('req1');
      expect(mockEvents.emitFollowRequestAccepted).toHaveBeenCalledWith({
        requesterId: 'u1',
        accepterId: 'u2',
      });
    });

    it('rejects the request without emitting any notification', async () => {
      mockFollowRepo.findFollowRequestById.mockResolvedValue({
        id: 'req1',
        targetId: 'u2',
        requesterId: 'u1',
        status: 'PENDING',
      });
      mockFollowRepo.rejectFollowRequest.mockResolvedValue({
        id: 'req1',
        status: 'REJECTED',
      });

      await service.respondToFollowRequest('u2', 'req1', 'REJECTED');

      expect(mockFollowRepo.rejectFollowRequest).toHaveBeenCalledWith('req1');
      expect(mockFollowRepo.acceptFollowRequest).not.toHaveBeenCalled();
      expect(mockEvents.emitFollowRequestAccepted).not.toHaveBeenCalled();
    });
  });

  describe('acceptAllPendingFollowRequests', () => {
    it('emits FollowRequestAccepted for each requester returned by the repository', async () => {
      mockFollowRepo.acceptAllPendingFollowRequests.mockResolvedValue([
        'req1',
        'req2',
      ]);

      await service.acceptAllPendingFollowRequests('u1');

      expect(
        mockFollowRepo.acceptAllPendingFollowRequests,
      ).toHaveBeenCalledWith('u1');
      expect(mockEvents.emitFollowRequestAccepted).toHaveBeenCalledWith({
        requesterId: 'req1',
        accepterId: 'u1',
      });
      expect(mockEvents.emitFollowRequestAccepted).toHaveBeenCalledWith({
        requesterId: 'req2',
        accepterId: 'u1',
      });
    });

    it('does not emit anything when there are no pending requests', async () => {
      mockFollowRepo.acceptAllPendingFollowRequests.mockResolvedValue([]);

      await service.acceptAllPendingFollowRequests('u1');

      expect(mockEvents.emitFollowRequestAccepted).not.toHaveBeenCalled();
    });
  });
});
