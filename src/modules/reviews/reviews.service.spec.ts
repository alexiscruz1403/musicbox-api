import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Prisma } from '../../../generated/prisma/client.js';
import { CatalogService } from '../catalog/catalog.service.js';
import type {
  CatalogAlbum,
  CatalogTrack,
} from '../catalog/providers/music-catalog.provider.js';
import { ReviewEventsProducer } from '../events/review-events.producer.js';
import { SocialService } from '../social/social.service.js';
import { ReviewsRepository } from './reviews.repository.js';
import { ReviewsService } from './reviews.service.js';

const artistFixture = {
  deezerId: '27',
  name: 'Daft Punk',
  imageUrl: 'https://example.com/daft-punk.jpg',
  fans: 1000,
  albumsCount: 9,
};

const trackFixture: CatalogTrack = {
  deezerId: '3135556',
  title: 'One More Time',
  artist: artistFixture,
  albumDeezerId: '302127',
  albumTitle: 'Discovery',
  coverUrl: 'https://example.com/one-more-time.jpg',
  releaseDate: '2001-03-07',
  durationMs: 320000,
  trackNumber: 1,
  previewUrl: 'https://example.com/preview.mp3',
};

const albumFixture: CatalogAlbum = {
  deezerId: '302127',
  title: 'Discovery',
  artist: artistFixture,
  coverUrl: 'https://example.com/discovery.jpg',
  releaseDate: '2001-03-07',
  genreLabel: 'Electronica',
  tracks: [
    trackFixture,
    {
      ...trackFixture,
      deezerId: '3135557',
      title: 'Aerodynamic',
      trackNumber: 2,
    },
    {
      ...trackFixture,
      deezerId: '3135558',
      title: 'Digital Love',
      trackNumber: 3,
    },
  ],
  fans: 50000,
};

const mockRepo = {
  findAlbumByDeezerId: vi.fn(),
  findTrackByDeezerId: vi.fn(),
  findTracksByDeezerIds: vi.fn(),
  findUserIdByHandle: vi.fn(),
  createTrackReview: vi.fn(),
  createAlbumReview: vi.fn(),
  findById: vi.fn(),
  updateTrackReview: vi.fn(),
  updateAlbumReviewItems: vi.fn(),
  updateAlbumReviewDescription: vi.fn(),
  softDelete: vi.fn(),
  listByAlbum: vi.fn(),
  listByTrack: vi.fn(),
  listByUserId: vi.fn(),
  isOwnerVisibleTo: vi.fn(),
};

const mockCatalog = {
  getTrack: vi.fn(),
  getAlbum: vi.fn(),
};

const mockEvents = {
  emitCreated: vi.fn(),
  emitUpdated: vi.fn(),
  emitDeleted: vi.fn(),
};

const mockSocial = {
  getReviewStats: vi.fn(),
};

