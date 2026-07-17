import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogHistoryRepository } from './catalog-history.repository.js';
import { CatalogHistoryService } from './catalog-history.service.js';
import { CatalogService } from './catalog.service.js';
import type {
  CatalogAlbum,
  CatalogArtist,
  CatalogTrack,
} from './providers/music-catalog.provider.js';

const mockRepo = {
  upsertSearchHistory: vi.fn(),
  listSearchHistory: vi.fn(),
  deleteSearchHistoryItem: vi.fn(),
  deleteAllSearchHistory: vi.fn(),
  upsertRecentlyViewed: vi.fn(),
  listRecentlyViewed: vi.fn(),
};

const mockCatalog = {
  getAlbum: vi.fn(),
  getTrack: vi.fn(),
};

const mockArtistDetail = {
  getDetail: vi.fn(),
};

const artistFixture: CatalogArtist = {
  deezerId: '27',
  name: 'Daft Punk',
  imageUrl: 'https://example.com/daft-punk.jpg',
  fans: 1000,
  albumsCount: 9,
};

const albumFixture: CatalogAlbum = {
  deezerId: '302127',
  title: 'Discovery',
  artist: artistFixture,
  coverUrl: 'https://example.com/discovery.jpg',
  releaseDate: '2001-03-07',
  genreLabel: 'Electronica',
  tracks: [],
  fans: 50000,
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

describe('CatalogHistoryService', () => {
  let service: CatalogHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogHistoryService,
        { provide: CatalogHistoryRepository, useValue: mockRepo },
        { provide: CatalogService, useValue: mockCatalog },
        { provide: ArtistDetailService, useValue: mockArtistDetail },
      ],
    }).compile();

    service = module.get(CatalogHistoryService);
    vi.clearAllMocks();
  });

  describe('recordSearch', () => {
    it('upserts by query only, with no type differentiation', async () => {
      mockRepo.upsertSearchHistory.mockResolvedValue({});
      await service.recordSearch('user-1', 'radiohead');
      expect(mockRepo.upsertSearchHistory).toHaveBeenCalledWith(
        'user-1',
        'radiohead',
      );
    });

    it('swallows repository errors instead of throwing', async () => {
      mockRepo.upsertSearchHistory.mockRejectedValue(new Error('db down'));
      await expect(
        service.recordSearch('user-1', 'radiohead'),
      ).resolves.toBeUndefined();
    });
  });

  describe('deleteSearchHistoryItem', () => {
    it('throws NotFoundException when nothing was deleted', async () => {
      mockRepo.deleteSearchHistoryItem.mockResolvedValue(false);
      await expect(
        service.deleteSearchHistoryItem('user-1', 'missing-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('resolves when the item was deleted', async () => {
      mockRepo.deleteSearchHistoryItem.mockResolvedValue(true);
      await expect(
        service.deleteSearchHistoryItem('user-1', 'item-1'),
      ).resolves.toBeUndefined();
    });
  });

  describe('recordAlbumView', () => {
    it('records resourceType ALBUM with the album own data, not nested track data', async () => {
      mockRepo.upsertRecentlyViewed.mockResolvedValue({});
      await service.recordAlbumView('user-1', albumFixture);
      expect(mockRepo.upsertRecentlyViewed).toHaveBeenCalledWith(
        'user-1',
        'ALBUM',
        '302127',
        {
          title: 'Discovery',
          artistName: 'Daft Punk',
          coverUrl: albumFixture.coverUrl,
          albumsCount: null,
        },
      );
    });

    it('swallows repository errors instead of throwing', async () => {
      mockRepo.upsertRecentlyViewed.mockRejectedValue(new Error('db down'));
      await expect(
        service.recordAlbumView('user-1', albumFixture),
      ).resolves.toBeUndefined();
    });
  });

  describe('recordTrackView', () => {
    it('records resourceType TRACK with the track own data, not its parent album', async () => {
      mockRepo.upsertRecentlyViewed.mockResolvedValue({});
      await service.recordTrackView('user-1', trackFixture);
      expect(mockRepo.upsertRecentlyViewed).toHaveBeenCalledWith(
        'user-1',
        'TRACK',
        '3135556',
        {
          title: 'One More Time',
          artistName: 'Daft Punk',
          coverUrl: trackFixture.coverUrl,
          albumsCount: null,
        },
      );
    });

    it('swallows repository errors instead of throwing', async () => {
      mockRepo.upsertRecentlyViewed.mockRejectedValue(new Error('db down'));
      await expect(
        service.recordTrackView('user-1', trackFixture),
      ).resolves.toBeUndefined();
    });
  });

  describe('recordArtistView', () => {
    it('records resourceType ARTIST with the artist own data and albumsCount', async () => {
      mockRepo.upsertRecentlyViewed.mockResolvedValue({});
      await service.recordArtistView('user-1', artistFixture);
      expect(mockRepo.upsertRecentlyViewed).toHaveBeenCalledWith(
        'user-1',
        'ARTIST',
        '27',
        {
          title: 'Daft Punk',
          artistName: null,
          coverUrl: artistFixture.imageUrl,
          albumsCount: 9,
        },
      );
    });

    it('swallows repository errors instead of throwing', async () => {
      mockRepo.upsertRecentlyViewed.mockRejectedValue(new Error('db down'));
      await expect(
        service.recordArtistView('user-1', artistFixture),
      ).resolves.toBeUndefined();
    });
  });

  describe('getRecentlyViewedDetails', () => {
    it('hydrates each item with full detail via the matching catalog service, keyed by resourceType', async () => {
      mockRepo.listRecentlyViewed.mockResolvedValue([
        { resourceType: 'ALBUM', deezerId: '302127', viewedAt: new Date(0) },
        { resourceType: 'TRACK', deezerId: '3135556', viewedAt: new Date(1) },
        { resourceType: 'ARTIST', deezerId: '27', viewedAt: new Date(2) },
      ]);
      mockCatalog.getAlbum.mockResolvedValue(albumFixture);
      mockCatalog.getTrack.mockResolvedValue(trackFixture);
      mockArtistDetail.getDetail.mockResolvedValue({ artist: artistFixture });

      const result = await service.getRecentlyViewedDetails('user-1');

      expect(mockCatalog.getAlbum).toHaveBeenCalledWith('302127');
      expect(mockCatalog.getTrack).toHaveBeenCalledWith('3135556');
      expect(mockArtistDetail.getDetail).toHaveBeenCalledWith('27');
      expect(result).toEqual([
        {
          resourceType: 'ALBUM',
          deezerId: '302127',
          viewedAt: new Date(0),
          detail: albumFixture,
          error: null,
        },
        {
          resourceType: 'TRACK',
          deezerId: '3135556',
          viewedAt: new Date(1),
          detail: trackFixture,
          error: null,
        },
        {
          resourceType: 'ARTIST',
          deezerId: '27',
          viewedAt: new Date(2),
          detail: { artist: artistFixture },
          error: null,
        },
      ]);
    });

    it('isolates a per-item failure instead of failing the whole bundle', async () => {
      mockRepo.listRecentlyViewed.mockResolvedValue([
        { resourceType: 'ALBUM', deezerId: 'gone', viewedAt: new Date(0) },
        { resourceType: 'TRACK', deezerId: '3135556', viewedAt: new Date(1) },
      ]);
      mockCatalog.getAlbum.mockRejectedValue(
        new NotFoundException('Deezer: no data (code 800)'),
      );
      mockCatalog.getTrack.mockResolvedValue(trackFixture);

      const result = await service.getRecentlyViewedDetails('user-1');

      expect(result[0]).toMatchObject({
        detail: null,
        error: { code: 'NOT_FOUND' },
      });
      expect(result[1]).toMatchObject({ detail: trackFixture, error: null });
    });

    it('does not re-record a view for any hydrated item', async () => {
      mockRepo.listRecentlyViewed.mockResolvedValue([
        { resourceType: 'ALBUM', deezerId: '302127', viewedAt: new Date(0) },
      ]);
      mockCatalog.getAlbum.mockResolvedValue(albumFixture);

      await service.getRecentlyViewedDetails('user-1');

      expect(mockRepo.upsertRecentlyViewed).not.toHaveBeenCalled();
    });
  });
});
