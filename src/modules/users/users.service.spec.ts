import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SocialEventsProducer } from '../events/social-events.producer.js';
import { UsersRepository } from './users.repository.js';
import { UsersService } from './users.service.js';

vi.mock('cloudinary', () => ({
  v2: { config: vi.fn(), uploader: { upload_stream: vi.fn() } },
}));

const mockRepo = {
  findById: vi.fn(),
  findByHandle: vi.fn(),
  getStats: vi.fn(),
  updateProfile: vi.fn(),
  anonimize: vi.fn(),
  updateAvatarUrl: vi.fn(),
  getNotifPrefs: vi.fn(),
  updateNotifPrefs: vi.fn(),
  getFollowers: vi.fn(),
  getFollowing: vi.fn(),
  followExists: vi.fn(),
  createFollow: vi.fn(),
  deleteFollow: vi.fn(),
  searchUsers: vi.fn(),
};

const mockConfig = {
  getOrThrow: vi.fn().mockReturnValue('mock-value'),
  get: vi.fn().mockReturnValue('mock-value'),
};

const mockEvents = {
  emitFollowCreated: vi.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockRepo },
        { provide: ConfigService, useValue: mockConfig },
        { provide: SocialEventsProducer, useValue: mockEvents },
      ],
    }).compile();

    service = module.get(UsersService);
    vi.clearAllMocks();
  });

  describe('getMe', () => {
    it('throws NotFoundException if user does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(service.getMe('u1')).rejects.toThrow(NotFoundException);
    });

    it('returns user with stats', async () => {
      const user = {
        id: 'u1',
        handle: 'h',
        email: 'a@a.com',
        status: 'ACTIVE',
      };
      mockRepo.findById.mockResolvedValue(user);
      mockRepo.getStats.mockResolvedValue([5, 10, 3]);
      const result = await service.getMe('u1');
      expect(result).toEqual({
        user,
        stats: { reviewCount: 5, followersCount: 10, followingCount: 3 },
      });
    });
  });

  describe('updateProfile', () => {
    it('throws 409 if handle is taken by another user', async () => {
      mockRepo.findByHandle.mockResolvedValue({ id: 'other-user' });
      await expect(
        service.updateProfile('u1', { handle: 'taken' }),
      ).rejects.toThrow(ConflictException);
    });

    it('allows updating to own handle without conflict', async () => {
      mockRepo.findByHandle.mockResolvedValue({ id: 'u1' });
      mockRepo.updateProfile.mockResolvedValue({ id: 'u1', handle: 'same' });
      const result = await service.updateProfile('u1', { handle: 'same' });
      expect(mockRepo.updateProfile).toHaveBeenCalled();
      expect(result).toMatchObject({ id: 'u1' });
    });

    it('sanitizes displayName and bio to strip HTML tags', async () => {
      mockRepo.findByHandle.mockResolvedValue(null);
      mockRepo.updateProfile.mockResolvedValue({});
      await service.updateProfile('u1', {
        displayName: '<script>xss</script>Name',
        bio: '<b>bold</b>',
      });
      expect(mockRepo.updateProfile).toHaveBeenCalledWith(
        'u1',
        expect.objectContaining({ displayName: 'Name', bio: 'bold' }),
      );
    });
  });

  describe('deleteAccount', () => {
    it('delegates to repository anonimize', async () => {
      mockRepo.anonimize.mockResolvedValue([{}, {}]);
      await service.deleteAccount('u1');
      expect(mockRepo.anonimize).toHaveBeenCalledWith('u1');
    });
  });

  describe('getPublicProfile', () => {
    it('throws NotFoundException if user not found', async () => {
      mockRepo.findByHandle.mockResolvedValue(null);
      await expect(service.getPublicProfile('ghost')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException if user is deleted', async () => {
      mockRepo.findByHandle.mockResolvedValue({ id: 'u2', status: 'DELETED' });
      await expect(service.getPublicProfile('deleted_user')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns public fields with stats and strips private data', async () => {
      const user = {
        id: 'u2',
        handle: 'public',
        displayName: 'Public User',
        status: 'ACTIVE',
        email: 'private@x.com',
        passwordHash: 'secret',
        googleId: 'gid',
        deletedAt: null,
      };
      mockRepo.findByHandle.mockResolvedValue(user);
      mockRepo.getStats.mockResolvedValue([3, 10, 5]);

      const result = await service.getPublicProfile('public');

      expect(result.user).not.toHaveProperty('email');
      expect(result.user).not.toHaveProperty('passwordHash');
      expect(result.user).not.toHaveProperty('googleId');
      expect(result.stats).toEqual({
        reviewCount: 3,
        followersCount: 10,
        followingCount: 5,
      });
      expect(result.isFollowing).toBe(false);
    });

    it('sets isFollowing when viewer is provided and follows', async () => {
      const user = {
        id: 'u2',
        handle: 'public',
        displayName: 'Public User',
        status: 'ACTIVE',
        email: 'x@x.com',
        passwordHash: null,
        googleId: null,
        deletedAt: null,
      };
      mockRepo.findByHandle.mockResolvedValue(user);
      mockRepo.getStats.mockResolvedValue([0, 0, 0]);
      mockRepo.followExists.mockResolvedValue({
        followerId: 'u1',
        followeeId: 'u2',
      });

      const result = await service.getPublicProfile('public', 'u1');

      expect(result.isFollowing).toBe(true);
      expect(mockRepo.followExists).toHaveBeenCalledWith('u1', 'u2');
    });
  });

  describe('getNotifPrefs', () => {
    it('throws NotFoundException if prefs not found', async () => {
      mockRepo.getNotifPrefs.mockResolvedValue(null);
      await expect(service.getNotifPrefs('u1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns notification preferences', async () => {
      const prefs = {
        userId: 'u1',
        likesEnabled: true,
        dislikesEnabled: false,
        commentsEnabled: true,
        followsEnabled: true,
      };
      mockRepo.getNotifPrefs.mockResolvedValue(prefs);
      const result = await service.getNotifPrefs('u1');
      expect(result).toEqual(prefs);
    });
  });

  describe('follow', () => {
    it('throws NotFoundException if target user not found', async () => {
      mockRepo.findByHandle.mockResolvedValue(null);
      await expect(service.follow('u1', 'ghost')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws BadRequestException if user tries to follow themselves', async () => {
      mockRepo.findByHandle.mockResolvedValue({ id: 'u1', status: 'ACTIVE' });
      await expect(service.follow('u1', 'u1handle')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throws ConflictException if already following', async () => {
      mockRepo.findByHandle.mockResolvedValue({ id: 'u2', status: 'ACTIVE' });
      mockRepo.followExists.mockResolvedValue({
        followerId: 'u1',
        followeeId: 'u2',
      });
      await expect(service.follow('u1', 'u2handle')).rejects.toThrow(
        ConflictException,
      );
    });

    it('creates follow on success and emits follow.created', async () => {
      mockRepo.findByHandle.mockResolvedValue({ id: 'u2', status: 'ACTIVE' });
      mockRepo.followExists.mockResolvedValue(null);
      mockRepo.createFollow.mockResolvedValue({});
      await service.follow('u1', 'u2handle');
      expect(mockRepo.createFollow).toHaveBeenCalledWith('u1', 'u2');
      expect(mockEvents.emitFollowCreated).toHaveBeenCalledWith({
        followerId: 'u1',
        followeeId: 'u2',
      });
    });
  });

  describe('searchUsers', () => {
    it('trims the query and forwards cursor/limit/viewerId to the repository', async () => {
      mockRepo.searchUsers.mockResolvedValue({ items: [], nextCursor: null });
      await service.searchUsers('  juan  ', 'cursor-1', 5, 'viewer-1');
      expect(mockRepo.searchUsers).toHaveBeenCalledWith(
        'juan',
        'cursor-1',
        5,
        'viewer-1',
      );
    });

    it('returns items (with isFollowing) and nextCursor from the repository', async () => {
      const user = {
        id: 'u2',
        handle: 'juan',
        displayName: 'Juan',
        avatarUrl: null,
        isFollowing: true,
      };
      mockRepo.searchUsers.mockResolvedValue({
        items: [user],
        nextCursor: 'next',
      });
      const result = await service.searchUsers('juan');
      expect(result).toEqual({ items: [user], nextCursor: 'next' });
    });
  });

  describe('unfollow', () => {
    it('throws NotFoundException if target user not found', async () => {
      mockRepo.findByHandle.mockResolvedValue(null);
      await expect(service.unfollow('u1', 'ghost')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException if not following', async () => {
      mockRepo.findByHandle.mockResolvedValue({ id: 'u2' });
      mockRepo.followExists.mockResolvedValue(null);
      await expect(service.unfollow('u1', 'u2handle')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deletes follow on success', async () => {
      mockRepo.findByHandle.mockResolvedValue({ id: 'u2' });
      mockRepo.followExists.mockResolvedValue({
        followerId: 'u1',
        followeeId: 'u2',
      });
      mockRepo.deleteFollow.mockResolvedValue({});
      await service.unfollow('u1', 'u2handle');
      expect(mockRepo.deleteFollow).toHaveBeenCalledWith('u1', 'u2');
    });
  });
});