const defaultStats = {
  likesCount: 0,
  dislikesCount: 0,
  commentsCount: 0,
  userReaction: null,
};

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: ReviewsRepository, useValue: mockRepo },
        { provide: CatalogService, useValue: mockCatalog },
        { provide: ReviewEventsProducer, useValue: mockEvents },
        { provide: SocialService, useValue: mockSocial },
      ],
    }).compile();

    service = module.get(ReviewsService);
    vi.clearAllMocks();
    mockSocial.getReviewStats.mockImplementation((ids: string[]) =>
      Promise.resolve(new Map(ids.map((id) => [id, { ...defaultStats }]))),
    );
    mockRepo.isOwnerVisibleTo.mockResolvedValue(true);
  });

  describe('create — TRACK', () => {
    it('creates a track review and emits review.created', async () => {
      mockCatalog.getTrack.mockResolvedValue(trackFixture);
      mockRepo.findTrackByDeezerId.mockResolvedValue({ id: 'track-uuid-1' });
      mockRepo.createTrackReview.mockResolvedValue({
        id: 'review-1',
        userId: 'u1',
      });

      const result = await service.create('u1', {
        type: 'TRACK',
        deezerId: trackFixture.deezerId,
        description: 'Great track',
        rating: 9,
      });

      expect(mockRepo.createTrackReview).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'u1',
          trackId: 'track-uuid-1',
          rating: 9,
          externalTitle: trackFixture.title,
          externalArtistName: trackFixture.artist.name,
          externalCoverUrl: trackFixture.coverUrl,
        }),
      );
      expect(mockEvents.emitCreated).toHaveBeenCalledWith({
        reviewId: 'review-1',
        userId: 'u1',
        type: 'TRACK',
        trackId: 'track-uuid-1',
        albumId: null,
      });
      expect(result).toEqual({ id: 'review-1', userId: 'u1' });
    });

    it('propagates NotFoundException when the catalog track does not exist', async () => {
      mockCatalog.getTrack.mockRejectedValue(
        new NotFoundException('not found'),
      );

      await expect(
        service.create('u1', {
          type: 'TRACK',
          deezerId: 'invalid',
          description: 'x',
          rating: 5,
        }),
      ).rejects.toThrow(NotFoundException);
      expect(mockRepo.createTrackReview).not.toHaveBeenCalled();
    });

    it('translates a Postgres unique violation into 409 REVIEW_ALREADY_EXISTS', async () => {
      mockCatalog.getTrack.mockResolvedValue(trackFixture);
      mockRepo.findTrackByDeezerId.mockResolvedValue({ id: 'track-uuid-1' });
      mockRepo.createTrackReview.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('duplicate', {
          code: 'P2002',
          clientVersion: '7.8.0',
        }),
      );

      await expect(
        service.create('u1', {
          type: 'TRACK',
          deezerId: trackFixture.deezerId,
          description: 'x',
          rating: 5,
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('create — ALBUM', () => {
    it('computes the album rating as the rounded average of item ratings', async () => {
      mockCatalog.getAlbum.mockResolvedValue(albumFixture);
      mockRepo.findAlbumByDeezerId.mockResolvedValue({ id: 'album-uuid-1' });
      mockRepo.findTracksByDeezerIds.mockResolvedValue([
        { deezerId: '3135556', id: 'track-uuid-1' },
        { deezerId: '3135557', id: 'track-uuid-2' },
        { deezerId: '3135558', id: 'track-uuid-3' },
      ]);
      mockRepo.createAlbumReview.mockResolvedValue({ id: 'review-2' });

      await service.create('u1', {
        type: 'ALBUM',
        deezerId: albumFixture.deezerId,
        description: 'Great album',
        trackItems: [
          { deezerId: '3135556', rating: 7 },
          { deezerId: '3135557', rating: 8 },
          { deezerId: '3135558', rating: 9 },
        ],
      });

      expect(mockRepo.createAlbumReview).toHaveBeenCalledWith(
        expect.objectContaining({
          albumId: 'album-uuid-1',
          rating: 8,
          items: [
            expect.objectContaining({ trackId: 'track-uuid-1', rating: 7 }),
            expect.objectContaining({ trackId: 'track-uuid-2', rating: 8 }),
            expect.objectContaining({ trackId: 'track-uuid-3', rating: 9 }),
          ],
        }),
      );
    });

    it('rounds a repeating-decimal average to 1 decimal place', async () => {
      mockCatalog.getAlbum.mockResolvedValue(albumFixture);
      mockRepo.findAlbumByDeezerId.mockResolvedValue({ id: 'album-uuid-1' });
      mockRepo.findTracksByDeezerIds.mockResolvedValue([
        { deezerId: '3135556', id: 'track-uuid-1' },
        { deezerId: '3135557', id: 'track-uuid-2' },
        { deezerId: '3135558', id: 'track-uuid-3' },
      ]);
      mockRepo.createAlbumReview.mockResolvedValue({ id: 'review-2' });

      await service.create('u1', {
        type: 'ALBUM',
        deezerId: albumFixture.deezerId,
        description: 'x',
        trackItems: [
          { deezerId: '3135556', rating: 6 },
          { deezerId: '3135557', rating: 7 },
          { deezerId: '3135558', rating: 7 },
        ],
      });

      expect(mockRepo.createAlbumReview).toHaveBeenCalledWith(
        expect.objectContaining({ rating: 6.7 }),
      );
    });

    it('allows partial tracklist coverage (not every track needs to be rated)', async () => {
      mockCatalog.getAlbum.mockResolvedValue(albumFixture);
      mockRepo.findAlbumByDeezerId.mockResolvedValue({ id: 'album-uuid-1' });
      mockRepo.findTracksByDeezerIds.mockResolvedValue([
        { deezerId: '3135556', id: 'track-uuid-1' },
      ]);
      mockRepo.createAlbumReview.mockResolvedValue({ id: 'review-2' });

      await expect(
        service.create('u1', {
          type: 'ALBUM',
          deezerId: albumFixture.deezerId,
          description: 'Only one track rated',
          trackItems: [{ deezerId: '3135556', rating: 10 }],
        }),
      ).resolves.toBeDefined();
      expect(mockRepo.createAlbumReview).toHaveBeenCalled();
    });

    it('rejects a trackItem whose deezerId is not part of the album', async () => {
      mockCatalog.getAlbum.mockResolvedValue(albumFixture);
      mockRepo.findAlbumByDeezerId.mockResolvedValue({ id: 'album-uuid-1' });

      await expect(
        service.create('u1', {
          type: 'ALBUM',
          deezerId: albumFixture.deezerId,
          description: 'x',
          trackItems: [{ deezerId: 'not-in-album', rating: 5 }],
        }),
      ).rejects.toThrow(BadRequestException);
      expect(mockRepo.createAlbumReview).not.toHaveBeenCalled();
    });

    it('translates a Postgres unique violation into 409 REVIEW_ALREADY_EXISTS', async () => {
      mockCatalog.getAlbum.mockResolvedValue(albumFixture);
      mockRepo.findAlbumByDeezerId.mockResolvedValue({ id: 'album-uuid-1' });
      mockRepo.findTracksByDeezerIds.mockResolvedValue([
        { deezerId: '3135556', id: 'track-uuid-1' },
      ]);
      mockRepo.createAlbumReview.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('duplicate', {
          code: 'P2002',
          clientVersion: '7.8.0',
        }),
      );

      await expect(
        service.create('u1', {
          type: 'ALBUM',
          deezerId: albumFixture.deezerId,
          description: 'x',
          trackItems: [{ deezerId: '3135556', rating: 5 }],
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('returns the review with likes/dislikes/comments defaulted to zero when there are none', async () => {
      mockRepo.findById.mockResolvedValue({
        id: 'review-1',
        status: 'ACTIVE',
        deletedAt: null,
      });

      const result = await service.findById('review-1');
      expect(result).toMatchObject(defaultStats);
    });

    it('merges stats from SocialService, forwarding the viewer id', async () => {
      mockRepo.findById.mockResolvedValue({
        id: 'review-1',
        status: 'ACTIVE',
        deletedAt: null,
      });
      mockSocial.getReviewStats.mockResolvedValue(
        new Map([
          [
            'review-1',
            {
              likesCount: 3,
              dislikesCount: 1,
              commentsCount: 2,
              userReaction: 'LIKE',
            },
          ],
        ]),
      );

      const result = await service.findById('review-1', 'viewer-1');

      expect(mockSocial.getReviewStats).toHaveBeenCalledWith(
        ['review-1'],
        'viewer-1',
      );
      expect(result).toMatchObject({
        likesCount: 3,
        dislikesCount: 1,
        commentsCount: 2,
        userReaction: 'LIKE',
      });
    });

    it('throws NotFoundException for a missing review', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(service.findById('missing')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException for a soft-deleted review', async () => {
      mockRepo.findById.mockResolvedValue({
        id: 'review-1',
        status: 'DELETED',
        deletedAt: new Date(),
      });
      await expect(service.findById('review-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws ForbiddenException when the owner is private and not visible to the viewer', async () => {
      mockRepo.findById.mockResolvedValue({
        id: 'review-1',
        userId: 'owner',
        status: 'ACTIVE',
        deletedAt: null,
      });
      mockRepo.isOwnerVisibleTo.mockResolvedValue(false);

      await expect(service.findById('review-1', 'stranger')).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockRepo.isOwnerVisibleTo).toHaveBeenCalledWith(
        'owner',
        'stranger',
      );
    });
  });

  describe('update', () => {
    const trackReview = {
      id: 'review-1',
      userId: 'owner',
      type: 'TRACK',
      trackId: 'track-uuid-1',
      albumId: null,
      status: 'ACTIVE',
      deletedAt: null,
    };

    it('rejects updates from a non-owner', async () => {
      mockRepo.findById.mockResolvedValue(trackReview);
      await expect(
        service.update('someone-else', 'review-1', { description: 'x' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('rejects a rating patch on an ALBUM review', async () => {
      mockRepo.findById.mockResolvedValue({
        ...trackReview,
        type: 'ALBUM',
        albumId: 'album-1',
        trackId: null,
      });
      await expect(
        service.update('owner', 'review-1', { rating: 8 }),
      ).rejects.toThrow(BadRequestException);
    });

    it('rejects a trackItems patch on a TRACK review', async () => {
      mockRepo.findById.mockResolvedValue(trackReview);
      await expect(
        service.update('owner', 'review-1', {
          trackItems: [{ deezerId: '1', rating: 5 }],
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('recalculates the rating from only the new trackItems set', async () => {
      mockRepo.findById
        .mockResolvedValueOnce({
          id: 'review-2',
          userId: 'owner',
          type: 'ALBUM',
          albumId: 'album-uuid-1',
          trackId: null,
          status: 'ACTIVE',
          deletedAt: null,
          album: { deezerId: albumFixture.deezerId },
        })
        .mockResolvedValueOnce({ id: 'review-2' });
      mockCatalog.getAlbum.mockResolvedValue(albumFixture);
      mockRepo.findTracksByDeezerIds.mockResolvedValue([
        { deezerId: '3135557', id: 'track-uuid-2' },
      ]);

      await service.update('owner', 'review-2', {
        trackItems: [{ deezerId: '3135557', rating: 4 }],
      });

      expect(mockRepo.updateAlbumReviewItems).toHaveBeenCalledWith(
        'review-2',
        undefined,
        4,
        [expect.objectContaining({ trackId: 'track-uuid-2', rating: 4 })],
      );
    });

    it('throws NotFoundException when updating an already-deleted review', async () => {
      mockRepo.findById.mockResolvedValue({
        ...trackReview,
        status: 'DELETED',
        deletedAt: new Date(),
      });
      await expect(
        service.update('owner', 'review-1', { description: 'x' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    const review = {
      id: 'review-1',
      userId: 'owner',
      type: 'TRACK',
      trackId: 'track-uuid-1',
      albumId: null,
      status: 'ACTIVE',
      deletedAt: null,
    };

    it('soft-deletes and emits review.deleted for the owner', async () => {
      mockRepo.findById.mockResolvedValue(review);
      await service.remove('owner', 'review-1');
      expect(mockRepo.softDelete).toHaveBeenCalledWith('review-1');
      expect(mockEvents.emitDeleted).toHaveBeenCalledWith({
        reviewId: 'review-1',
        userId: 'owner',
        type: 'TRACK',
        albumId: null,
        trackId: 'track-uuid-1',
      });
    });

    it('rejects deletion from a non-owner', async () => {
      mockRepo.findById.mockResolvedValue(review);
      await expect(service.remove('someone-else', 'review-1')).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockRepo.softDelete).not.toHaveBeenCalled();
    });

    it('is a no-op (no throw, no repo/event calls) when the owner deletes an already-deleted review', async () => {
      mockRepo.findById.mockResolvedValue({
        ...review,
        status: 'DELETED',
        deletedAt: new Date(),
      });
      await expect(
        service.remove('owner', 'review-1'),
      ).resolves.toBeUndefined();
      expect(mockRepo.softDelete).not.toHaveBeenCalled();
      expect(mockEvents.emitDeleted).not.toHaveBeenCalled();
    });

    it('still rejects a non-owner even when the review is already deleted (no silent success leaking ownership)', async () => {
      mockRepo.findById.mockResolvedValue({
        ...review,
        status: 'DELETED',
        deletedAt: new Date(),
      });
      await expect(service.remove('someone-else', 'review-1')).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockRepo.softDelete).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when the review id does not exist at all', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(service.remove('owner', 'missing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('listing', () => {
    it('resolves album deezerId to internal id before listing', async () => {
      mockRepo.findAlbumByDeezerId.mockResolvedValue({ id: 'album-uuid-1' });
      mockRepo.listByAlbum.mockResolvedValue({ items: [], nextCursor: null });

      await service.listByAlbum('302127', { limit: 20, sort: 'recent' });
      expect(mockRepo.listByAlbum).toHaveBeenCalledWith(
        'album-uuid-1',
        undefined,
        20,
        'recent',
        undefined,
      );
    });

    it('merges stats onto each album review item and forwards the viewer id', async () => {
      mockRepo.findAlbumByDeezerId.mockResolvedValue({ id: 'album-uuid-1' });
      mockRepo.listByAlbum.mockResolvedValue({
        items: [{ id: 'review-1' }, { id: 'review-2' }],
        nextCursor: 'cursor-1',
      });
      mockSocial.getReviewStats.mockResolvedValue(
        new Map([
          ['review-1', { ...defaultStats, likesCount: 2 }],
          ['review-2', { ...defaultStats, commentsCount: 1 }],
        ]),
      );

      const result = await service.listByAlbum(
        '302127',
        { limit: 20, sort: 'recent' },
        'viewer-1',
      );

      expect(mockSocial.getReviewStats).toHaveBeenCalledWith(
        ['review-1', 'review-2'],
        'viewer-1',
      );
      expect(result.items).toEqual([
        { id: 'review-1', ...defaultStats, likesCount: 2 },
        { id: 'review-2', ...defaultStats, commentsCount: 1 },
      ]);
      expect(result.nextCursor).toBe('cursor-1');
    });

    it('merges stats onto each track review item and forwards the viewer id', async () => {
      mockRepo.findTrackByDeezerId.mockResolvedValue({ id: 'track-uuid-1' });
      mockRepo.listByTrack.mockResolvedValue({
        items: [{ id: 'review-3' }],
        nextCursor: null,
      });
      mockSocial.getReviewStats.mockResolvedValue(
        new Map([['review-3', { ...defaultStats, dislikesCount: 1 }]]),
      );

      const result = await service.listByTrack(
        '3135556',
        { limit: 20, sort: 'recent' },
        'viewer-2',
      );

      expect(mockSocial.getReviewStats).toHaveBeenCalledWith(
        ['review-3'],
        'viewer-2',
      );
      expect(result.items).toEqual([
        { id: 'review-3', ...defaultStats, dislikesCount: 1 },
      ]);
    });

    it('throws NotFoundException for an unknown album deezerId', async () => {
      mockRepo.findAlbumByDeezerId.mockRejectedValue(new Error('not found'));
      await expect(
        service.listByAlbum('unknown', { limit: 20, sort: 'recent' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException for an unknown track deezerId', async () => {
      mockRepo.findTrackByDeezerId.mockRejectedValue(new Error('not found'));
      await expect(
        service.listByTrack('unknown', { limit: 20, sort: 'recent' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException for an unknown user handle', async () => {
      mockRepo.findUserIdByHandle.mockRejectedValue(new Error('not found'));
      await expect(
        service.listByUserHandle('unknown', { limit: 10, sort: 'recent' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException when the profile is private and not visible to the viewer', async () => {
      mockRepo.findUserIdByHandle.mockResolvedValue({ id: 'user-uuid-1' });
      mockRepo.isOwnerVisibleTo.mockResolvedValue(false);

      await expect(
        service.listByUserHandle(
          'private_user',
          { limit: 10, sort: 'recent' },
          'stranger',
        ),
      ).rejects.toThrow(ForbiddenException);
      expect(mockRepo.listByUserId).not.toHaveBeenCalled();
    });

    it('flattens the included user relation into a plain avatarUrl field', async () => {
      mockRepo.findUserIdByHandle.mockResolvedValue({ id: 'user-uuid-1' });
      mockRepo.listByUserId.mockResolvedValue({
        items: [
          {
            id: 'review-1',
            rating: '8.0',
            user: { avatarUrl: 'https://example.com/avatar.jpg' },
          },
        ],
        nextCursor: null,
      });

      const result = await service.listByUserHandle('juan', {
        limit: 10,
        sort: 'recent',
      });

      expect(result.items).toEqual([
        {
          id: 'review-1',
          rating: '8.0',
          avatarUrl: 'https://example.com/avatar.jpg',
        },
      ]);
      expect(mockRepo.listByUserId).toHaveBeenCalledWith(
        'user-uuid-1',
        undefined,
        10,
        'recent',
        undefined,
      );
    });
  });
});
