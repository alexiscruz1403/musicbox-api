import { Test, TestingModule } from '@nestjs/testing';
import { CatalogQuickSearchService } from './catalog-quick-search.service.js';
import { CatalogService } from './catalog.service.js';
import type { CatalogSearchResult } from './providers/music-catalog.provider.js';

const mockCatalog = {
  search: vi.fn(),
};

function artistResult(name: string, albumsCount: number): CatalogSearchResult {
  return {
    type: 'artist',
    item: {
      deezerId: name,
      name,
      imageUrl: null,
      fans: 0,
      albumsCount,
    },
  };
}

function albumResult(title: string): CatalogSearchResult {
  return {
    type: 'album',
    item: {
      deezerId: title,
      title,
      artist: {
        deezerId: 'a1',
        name: 'Daft Punk',
        imageUrl: null,
        fans: 0,
        albumsCount: 9,
      },
      coverUrl: 'https://example.com/cover.jpg',
      releaseDate: null,
      genreLabel: null,
      tracks: [],
      fans: 0,
    },
  };
}

function trackResult(title: string): CatalogSearchResult {
  return {
    type: 'track',
    item: {
      deezerId: title,
      title,
      artist: {
        deezerId: 'a1',
        name: 'Daft Punk',
        imageUrl: null,
        fans: 0,
        albumsCount: 9,
      },
      albumDeezerId: null,
      albumTitle: null,
      coverUrl: null,
      releaseDate: null,
      durationMs: null,
      trackNumber: null,
      previewUrl: null,
    },
  };
}

describe('CatalogQuickSearchService', () => {
  let service: CatalogQuickSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogQuickSearchService,
        { provide: CatalogService, useValue: mockCatalog },
      ],
    }).compile();

    service = module.get(CatalogQuickSearchService);
    vi.clearAllMocks();
  });

  it('interleaves artist/album/track results and caps at 5', async () => {
    mockCatalog.search.mockImplementation((_q: string, type: string) => {
      if (type === 'artist') {
        return Promise.resolve({
          items: [artistResult('Daft Punk', 9), artistResult('Air', 5)],
          nextCursor: null,
          total: 2,
        });
      }
      if (type === 'album') {
        return Promise.resolve({
          items: [albumResult('Discovery'), albumResult('Moon Safari')],
          nextCursor: null,
          total: 2,
        });
      }
      return Promise.resolve({
        items: [trackResult('One More Time'), trackResult('La Femme d’Argent')],
        nextCursor: null,
        total: 2,
      });
    });

    const result = await service.quickSearch('daft');

    expect(result).toHaveLength(5);
    expect(result.map((r) => r.type)).toEqual([
      'artist',
      'album',
      'track',
      'artist',
      'album',
    ]);
  });

  it('exposes albumsCount only on artist items', async () => {
    mockCatalog.search.mockImplementation((_q: string, type: string) => {
      if (type === 'artist') {
        return Promise.resolve({
          items: [artistResult('Daft Punk', 9)],
          nextCursor: null,
          total: 1,
        });
      }
      if (type === 'album') {
        return Promise.resolve({
          items: [albumResult('Discovery')],
          nextCursor: null,
          total: 1,
        });
      }
      return Promise.resolve({ items: [], nextCursor: null, total: 0 });
    });

    const result = await service.quickSearch('daft');

    const artistItem = result.find((r) => r.type === 'artist');
    const albumItem = result.find((r) => r.type === 'album');
    expect(artistItem).toMatchObject({ albumsCount: 9, artist: null });
    expect(albumItem).not.toHaveProperty('albumsCount');
  });

  it('includes the deezerId of each underlying item', async () => {
    mockCatalog.search.mockImplementation((_q: string, type: string) => {
      if (type === 'artist') {
        return Promise.resolve({
          items: [artistResult('Daft Punk', 9)],
          nextCursor: null,
          total: 1,
        });
      }
      if (type === 'album') {
        return Promise.resolve({
          items: [albumResult('Discovery')],
          nextCursor: null,
          total: 1,
        });
      }
      return Promise.resolve({
        items: [trackResult('One More Time')],
        nextCursor: null,
        total: 1,
      });
    });

    const result = await service.quickSearch('daft');

    expect(result.find((r) => r.type === 'artist')).toMatchObject({
      deezerId: 'Daft Punk',
    });
    expect(result.find((r) => r.type === 'album')).toMatchObject({
      deezerId: 'Discovery',
    });
    expect(result.find((r) => r.type === 'track')).toMatchObject({
      deezerId: 'One More Time',
    });
  });
});
