import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RedisService } from '../../redis/redis.service.js';
import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { CatalogService } from './catalog.service.js';
import type { CatalogArtist } from './providers/music-catalog.provider.js';

const artistFixture: CatalogArtist = {
  deezerId: '27',
  name: 'Daft Punk',
  imageUrl: 'https://example.com/daft-punk.jpg',
  fans: 1000,
};

const dbArtistRow = {
  id: 'uuid-artist-1',
  deezerId: '27',
  name: 'Daft Punk',
  imageUrl: null,
  lastSyncedAt: new Date(),
  catalogSyncedAt: new Date(),
  mbid: null,
};

const albumRow = {
  id: 'uuid-album-1',
  deezerId: '302127',
  title: 'Discovery',
  coverUrl: 'https://example.com/discovery.jpg',
  artist: dbArtistRow,
};

const trackRow = {
  id: 'uuid-track-1',
  deezerId: '3135556',
  title: 'One More Time',
  artist: dbArtistRow,
  album: { deezerId: '302127', coverUrl: 'https://example.com/discovery.jpg' },
};

const reviewedAlbumGroup = { id: 'uuid-album-1', reviewCount: 42, avgRating: 4.5 };
const reviewedTrackGroup = { id: 'uuid-track-1', reviewCount: 30, avgRating: 4.2 };
const trendingAlbumGroup = { id: 'uuid-album-1', reviewCount: 10, avgRating: 4.8 };
const trendingTrackGroup = { id: 'uuid-track-1', reviewCount: 8, avgRating: 4.6 };

describe('ArtistDetailService', () => {
  let service: ArtistDetailService;

  const mockCatalogService = {
    getArtist: vi.fn(),
  };

  const mockRepo = {
    findArtistByDeezerId: vi.fn(),
    topReviewedAlbumIds: vi.fn(),
    topReviewedTrackIds: vi.fn(),
    trendingAlbumIds: vi.fn(),
    trendingTrackIds: vi.fn(),
    hydrateAlbumSummaries: vi.fn(),
    hydrateTrackSummaries: vi.fn(),
  };

  const mockRedis = {
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
    exists: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    mockCatalogService.getArtist.mockResolvedValue(artistFixture);
    mockRepo.findArtistByDeezerId.mockResolvedValue(dbArtistRow);
    mockRepo.topReviewedAlbumIds.mockResolvedValue([reviewedAlbumGroup]);
    mockRepo.topReviewedTrackIds.mockResolvedValue([reviewedTrackGroup]);
    mockRepo.trendingAlbumIds.mockResolvedValue([trendingAlbumGroup]);
    mockRepo.trendingTrackIds.mockResolvedValue([trendingTrackGroup]);
    mockRepo.hydrateAlbumSummaries.mockResolvedValue([albumRow]);
    mockRepo.hydrateTrackSummaries.mockResolvedValue([trackRow]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistDetailService,
        { provide: CatalogService, useValue: mockCatalogService },
        { provide: CatalogRepository, useValue: mockRepo },
        { provide: RedisService, useValue: mockRedis },
      ],
    }).compile();

    service = module.get(ArtistDetailService);
  });

  it('cache miss — builds the 4 top-5 lists and caches the result', async () => {
    mockRedis.get.mockResolvedValue(null);

    const result = await service.getDetail('27');

    expect(mockRepo.topReviewedAlbumIds).toHaveBeenCalledWith('uuid-artist-1', 5);
    expect(mockRepo.trendingAlbumIds).toHaveBeenCalledWith(
      'uuid-artist-1',
      5,
      expect.any(Date),
    );

    expect(result.artist).toEqual(artistFixture);
    expect(result.topReviewedAlbums).toEqual([
      {
        deezerId: '302127',
        title: 'Discovery',
        artist: { deezerId: '27', name: 'Daft Punk', imageUrl: null },
        coverUrl: 'https://example.com/discovery.jpg',
        reviewCount: 42,
        avgRating: 4.5,
      },
    ]);
    expect(result.topReviewedTracks).toEqual([
      {
        deezerId: '3135556',
        title: 'One More Time',
        artist: { deezerId: '27', name: 'Daft Punk', imageUrl: null },
        albumDeezerId: '302127',
        coverUrl: 'https://example.com/discovery.jpg',
        reviewCount: 30,
        avgRating: 4.2,
      },
    ]);
    expect(result.trendingAlbums[0].reviewCount).toBe(10);
    expect(result.trendingTracks[0].reviewCount).toBe(8);

    expect(mockRedis.set).toHaveBeenCalledWith(
      'catalog:artist-detail:27',
      JSON.stringify(result),
      3600,
    );
  });

  it('cache hit — returns cached detail without recomputing', async () => {
    const cached = {
      artist: artistFixture,
      topReviewedAlbums: [],
      topReviewedTracks: [],
      trendingAlbums: [],
      trendingTracks: [],
    };
    mockRedis.get.mockResolvedValue(JSON.stringify(cached));

    const result = await service.getDetail('27');

    expect(mockCatalogService.getArtist).not.toHaveBeenCalled();
    expect(mockRepo.topReviewedAlbumIds).not.toHaveBeenCalled();
    expect(result).toEqual(cached);
  });

  it('throws NotFoundException if the artist row is missing after getArtist()', async () => {
    mockRedis.get.mockResolvedValue(null);
    mockRepo.findArtistByDeezerId.mockResolvedValue(null);

    await expect(service.getDetail('27')).rejects.toThrow(NotFoundException);
  });
});
