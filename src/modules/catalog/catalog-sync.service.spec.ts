import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RedisService } from '../../redis/redis.service.js';
import { CatalogSyncService } from './catalog-sync.service.js';
import { CatalogRepository } from './catalog.repository.js';
import {
  MUSIC_CATALOG_PROVIDER,
  type CatalogAlbum,
  type CatalogArtist,
  type CatalogPage,
  type CatalogTrack,
  type MusicCatalogProvider,
} from './providers/music-catalog.provider.js';

const artistFixture: CatalogArtist = {
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
  coverUrl: 'https://example.com/discovery.jpg',
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
  tracks: [trackFixture],
  fans: 50000,
};

const staleArtistRow = {
  id: 'uuid-artist-1',
  deezerId: '27',
  name: 'Daft Punk (old)',
  imageUrl: null,
  lastSyncedAt: new Date('2020-01-01'),
  mbid: null,
};

const dbAlbumRow = {
  id: 'uuid-album-1',
  deezerId: '302127',
  title: 'Discovery',
  artistId: 'uuid-artist-1',
  coverUrl: null,
  releaseDate: null,
  genreLabel: null,
  lastSyncedAt: new Date(),
  mbid: null,
};

describe('CatalogSyncService', () => {
  let service: CatalogSyncService;

  const mockProvider: MusicCatalogProvider = {
    search: vi.fn(),
    getAlbum: vi.fn(),
    getTrack: vi.fn(),
    getArtist: vi.fn(),
    getArtistAlbums: vi.fn(),
  };

  const mockRepo = {
    findStaleArtists: vi.fn(),
    findArtistByDeezerId: vi.fn(),
    markCatalogSynced: vi.fn(),
    upsertArtist: vi.fn(),
    upsertAlbum: vi.fn(),
    upsertTrack: vi.fn(),
  };

  const mockRedis = {
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
    exists: vi.fn(),
    deleteByPattern: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    mockRepo.upsertArtist.mockResolvedValue(staleArtistRow);
    mockRepo.upsertAlbum.mockResolvedValue(dbAlbumRow);
    mockRepo.markCatalogSynced.mockResolvedValue({
      ...staleArtistRow,
      catalogSyncedAt: new Date(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogSyncService,
        { provide: MUSIC_CATALOG_PROVIDER, useValue: mockProvider },
        { provide: CatalogRepository, useValue: mockRepo },
        { provide: RedisService, useValue: mockRedis },
      ],
    }).compile();

    service = module.get(CatalogSyncService);
  });

  it('does nothing when there are no stale artists', async () => {
    mockRepo.findStaleArtists.mockResolvedValue([]);

    await service.syncStaleArtists();

    expect(mockProvider.getArtist).not.toHaveBeenCalled();
    expect(mockRedis.del).not.toHaveBeenCalled();
  });

  it('refreshes metadata, discovers albums/tracks, and invalidates redis for a stale artist', async () => {
    mockRepo.findStaleArtists.mockResolvedValue([staleArtistRow]);
    vi.mocked(mockProvider.getArtist).mockResolvedValue(artistFixture);
    vi.mocked(mockProvider.getArtistAlbums).mockResolvedValue({
      items: [albumFixture],
      nextCursor: null,
      total: 1,
    } satisfies CatalogPage<CatalogAlbum>);
    vi.mocked(mockProvider.getAlbum).mockResolvedValue(albumFixture);

    await service.syncStaleArtists();

    expect(mockProvider.getArtist).toHaveBeenCalledWith('27');
    expect(mockRepo.upsertArtist).toHaveBeenCalledWith(artistFixture);
    expect(mockRedis.del).toHaveBeenCalledWith('catalog:artist:27');

    expect(mockProvider.getArtistAlbums).toHaveBeenCalledWith('27', 50, null);
    expect(mockRedis.deleteByPattern).toHaveBeenCalledWith(
      'catalog:artist-albums:27:*',
    );

    expect(mockProvider.getAlbum).toHaveBeenCalledWith('302127');
    expect(mockRepo.upsertAlbum).toHaveBeenCalledWith(
      albumFixture,
      'uuid-artist-1',
    );
    expect(mockRedis.del).toHaveBeenCalledWith('catalog:album:302127');

    expect(mockRepo.upsertTrack).toHaveBeenCalledWith(
      trackFixture,
      'uuid-artist-1',
      'uuid-album-1',
    );
    expect(mockRedis.del).toHaveBeenCalledWith('catalog:track:3135556');

    expect(mockRedis.deleteByPattern).toHaveBeenCalledWith(
      'catalog:artist-tracks:27:*',
    );
    expect(mockRedis.del).toHaveBeenCalledWith('catalog:artist-detail:27');
    expect(mockRepo.markCatalogSynced).toHaveBeenCalledWith(
      'uuid-artist-1',
      expect.any(Date),
    );
  });

  it('follows pagination cursors to walk the full discography', async () => {
    mockRepo.findStaleArtists.mockResolvedValue([staleArtistRow]);
    vi.mocked(mockProvider.getArtist).mockResolvedValue(artistFixture);
    vi.mocked(mockProvider.getArtistAlbums)
      .mockResolvedValueOnce({
        items: [albumFixture],
        nextCursor: 'cursor-2',
        total: 2,
      })
      .mockResolvedValueOnce({
        items: [],
        nextCursor: null,
        total: 2,
      });
    vi.mocked(mockProvider.getAlbum).mockResolvedValue(albumFixture);

    await service.syncStaleArtists();

    expect(mockProvider.getArtistAlbums).toHaveBeenCalledTimes(2);
    expect(mockProvider.getArtistAlbums).toHaveBeenNthCalledWith(
      1,
      '27',
      50,
      null,
    );
    expect(mockProvider.getArtistAlbums).toHaveBeenNthCalledWith(
      2,
      '27',
      50,
      'cursor-2',
    );
  });

  it('logs and continues when one artist fails', async () => {
    const secondArtistRow = { ...staleArtistRow, deezerId: '28' };
    mockRepo.findStaleArtists.mockResolvedValue([
      staleArtistRow,
      secondArtistRow,
    ]);
    vi.mocked(mockProvider.getArtist)
      .mockRejectedValueOnce(new Error('deezer down'))
      .mockResolvedValueOnce(artistFixture);
    vi.mocked(mockProvider.getArtistAlbums).mockResolvedValue({
      items: [],
      nextCursor: null,
      total: 0,
    });

    await expect(service.syncStaleArtists()).resolves.not.toThrow();

    expect(mockProvider.getArtist).toHaveBeenCalledTimes(2);
    expect(mockProvider.getArtist).toHaveBeenNthCalledWith(2, '28');
  });

  describe('ensureArtistSynced()', () => {
    it('skips Deezer when the artist is already synced and fresh', async () => {
      const freshArtistRow = {
        ...staleArtistRow,
        catalogSyncedAt: new Date(),
      };
      mockRepo.findArtistByDeezerId.mockResolvedValue(freshArtistRow);

      const result = await service.ensureArtistSynced('27');

      expect(result).toBe(freshArtistRow);
      expect(mockProvider.getArtist).not.toHaveBeenCalled();
    });

    it('runs a full sync when the artist was never fully synced (catalogSyncedAt null)', async () => {
      mockRepo.findArtistByDeezerId.mockResolvedValue({
        ...staleArtistRow,
        catalogSyncedAt: null,
      });
      vi.mocked(mockProvider.getArtist).mockResolvedValue(artistFixture);
      vi.mocked(mockProvider.getArtistAlbums).mockResolvedValue({
        items: [],
        nextCursor: null,
        total: 0,
      });

      await service.ensureArtistSynced('27');

      expect(mockProvider.getArtist).toHaveBeenCalledWith('27');
      expect(mockRepo.markCatalogSynced).toHaveBeenCalledWith(
        'uuid-artist-1',
        expect.any(Date),
      );
    });

    it('runs a full sync when the artist is stale', async () => {
      mockRepo.findArtistByDeezerId.mockResolvedValue({
        ...staleArtistRow,
        catalogSyncedAt: new Date('2020-01-01'),
      });
      vi.mocked(mockProvider.getArtist).mockResolvedValue(artistFixture);
      vi.mocked(mockProvider.getArtistAlbums).mockResolvedValue({
        items: [],
        nextCursor: null,
        total: 0,
      });

      await service.ensureArtistSynced('27');

      expect(mockProvider.getArtist).toHaveBeenCalledWith('27');
    });

    it('runs a full sync when the artist does not exist yet', async () => {
      mockRepo.findArtistByDeezerId.mockResolvedValue(null);
      vi.mocked(mockProvider.getArtist).mockResolvedValue(artistFixture);
      vi.mocked(mockProvider.getArtistAlbums).mockResolvedValue({
        items: [],
        nextCursor: null,
        total: 0,
      });

      await service.ensureArtistSynced('27');

      expect(mockProvider.getArtist).toHaveBeenCalledWith('27');
    });
  });
});
