import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RedisService } from '../../redis/redis.service.js';
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
};

const trackFixture: CatalogTrack = {
  deezerId: '3135556',
  title: 'One More Time',
  artist: artistFixture,
  albumDeezerId: '302127',
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
};

const searchPageFixture: CatalogPage<CatalogSearchResult> = {
  items: [{ type: 'artist', item: artistFixture }],
  nextCursor: null,
  total: 1,
};

const dbArtistRow = { id: 'uuid-artist-1', deezerId: '27', name: 'Daft Punk', imageUrl: null, lastSyncedAt: new Date(), mbid: null };
const dbAlbumRow = { id: 'uuid-album-1', deezerId: '302127', title: 'Discovery', artistId: 'uuid-artist-1', coverUrl: null, releaseDate: null, genreLabel: null, lastSyncedAt: new Date(), mbid: null };
const dbTrackRow = { id: 'uuid-track-1', deezerId: '3135556', title: 'One More Time', artistId: 'uuid-artist-1', albumId: 'uuid-album-1', durationMs: 320000, trackNumber: 1, previewUrl: null, lastSyncedAt: new Date(), mbid: null };

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
  };

  const mockRedis = {
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
    exists: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    mockRepo.upsertArtist.mockResolvedValue(dbArtistRow);
    mockRepo.upsertAlbum.mockResolvedValue(dbAlbumRow);
    mockRepo.upsertTrack.mockResolvedValue(dbTrackRow);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        { provide: MUSIC_CATALOG_PROVIDER, useValue: mockProvider },
        { provide: CatalogRepository, useValue: mockRepo },
        { provide: RedisService, useValue: mockRedis },
      ],
    }).compile();

    service = module.get(CatalogService);
  });

  describe('search()', () => {
    it('cache miss — calls provider and caches result', async () => {
      mockRedis.get.mockResolvedValue(null);
      vi.mocked(mockProvider.search).mockResolvedValue(searchPageFixture);

      const result = await service.search('daft punk', 'artist', 20, null);

      expect(mockProvider.search).toHaveBeenCalledWith('daft punk', 'artist', 20, null);
      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:search:artist:daft punk:20:0',
        JSON.stringify(searchPageFixture),
        86_400,
      );
      expect(result).toEqual(searchPageFixture);
    });

    it('cache hit — returns cached data without calling provider', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify(searchPageFixture));

      const result = await service.search('daft punk', 'artist', 20, null);

      expect(mockProvider.search).not.toHaveBeenCalled();
      expect(mockRedis.set).not.toHaveBeenCalled();
      expect(result).toEqual(searchPageFixture);
    });
  });

  describe('getAlbum()', () => {
    it('cache miss — fetches from provider, upserts artist/album/tracks, caches result', async () => {
      mockRedis.get.mockResolvedValue(null);
      vi.mocked(mockProvider.getAlbum).mockResolvedValue(albumFixture);

      const result = await service.getAlbum('302127');

      expect(mockProvider.getAlbum).toHaveBeenCalledWith('302127');
      expect(mockRepo.upsertArtist).toHaveBeenCalledWith(artistFixture);
      expect(mockRepo.upsertAlbum).toHaveBeenCalledWith(albumFixture, 'uuid-artist-1');
      expect(mockRepo.upsertTrack).toHaveBeenCalledWith(trackFixture, 'uuid-artist-1', 'uuid-album-1');
      expect(mockRedis.set).toHaveBeenCalledWith(
        'catalog:album:302127',
        JSON.stringify(albumFixture),
        86_400,
      );
      expect(result).toEqual(albumFixture);
    });

    it('cache hit — returns cached album without calling provider or repo', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify(albumFixture));

      const result = await service.getAlbum('302127');

      expect(mockProvider.getAlbum).not.toHaveBeenCalled();
      expect(mockRepo.upsertArtist).not.toHaveBeenCalled();
      expect(result).toEqual(albumFixture);
    });
  });

  describe('getTrack()', () => {
    it('cache miss — fetches from provider, upserts artist and track, caches result', async () => {
      mockRedis.get.mockResolvedValue(null);
      vi.mocked(mockProvider.getTrack).mockResolvedValue(trackFixture);

      const result = await service.getTrack('3135556');

      expect(mockProvider.getTrack).toHaveBeenCalledWith('3135556');
      expect(mockRepo.upsertArtist).toHaveBeenCalledWith(trackFixture.artist);
      expect(mockRepo.upsertTrack).toHaveBeenCalledWith(trackFixture, 'uuid-artist-1', null);
      expect(result).toEqual(trackFixture);
    });

    it('cache hit — returns cached track without calling provider or repo', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify(trackFixture));

      const result = await service.getTrack('3135556');

      expect(mockProvider.getTrack).not.toHaveBeenCalled();
      expect(mockRepo.upsertArtist).not.toHaveBeenCalled();
      expect(result).toEqual(trackFixture);
    });
  });

  describe('getArtist()', () => {
    it('cache miss — fetches from provider, upserts artist, caches result', async () => {
      mockRedis.get.mockResolvedValue(null);
      vi.mocked(mockProvider.getArtist).mockResolvedValue(artistFixture);

      const result = await service.getArtist('27');

      expect(mockProvider.getArtist).toHaveBeenCalledWith('27');
      expect(mockRepo.upsertArtist).toHaveBeenCalledWith(artistFixture);
      expect(result).toEqual(artistFixture);
    });

    it('cache hit — returns cached artist without calling provider or repo', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify(artistFixture));

      const result = await service.getArtist('27');

      expect(mockProvider.getArtist).not.toHaveBeenCalled();
      expect(mockRepo.upsertArtist).not.toHaveBeenCalled();
      expect(result).toEqual(artistFixture);
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
      vi.mocked(mockProvider.getArtistAlbums).mockResolvedValue(albumsPageFixture);

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
});
