import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from '../../cloudinary/cloudinary.service.js';
import { FollowService } from './follow.service.js';
import { UserSearchRepository } from './user-search.repository.js';
import { UsersRepository } from './users.repository.js';
import { UsersService } from './users.service.js';

const mockRepo = {
  findById: vi.fn(),
  findByHandle: vi.fn(),
  getStats: vi.fn(),
  updateProfile: vi.fn(),
  anonimize: vi.fn(),
  updateAvatar: vi.fn(),
  updateCover: vi.fn(),
  getNotifPrefs: vi.fn(),
  updateNotifPrefs: vi.fn(),
  getExportData: vi.fn(),
};

const mockUserSearchRepo = {
  searchUsers: vi.fn(),
  quickSearchUsers: vi.fn(),
};

const mockFollowService = {
  getFollowStatus: vi.fn(),
  acceptAllPendingFollowRequests: vi.fn(),
};

const mockCloudinary = {
  upload: vi.fn(),
  destroy: vi.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockRepo },
        { provide: UserSearchRepository, useValue: mockUserSearchRepo },
        { provide: FollowService, useValue: mockFollowService },
        { provide: CloudinaryService, useValue: mockCloudinary },
      ],
    }).compile();

    service = module.get(UsersService);
    vi.clearAllMocks();
    mockFollowService.getFollowStatus.mockResolvedValue({
      isFollowing: false,
      followRequestPending: false,
    });
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

    it('strips passwordHash, googleId and internal Cloudinary public_ids', async () => {
      const user = {
        id: 'u1',
        handle: 'h',
        email: 'a@a.com',
        status: 'ACTIVE',
        passwordHash: 'secret-hash',
        googleId: 'gid',
        avatarPublicId: 'avatars/abc',
        coverPublicId: 'covers/xyz',
      };
      mockRepo.findById.mockResolvedValue(user);
      mockRepo.getStats.mockResolvedValue([0, 0, 0]);
      const result = await service.getMe('u1');
      expect(result.user).not.toHaveProperty('passwordHash');
      expect(result.user).not.toHaveProperty('googleId');
      expect(result.user).not.toHaveProperty('avatarPublicId');
      expect(result.user).not.toHaveProperty('coverPublicId');
      expect(result.user).toMatchObject({ id: 'u1', handle: 'h' });
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

    it('delegates auto-acceptance of pending follow requests to FollowService when isPrivate goes true -> false', async () => {
      mockRepo.findById.mockResolvedValue({ id: 'u1', isPrivate: true });
      mockRepo.updateProfile.mockResolvedValue({ id: 'u1', isPrivate: false });

      await service.updateProfile('u1', { isPrivate: false });

      expect(
        mockFollowService.acceptAllPendingFollowRequests,
      ).toHaveBeenCalledWith('u1');
    });

    it('passes language through to the repository unchanged', async () => {
      mockRepo.findByHandle.mockResolvedValue(null);
      mockRepo.updateProfile.mockResolvedValue({ id: 'u1', language: 'ES' });

      const result = await service.updateProfile('u1', { language: 'ES' });

      expect(mockRepo.updateProfile).toHaveBeenCalledWith(
        'u1',
        expect.objectContaining({ language: 'ES' }),
      );
      expect(result).toMatchObject({ language: 'ES' });
    });

    it('does not touch follow requests when isPrivate goes false -> true', async () => {
      mockRepo.findById.mockResolvedValue({ id: 'u1', isPrivate: false });
      mockRepo.updateProfile.mockResolvedValue({ id: 'u1', isPrivate: true });

      await service.updateProfile('u1', { isPrivate: true });

      expect(
        mockFollowService.acceptAllPendingFollowRequests,
      ).not.toHaveBeenCalled();
    });
  });

  describe('deleteAccount', () => {
    it('delegates to repository anonimize and destroys the old Cloudinary assets', async () => {
      mockRepo.anonimize.mockResolvedValue({
        avatarPublicId: 'avatars/old',
        coverPublicId: 'covers/old',
      });
      await service.deleteAccount('u1');
      expect(mockRepo.anonimize).toHaveBeenCalledWith('u1');
      expect(mockCloudinary.destroy).toHaveBeenCalledWith('avatars/old');
      expect(mockCloudinary.destroy).toHaveBeenCalledWith('covers/old');
    });

    it('does not throw when there were no previous images', async () => {
      mockRepo.anonimize.mockResolvedValue({
        avatarPublicId: null,
        coverPublicId: null,
      });
      await expect(service.deleteAccount('u1')).resolves.toBeUndefined();
      expect(mockCloudinary.destroy).toHaveBeenCalledWith(null);
    });
  });

  describe('uploadAvatar', () => {
    it('throws NotFoundException if user does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(
        service.uploadAvatar('u1', Buffer.from('img')),
      ).rejects.toThrow(NotFoundException);
    });

    it('uploads, persists the new avatar and destroys the previous one', async () => {
      mockRepo.findById.mockResolvedValue({
        id: 'u1',
        avatarPublicId: 'avatars/old',
      });
      mockCloudinary.upload.mockResolvedValue({
        secureUrl: 'https://cloudinary/avatars/new.jpg',
        publicId: 'avatars/new',
      });
      mockRepo.updateAvatar.mockResolvedValue({});

      const url = await service.uploadAvatar('u1', Buffer.from('img'));

      expect(mockCloudinary.upload).toHaveBeenCalledWith(
        Buffer.from('img'),
        'avatars',
      );
      expect(mockRepo.updateAvatar).toHaveBeenCalledWith(
        'u1',
        'https://cloudinary/avatars/new.jpg',
        'avatars/new',
      );
      expect(mockCloudinary.destroy).toHaveBeenCalledWith('avatars/old');
      expect(url).toBe('https://cloudinary/avatars/new.jpg');
    });

    it('does not attempt to destroy anything when there was no previous avatar', async () => {
      mockRepo.findById.mockResolvedValue({ id: 'u1', avatarPublicId: null });
      mockCloudinary.upload.mockResolvedValue({
        secureUrl: 'https://cloudinary/avatars/new.jpg',
        publicId: 'avatars/new',
      });
      mockRepo.updateAvatar.mockResolvedValue({});

      await service.uploadAvatar('u1', Buffer.from('img'));

      expect(mockCloudinary.destroy).toHaveBeenCalledWith(null);
    });
  });

  describe('uploadCover', () => {
    it('throws NotFoundException if user does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(
        service.uploadCover('u1', Buffer.from('img')),
      ).rejects.toThrow(NotFoundException);
    });

    it('uploads, persists the new cover and destroys the previous one', async () => {
      mockRepo.findById.mockResolvedValue({
        id: 'u1',
        coverPublicId: 'covers/old',
      });
      mockCloudinary.upload.mockResolvedValue({
        secureUrl: 'https://cloudinary/covers/new.jpg',
        publicId: 'covers/new',
      });
      mockRepo.updateCover.mockResolvedValue({});

      const url = await service.uploadCover('u1', Buffer.from('img'));

      expect(mockCloudinary.upload).toHaveBeenCalledWith(
        Buffer.from('img'),
        'covers',
      );
      expect(mockRepo.updateCover).toHaveBeenCalledWith(
        'u1',
        'https://cloudinary/covers/new.jpg',
        'covers/new',
      );
      expect(mockCloudinary.destroy).toHaveBeenCalledWith('covers/old');
      expect(url).toBe('https://cloudinary/covers/new.jpg');
    });
  });

  describe('exportAccountData', () => {
    it('throws NotFoundException if user does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(service.exportAccountData('u1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('excludes sensitive fields and returns the aggregated export shape', async () => {
      const user = {
        id: 'u1',
        handle: 'h',
        email: 'a@a.com',
        status: 'ACTIVE',
        passwordHash: 'secret-hash',
        googleId: 'gid',
      };
      mockRepo.findById.mockResolvedValue(user);
      mockRepo.getExportData.mockResolvedValue({
        reviews: [{ id: 'r1' }],
        comments: [{ id: 'c1' }],
        reactions: [{ id: 'react1' }],
        followers: [{ follower: { id: 'f1' } }],
        following: [{ followee: { id: 'f2' } }],
        notifPrefs: { userId: 'u1' },
      });

      const result = await service.exportAccountData('u1');

      expect(mockRepo.getExportData).toHaveBeenCalledWith('u1');
      expect(result.profile).not.toHaveProperty('passwordHash');
      expect(result.profile).not.toHaveProperty('googleId');
      expect(result.profile).toMatchObject({ id: 'u1', handle: 'h' });
      expect(result.reviews).toEqual([{ id: 'r1' }]);
      expect(result.comments).toEqual([{ id: 'c1' }]);
      expect(result.reactions).toEqual([{ id: 'react1' }]);
      expect(result.follows).toEqual({
        followers: [{ id: 'f1' }],
        following: [{ id: 'f2' }],
      });
      expect(result.notificationPreferences).toEqual({ userId: 'u1' });
      expect(typeof result.exportedAt).toBe('string');
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

    it('returns public fields with stats and strips private/sensitive data', async () => {
      const user = {
        id: 'u2',
        handle: 'public',
        displayName: 'Public User',
        avatarUrl: 'https://cdn/avatar.png',
        coverUrl: 'https://cdn/cover.png',
        bio: 'hi',
        status: 'ACTIVE',
        isPrivate: false,
        createdAt: new Date('2025-01-01'),
        email: 'private@x.com',
        passwordHash: 'secret',
        googleId: 'gid',
        deletedAt: null,
        avatarPublicId: 'avatars/abc',
        coverPublicId: 'covers/xyz',
        role: 'ADMIN',
        consentedAt: new Date('2025-01-01'),
        notifEnabled: true,
        language: 'EN',
        acceptedReportsCount: 3,
        penaltyLevel: 1,
        penalizedUntil: new Date('2099-01-01'),
        updatedAt: new Date('2025-01-01'),
      };
      mockRepo.findByHandle.mockResolvedValue(user);
      mockRepo.getStats.mockResolvedValue([3, 10, 5]);

      const result = await service.getPublicProfile('public');

      // allowed
      expect(result.user).toMatchObject({
        id: 'u2',
        handle: 'public',
        displayName: 'Public User',
        avatarUrl: 'https://cdn/avatar.png',
        coverUrl: 'https://cdn/cover.png',
        bio: 'hi',
        status: 'ACTIVE',
        isPrivate: false,
      });
      expect(result.user).toHaveProperty('createdAt');
      // never allowed
      expect(result.user).not.toHaveProperty('email');
      expect(result.user).not.toHaveProperty('passwordHash');
      expect(result.user).not.toHaveProperty('googleId');
      expect(result.user).not.toHaveProperty('deletedAt');
      expect(result.user).not.toHaveProperty('avatarPublicId');
      expect(result.user).not.toHaveProperty('coverPublicId');
      // sensitive fields that used to leak (the bug this test guards against)
      expect(result.user).not.toHaveProperty('role');
      expect(result.user).not.toHaveProperty('consentedAt');
      expect(result.user).not.toHaveProperty('notifEnabled');
      expect(result.user).not.toHaveProperty('language');
      expect(result.user).not.toHaveProperty('acceptedReportsCount');
      expect(result.user).not.toHaveProperty('penaltyLevel');
      expect(result.user).not.toHaveProperty('penalizedUntil');
      expect(result.user).not.toHaveProperty('updatedAt');
      expect(result.stats).toEqual({
        reviewCount: 3,
        followersCount: 10,
        followingCount: 5,
      });
      expect(result.isFollowing).toBe(false);
      expect(result.followRequestPending).toBe(false);
    });

    it('delegates follow status to FollowService.getFollowStatus', async () => {
      const user = {
        id: 'u2',
        handle: 'public',
        displayName: 'Public User',
        status: 'ACTIVE',
      };
      mockRepo.findByHandle.mockResolvedValue(user);
      mockRepo.getStats.mockResolvedValue([0, 0, 0]);
      mockFollowService.getFollowStatus.mockResolvedValue({
        isFollowing: true,
        followRequestPending: false,
      });

      const result = await service.getPublicProfile('public', 'u1');

      expect(mockFollowService.getFollowStatus).toHaveBeenCalledWith(
        'u1',
        'u2',
      );
      expect(result.isFollowing).toBe(true);
      expect(result.followRequestPending).toBe(false);
    });
  });

  describe('getNotifPrefs', () => {
    it('throws NotFoundException if the user does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(service.getNotifPrefs('u1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException if prefs not found', async () => {
      mockRepo.findById.mockResolvedValue({ id: 'u1', isPrivate: false });
      mockRepo.getNotifPrefs.mockResolvedValue(null);
      await expect(service.getNotifPrefs('u1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns followsEnabled (not followRequestsEnabled) for a public account', async () => {
      mockRepo.findById.mockResolvedValue({ id: 'u1', isPrivate: false });
      mockRepo.getNotifPrefs.mockResolvedValue({
        userId: 'u1',
        likesEnabled: true,
        dislikesEnabled: false,
        commentsEnabled: true,
        followsEnabled: true,
        followRequestsEnabled: true,
      });

      const result = await service.getNotifPrefs('u1');

      expect(result).toEqual({
        userId: 'u1',
        likesEnabled: true,
        dislikesEnabled: false,
        commentsEnabled: true,
        followsEnabled: true,
      });
      expect(result).not.toHaveProperty('followRequestsEnabled');
    });

    it('returns followRequestsEnabled (not followsEnabled) for a private account', async () => {
      mockRepo.findById.mockResolvedValue({ id: 'u1', isPrivate: true });
      mockRepo.getNotifPrefs.mockResolvedValue({
        userId: 'u1',
        likesEnabled: true,
        dislikesEnabled: false,
        commentsEnabled: true,
        followsEnabled: true,
        followRequestsEnabled: false,
      });

      const result = await service.getNotifPrefs('u1');

      expect(result).toEqual({
        userId: 'u1',
        likesEnabled: true,
        dislikesEnabled: false,
        commentsEnabled: true,
        followRequestsEnabled: false,
      });
      expect(result).not.toHaveProperty('followsEnabled');
    });
  });

  describe('updateNotifPrefs', () => {
    it('throws NotFoundException if the user does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(
        service.updateNotifPrefs('u1', { followsEnabled: false }),
      ).rejects.toThrow(NotFoundException);
    });

    it('ignores followRequestsEnabled for a public account', async () => {
      mockRepo.findById.mockResolvedValue({ id: 'u1', isPrivate: false });
      mockRepo.updateNotifPrefs.mockResolvedValue({
        userId: 'u1',
        likesEnabled: true,
        dislikesEnabled: true,
        commentsEnabled: true,
        followsEnabled: false,
        followRequestsEnabled: true,
      });

      const result = await service.updateNotifPrefs('u1', {
        followsEnabled: false,
        followRequestsEnabled: false,
      });

      expect(mockRepo.updateNotifPrefs).toHaveBeenCalledWith('u1', {
        followsEnabled: false,
        followRequestsEnabled: undefined,
      });
      expect(result).not.toHaveProperty('followRequestsEnabled');
    });

    it('ignores followsEnabled for a private account', async () => {
      mockRepo.findById.mockResolvedValue({ id: 'u1', isPrivate: true });
      mockRepo.updateNotifPrefs.mockResolvedValue({
        userId: 'u1',
        likesEnabled: true,
        dislikesEnabled: true,
        commentsEnabled: true,
        followsEnabled: true,
        followRequestsEnabled: false,
      });

      const result = await service.updateNotifPrefs('u1', {
        followsEnabled: false,
        followRequestsEnabled: false,
      });

      expect(mockRepo.updateNotifPrefs).toHaveBeenCalledWith('u1', {
        followsEnabled: undefined,
        followRequestsEnabled: false,
      });
      expect(result).not.toHaveProperty('followsEnabled');
    });
  });

  describe('searchUsers', () => {
    it('trims the query and forwards cursor/limit/viewerId to the repository', async () => {
      mockUserSearchRepo.searchUsers.mockResolvedValue({
        items: [],
        nextCursor: null,
      });
      await service.searchUsers('  juan  ', 'cursor-1', 5, 'viewer-1');
      expect(mockUserSearchRepo.searchUsers).toHaveBeenCalledWith(
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
      mockUserSearchRepo.searchUsers.mockResolvedValue({
        items: [user],
        nextCursor: 'next',
      });
      const result = await service.searchUsers('juan');
      expect(result).toEqual({ items: [user], nextCursor: 'next' });
    });
  });

  describe('quickSearchUsers', () => {
    it('trims the query and forwards the fixed limit and viewerId to the repository', async () => {
      mockUserSearchRepo.quickSearchUsers.mockResolvedValue([]);
      await service.quickSearchUsers('  juan  ', 'viewer-1');
      expect(mockUserSearchRepo.quickSearchUsers).toHaveBeenCalledWith(
        'juan',
        5,
        'viewer-1',
      );
    });

    it('forwards undefined viewerId for anonymous callers', async () => {
      mockUserSearchRepo.quickSearchUsers.mockResolvedValue([]);
      await service.quickSearchUsers('juan');
      expect(mockUserSearchRepo.quickSearchUsers).toHaveBeenCalledWith(
        'juan',
        5,
        undefined,
      );
    });

    it('returns the items (including isFollowing) from the repository', async () => {
      const user = {
        handle: 'juan',
        displayName: 'Juan',
        avatarUrl: null,
        isPrivate: false,
        isFollowing: true,
      };
      mockUserSearchRepo.quickSearchUsers.mockResolvedValue([user]);
      const result = await service.quickSearchUsers('juan', 'viewer-1');
      expect(result).toEqual([user]);
    });
  });
});
