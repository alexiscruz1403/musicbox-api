import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from '../../redis/redis.service.js';
import { TrendingRepository } from './trending.repository.js';
import { TrendingService } from './trending.service.js';

const mockRepo = {
  topAlbumGroups: vi.fn(),
  topTrackGroups: vi.fn(),
  hydrateAlbums: vi.fn(),
  hydrateTracks: vi.fn(),
  saveSnapshot: vi.fn(),
};

const mockRedis = {
  get: vi.fn(),
  set: vi.fn(),
};

const album = {
  id: 'album-1',
  deezerId: 'd-album-1',
  title: 'OK Computer',
  coverUrl: 'https://cover',
  artist: { deezerId: 'd-artist-1', name: 'Radiohead', imageUrl: null },
};

const track = {
  id: 'track-1',
  deezerId: 'd-track-1',
  title: 'Karma Police',
  artist: { deezerId: 'd-artist-1', name: 'Radiohead', imageUrl: null },
  album: { deezerId: 'd-album-1', coverUrl: 'https://cover' },
};

describe('TrendingService', () => {
  let service: TrendingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrendingService,
        { provide: TrendingRepository, useValue: mockRepo },
        { provide: RedisService, useValue: mockRedis },
      ],
    }).compile();

    service = module.get(TrendingService);
    vi.clearAllMocks();
  });

  describe('getAlbums', () => {
    it('returns cached albums without hitting the repository when Redis has a value', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify([{ deezerId: 'cached' }]));

      const result = await service.getAlbums(20);

      expect(result).toEqual([{ deezerId: 'cached' }]);
      expect(mockRepo.topAlbumGroups).not.toHaveBeenCalled();
    });

    it('computes and caches on a cold start (cache miss)', async () => {
      mockRedis.get.mockResolvedValue(null);
      mockRepo.topAlbumGroups.mockResolvedValue([
        { id: 'album-1', reviewCount: 5, avgRating: 8.2 },
      ]);
      mockRepo.hydrateAlbums.mockResolvedValue([album]);

      const result = await service.getAlbums(20);

      expect(result).toEqual([
        {
          deezerId: 'd-album-1',
          title: 'OK Computer',
          artist: { deezerId: 'd-artist-1', name: 'Radiohead', imageUrl: null },
          coverUrl: 'https://cover',
          reviewCount: 5,
          avgRating: 8.2,
        },
      ]);
      expect(mockRedis.set).toHaveBeenCalledWith(
        'trending:albums',
        JSON.stringify(result),
        expect.any(Number),
      );
    });

    it('slices to the requested limit', async () => {
      mockRedis.get.mockResolvedValue(
        JSON.stringify([
          { deezerId: 'a' },
          { deezerId: 'b' },
          { deezerId: 'c' },
        ]),
      );

      const result = await service.getAlbums(2);

      expect(result).toHaveLength(2);
    });
  });

  describe('getTracks', () => {
    it('computes and caches tracks on a cold start, hydrating cover/album from the Album relation', async () => {
      mockRedis.get.mockResolvedValue(null);
      mockRepo.topTrackGroups.mockResolvedValue([
        { id: 'track-1', reviewCount: 3, avgRating: 7.5 },
      ]);
      mockRepo.hydrateTracks.mockResolvedValue([track]);

      const result = await service.getTracks(20);

      expect(result).toEqual([
        {
          deezerId: 'd-track-1',
          title: 'Karma Police',
          artist: { deezerId: 'd-artist-1', name: 'Radiohead', imageUrl: null },
          albumDeezerId: 'd-album-1',
          coverUrl: 'https://cover',
          reviewCount: 3,
          avgRating: 7.5,
        },
      ]);
    });
  });

  describe('recalculate', () => {
    it('computes both lists, writes both cache keys, and persists a snapshot', async () => {
      mockRepo.topAlbumGroups.mockResolvedValue([]);
      mockRepo.topTrackGroups.mockResolvedValue([]);
      mockRepo.hydrateAlbums.mockResolvedValue([]);
      mockRepo.hydrateTracks.mockResolvedValue([]);

      await service.recalculate();

      expect(mockRedis.set).toHaveBeenCalledWith(
        'trending:albums',
        '[]',
        expect.any(Number),
      );
      expect(mockRedis.set).toHaveBeenCalledWith(
        'trending:tracks',
        '[]',
        expect.any(Number),
      );
      expect(mockRepo.saveSnapshot).toHaveBeenCalledWith({
        albums: [],
        tracks: [],
      });
    });

    it('drops groups whose album/track was not hydrated (e.g. deleted from catalog cache)', async () => {
      mockRepo.topAlbumGroups.mockResolvedValue([
        { id: 'missing-album', reviewCount: 1, avgRating: 5 },
      ]);
      mockRepo.topTrackGroups.mockResolvedValue([]);
      mockRepo.hydrateAlbums.mockResolvedValue([]);
      mockRepo.hydrateTracks.mockResolvedValue([]);

      const result = await service.recalculate();

      expect(result.albums).toEqual([]);
    });
  });
});
