import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RedisService } from '../../redis/redis.service.js';
import { CatalogSyncService } from './catalog-sync.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { CatalogService } from './catalog.service.js';
import {
  MUSIC_CATALOG_PROVIDER,
  type CatalogAlbum,
  type CatalogArtist,
  type CatalogPage,
  type CatalogSearchResult,
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

const searchPageFixture: CatalogPage<CatalogSearchResult> = {
  items: [{ type: 'artist', item: artistFixture }],
  nextCursor: null,
  total: 1,
};

const dbArtistRow = {
  id: 'uuid-artist-1',
  deezerId: '27',
  name: 'Daft Punk',
  imageUrl: null,
  lastSyncedAt: new Date(),
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
const dbTrackRow = {
  id: 'uuid-track-1',
  deezerId: '3135556',
  title: 'One More Time',
  artistId: 'uuid-artist-1',
  albumId: 'uuid-album-1',
  durationMs: 320000,
  trackNumber: 1,
  previewUrl: null,
  lastSyncedAt: new Date(),
  mbid: null,
};

describe('CatalogService', () => {
  let service: CatalogService;

  const mockProvider: MusicCatalogProvider = {
    search: vi.fn(),
    getAlbum: vi.fn(),
    getTrack: vi.fn(),
    getArtist: vi.fn(),
    getArtistAlbums: vi.fn(),
  };

  const mockRepo = {
    upsertArtist: vi.fn(),
    upsertAlbum: vi.fn(),
    upsertTrack: vi.fn(),
    findTracksByArtist: vi.fn(),
    findAlbumIdByDeezerId: vi.fn(),
    getAlbumStats: vi.fn(),
    getTrackStats: vi.fn(),
    getArtistStats: vi.fn(),
    getAlbumStatsBatch: vi.fn(),
    getTrackStatsBatch: vi.fn(),
    getArtistStatsBatch: vi.fn(),
  };

  const mockRedis = {
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
    exists: vi.fn(),
  };

  const mockCatalogSyncService = {
    ensureArtistSynced: vi.fn(),
  };

  // Sets up mockRedis.get to answer per-key, defaulting to a cache miss
  // (null) for anything not explicitly listed — needed once a single
  // request can touch more than one Redis key (metadata + preview caches).
  function mockRedisGet(responses: Record<string, string | null>) {
    mockRedis.get.mockImplementation((key: string) =>
      Promise.resolve(responses[key] ?? null),
    );
  }

  beforeEach(async () => {
    vi.clearAllMocks();
    mockRepo.upsertArtist.mockResolvedValue(dbArtistRow);
    mockRepo.upsertAlbum.mockResolvedValue(dbAlbumRow);
    mockRepo.upsertTrack.mockResolvedValue(dbTrackRow);
    mockRepo.findAlbumIdByDeezerId.mockResolvedValue(null);
    mockRepo.getAlbumStats.mockResolvedValue(null);
    mockRepo.getTrackStats.mockResolvedValue(null);
    mockRepo.getArtistStats.mockResolvedValue(null);
    mockRepo.getAlbumStatsBatch.mockResolvedValue(new Map());
    mockRepo.getTrackStatsBatch.mockResolvedValue(new Map());
    mockRepo.getArtistStatsBatch.mockResolvedValue(new Map());
    mockCatalogSyncService.ensureArtistSynced.mockResolvedValue(dbArtistRow);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        { provide: MUSIC_CATALOG_PROVIDER, useValue: mockProvider },
        { provide: CatalogRepository, useValue: mockRepo },
        { provide: RedisService, useValue: mockRedis },
        { provide: CatalogSyncService, useValue: mockCatalogSyncService },
      ],
    }).compile();

    service = module.get(CatalogService);
  });

  describe('search()', () => {
    it('cache miss — calls provider, caches result, and enriches items with reviewCount/userRating', async () => {
      mockRedis.get.mockResolvedValue(null);
      vi.mocked(mockProvider.search).mockResolvedValue(searchPageFixture);

      const result = await service.search('daft punk', 'artist', 20, null);

      expect(mockProvider.search).toHaveBeenCalledWith(
        'daft punk',
        'artist',
        20,
        null,
      );
      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:search:artist:daft punk:20:0',
        JSON.stringify(searchPageFixture),
        86_400,
      );
      expect(result).toEqual({
        items: [{ type: 'artist', item: { ...artistFixture, reviewCount: 0 } }],
        nextCursor: null,
        total: 1,
      });
    });

    it('cache hit — returns cached data without calling provider', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify(searchPageFixture));

      const result = await service.search('daft punk', 'artist', 20, null);

      expect(mockProvider.search).not.toHaveBeenCalled();
      expect(mockRedis.set).not.toHaveBeenCalled();
      expect(result).toEqual({
        items: [{ type: 'artist', item: { ...artistFixture, reviewCount: 0 } }],
        nextCursor: null,
        total: 1,
      });
    });
  });

  describe('getAlbum()', () => {
    it('cache miss (metadata + preview) — fetches from provider once, upserts artist/album/tracks, caches result', async () => {
      mockRedisGet({});
      vi.mocked(mockProvider.getAlbum).mockResolvedValue(albumFixture);

      const result = await service.getAlbum('302127');

      expect(mockProvider.getAlbum).toHaveBeenCalledTimes(1);
      expect(mockProvider.getAlbum).toHaveBeenCalledWith('302127');
      expect(mockRepo.upsertArtist).toHaveBeenCalledWith(artistFixture);
      expect(mockRepo.upsertAlbum).toHaveBeenCalledWith(
        albumFixture,
        'uuid-artist-1',
      );
      expect(mockRepo.upsertTrack).toHaveBeenCalledWith(
        trackFixture,
        'uuid-artist-1',
        'uuid-album-1',
      );
      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:album:302127',
        JSON.stringify(albumFixture),
        86_400,
      );
      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:album-preview:302127',
        JSON.stringify({ [trackFixture.deezerId]: trackFixture.previewUrl }),
        600,
      );
      expect(result).toEqual({
        ...albumFixture,
        reviewCount: 0,
        userRating: null,
        tracks: [
          {
            ...trackFixture,
            previewUrl: trackFixture.previewUrl,
            userRating: null,
          },
        ],
      });
    });

    it('metadata cache hit + preview cache miss — refreshes only the preview via one extra provider call', async () => {
      mockRedisGet({ 'catalog:album:302127': JSON.stringify(albumFixture) });
      vi.mocked(mockProvider.getAlbum).mockResolvedValue(albumFixture);

      const result = await service.getAlbum('302127');

      expect(mockProvider.getAlbum).toHaveBeenCalledTimes(1);
      expect(mockRepo.upsertArtist).not.toHaveBeenCalled();
      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:album-preview:302127',
        JSON.stringify({ [trackFixture.deezerId]: trackFixture.previewUrl }),
        600,
      );
      expect(result.tracks[0]?.previewUrl).toBe(trackFixture.previewUrl);
    });

    it('cache hit (metadata + preview) — returns cached data without calling provider or repo', async () => {
      mockRedisGet({
        'catalog:album:302127': JSON.stringify(albumFixture),
        'catalog:album-preview:302127': JSON.stringify({
          [trackFixture.deezerId]: 'https://cached-fresh-preview.example.com',
        }),
      });

      const result = await service.getAlbum('302127');

      expect(mockProvider.getAlbum).not.toHaveBeenCalled();
      expect(mockRepo.upsertArtist).not.toHaveBeenCalled();
      expect(result.tracks[0]?.previewUrl).toBe(
        'https://cached-fresh-preview.example.com',
      );
    });

    it('an individual missing preview ("") does not change the whole album-batch TTL — unlike the single-track cache, a stale album batch always costs exactly one Deezer call to refresh, so there is no "cache the missing fact longer" fallback here', async () => {
      const albumWithNoPreview: CatalogAlbum = {
        ...albumFixture,
        tracks: [{ ...trackFixture, previewUrl: '' }],
      };
      mockRedisGet({});
      vi.mocked(mockProvider.getAlbum).mockResolvedValue(albumWithNoPreview);

      await service.getAlbum('302127');

      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:album-preview:302127',
        JSON.stringify({ [trackFixture.deezerId]: '' }),
        600,
      );
    });
  });

  describe('getTrack()', () => {
    it('cache miss (metadata + preview) — fetches from provider once, upserts artist and track, caches result', async () => {
      mockRedisGet({});
      vi.mocked(mockProvider.getTrack).mockResolvedValue(trackFixture);

      const result = await service.getTrack('3135556');

      expect(mockProvider.getTrack).toHaveBeenCalledTimes(1);
      expect(mockProvider.getTrack).toHaveBeenCalledWith('3135556');
      expect(mockRepo.upsertArtist).toHaveBeenCalledWith(trackFixture.artist);
      expect(mockRepo.findAlbumIdByDeezerId).toHaveBeenCalledWith('302127');
      expect(mockRepo.upsertTrack).toHaveBeenCalledWith(
        trackFixture,
        'uuid-artist-1',
        null,
      );
      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:track-preview:3135556',
        JSON.stringify({ previewUrl: trackFixture.previewUrl }),
        600,
      );
      expect(result).toEqual({
        ...trackFixture,
        previewUrl: trackFixture.previewUrl,
        reviewCount: 0,
        userRating: null,
      });
    });

    it('metadata cache hit + preview cache miss — refreshes only the preview via one extra provider call', async () => {
      mockRedisGet({ 'catalog:track:3135556': JSON.stringify(trackFixture) });
      vi.mocked(mockProvider.getTrack).mockResolvedValue(trackFixture);

      const result = await service.getTrack('3135556');

      expect(mockProvider.getTrack).toHaveBeenCalledTimes(1);
      expect(mockRepo.upsertArtist).not.toHaveBeenCalled();
      expect(result.previewUrl).toBe(trackFixture.previewUrl);
    });

    it('cache hit (metadata + preview) — returns cached data without calling provider or repo', async () => {
      mockRedisGet({
        'catalog:track:3135556': JSON.stringify(trackFixture),
        'catalog:track-preview:3135556': JSON.stringify({
          previewUrl: 'https://cached-fresh-preview.example.com',
        }),
      });

      const result = await service.getTrack('3135556');

      expect(mockProvider.getTrack).not.toHaveBeenCalled();
      expect(mockRepo.upsertArtist).not.toHaveBeenCalled();
      expect(result.previewUrl).toBe(
        'https://cached-fresh-preview.example.com',
      );
    });

    it('missing preview ("") is cached with the 24h fallback TTL, not the short one', async () => {
      mockRedisGet({});
      vi.mocked(mockProvider.getTrack).mockResolvedValue({
        ...trackFixture,
        previewUrl: '',
      });

      await service.getTrack('3135556');

      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:track-preview:3135556',
        JSON.stringify({ previewUrl: '' }),
        86_400,
      );
    });
  });

  describe('getArtist()', () => {
    it('cache miss — fetches from provider, upserts artist, caches result', async () => {
      mockRedis.get.mockResolvedValue(null);
      vi.mocked(mockProvider.getArtist).mockResolvedValue(artistFixture);

      const result = await service.getArtist('27');

      expect(mockProvider.getArtist).toHaveBeenCalledWith('27');
      expect(mockRepo.upsertArtist).toHaveBeenCalledWith(artistFixture);
      expect(result).toEqual({ ...artistFixture, reviewCount: 0 });
    });

    it('cache hit — returns cached artist without calling provider or repo', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify(artistFixture));

      const result = await service.getArtist('27');

      expect(mockProvider.getArtist).not.toHaveBeenCalled();
      expect(mockRepo.upsertArtist).not.toHaveBeenCalled();
      expect(result).toEqual({ ...artistFixture, reviewCount: 0 });
    });
  });

  describe('getArtistAlbums()', () => {
    const albumsPageFixture: CatalogPage<CatalogAlbum> = {
      items: [albumFixture],
      nextCursor: null,
      total: 1,
    };

    it('cache miss — calls provider and caches result', async () => {
      mockRedis.get.mockResolvedValue(null);
      vi.mocked(mockProvider.getArtistAlbums).mockResolvedValue(
        albumsPageFixture,
      );

      const result = await service.getArtistAlbums('27', 20, null);

      expect(mockProvider.getArtistAlbums).toHaveBeenCalledWith('27', 20, null);
      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:artist-albums:27:20:0',
        JSON.stringify(albumsPageFixture),
        86_400,
      );
      expect(result).toEqual(albumsPageFixture);
    });

    it('cache hit — returns cached albums without calling provider', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify(albumsPageFixture));

      const result = await service.getArtistAlbums('27', 20, null);

      expect(mockProvider.getArtistAlbums).not.toHaveBeenCalled();
      expect(result).toEqual(albumsPageFixture);
    });
  });

  describe('getArtistTracks()', () => {
    const dbTrackRowWithRelations = {
      ...dbTrackRow,
      artist: dbArtistRow,
      album: {
        deezerId: '302127',
        title: 'Discovery',
        coverUrl: 'https://example.com/discovery.jpg',
        releaseDate: new Date('2001-03-07'),
      },
    };

    it('cache miss — ensures artist is synced, queries Postgres, maps and caches result', async () => {
      mockRedis.get.mockResolvedValue(null);
      mockRepo.findTracksByArtist.mockResolvedValue({
        items: [dbTrackRowWithRelations],
        nextCursor: null,
        total: 1,
      });

      const result = await service.getArtistTracks('27', 20, null);

      expect(mockCatalogSyncService.ensureArtistSynced).toHaveBeenCalledWith(
        '27',
      );
      expect(mockRepo.findTracksByArtist).toHaveBeenCalledWith(
        'uuid-artist-1',
        null,
        20,
      );
      expect(result).toEqual({
        items: [
          {
            deezerId: '3135556',
            title: 'One More Time',
            artist: {
              deezerId: '27',
              name: 'Daft Punk',
              imageUrl: null,
              fans: 0,
              albumsCount: 0,
            },
            albumDeezerId: '302127',
            albumTitle: 'Discovery',
            coverUrl: 'https://example.com/discovery.jpg',
            releaseDate: '2001-03-07T00:00:00.000Z',
            durationMs: 320000,
            trackNumber: 1,
            previewUrl: null,
          },
        ],
        nextCursor: null,
        total: 1,
      });
      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:artist-tracks:27:20:0',
        JSON.stringify(result),
        86_400,
      );
    });

    it('cache hit — returns cached tracks without calling ensureArtistSynced', async () => {
      const cachedPage = {
        items: [],
        nextCursor: null,
        total: 0,
      };
      mockRedis.get.mockResolvedValue(JSON.stringify(cachedPage));

      const result = await service.getArtistTracks('27', 20, null);

      expect(mockCatalogSyncService.ensureArtistSynced).not.toHaveBeenCalled();
      expect(mockRepo.findTracksByArtist).not.toHaveBeenCalled();
      expect(result).toEqual(cachedPage);
    });
  });
});
