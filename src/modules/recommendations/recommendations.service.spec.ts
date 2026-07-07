import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from '../catalog/catalog.service.js';
import { LastFmClient } from './lastfm/lastfm.client.js';
import { RecommendationsRepository } from './recommendations.repository.js';
import { RecommendationsService } from './recommendations.service.js';

const mockRepo = {
  countActiveReviews: vi.fn(),
  getFavoriteArtistSignals: vi.fn(),
  getGenreSignals: vi.fn(),
  getReviewedAlbumDeezerIds: vi.fn(),
  findAlbumsByGenres: vi.fn(),
  listUserIdsWithSnapshot: vi.fn(),
  getSnapshot: vi.fn(),
  upsertSnapshot: vi.fn(),
};

const mockCatalog = {
  search: vi.fn(),
  getArtistAlbums: vi.fn(),
  getAlbum: vi.fn(),
};

const mockLastFm = {
  getSimilarArtists: vi.fn(),
};

function noSignals() {
  mockRepo.getFavoriteArtistSignals.mockResolvedValue([]);
  mockRepo.getGenreSignals.mockResolvedValue([]);
  mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([]);
}

function artistFixture(deezerId: string, name: string, fans = 0) {
  return { deezerId, name, imageUrl: null, fans };
}

function albumFixture(
  deezerId: string,
  title: string,
  artist: ReturnType<typeof artistFixture>,
  genreLabel: string | null = null,
  fans = 0,
) {
  return {
    deezerId,
    title,
    artist,
    coverUrl: null,
    releaseDate: null,
    genreLabel,
    tracks: [],
    fans,
  };
}

describe('RecommendationsService', () => {
  let service: RecommendationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecommendationsService,
        { provide: RecommendationsRepository, useValue: mockRepo },
        { provide: CatalogService, useValue: mockCatalog },
        { provide: LastFmClient, useValue: mockLastFm },
      ],
    }).compile();

    service = module.get(RecommendationsService);
    vi.clearAllMocks();
    mockRepo.findAlbumsByGenres.mockResolvedValue([]);
    mockRepo.upsertSnapshot.mockImplementation(
      (userId: string, payload: unknown, generatedAt: Date) =>
        Promise.resolve({ userId, payload, generatedAt }),
    );
  });

  describe('getRecommendations', () => {
    it('returns null when the user has fewer than 3 active reviews', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(2);

      const result = await service.getRecommendations('u1');

      expect(result).toBeNull();
      expect(mockRepo.getSnapshot).not.toHaveBeenCalled();
    });

    it('computes lazily (cold start) when the user qualifies but has no snapshot', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      mockRepo.getSnapshot.mockResolvedValue(null);
      noSignals();

      const result = await service.getRecommendations('u1');

      expect(mockRepo.upsertSnapshot).toHaveBeenCalled();
      expect(result).not.toBeNull();
      expect(result?.recommendations).toEqual([]);
    });

    it('does not recompute when a snapshot already exists', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      const generatedAt = new Date('2026-01-01T03:00:00Z');
      mockRepo.getSnapshot.mockResolvedValue({
        userId: 'u1',
        payload: [
          {
            deezerId: 'd1',
            type: 'album',
            title: 'OK Computer',
            artistName: 'Radiohead',
            coverUrl: null,
            reason: 'SIMILAR_ARTIST',
            reasonLabel: 'Porque reseñaste a Radiohead',
          },
        ],
        generatedAt,
      });
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([]);

      const result = await service.getRecommendations('u1');

      expect(mockRepo.upsertSnapshot).not.toHaveBeenCalled();
      expect(result?.generatedAt).toBe(generatedAt);
      expect(result?.recommendations).toHaveLength(1);
    });

    it('re-filters albums reviewed since the snapshot was generated, without recomputing', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      mockRepo.getSnapshot.mockResolvedValue({
        userId: 'u1',
        payload: [
          {
            deezerId: 'd1',
            type: 'album',
            title: 'Already reviewed since',
            artistName: 'A',
            coverUrl: null,
            reason: 'SIMILAR_ARTIST',
            reasonLabel: 'x',
          },
          {
            deezerId: 'd2',
            type: 'album',
            title: 'Still fresh',
            artistName: 'B',
            coverUrl: null,
            reason: 'GENRE_MATCH',
            reasonLabel: 'y',
          },
        ],
        generatedAt: new Date(),
      });
      // The user has since reviewed d1 (directly as an ALBUM review).
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([
        { album: { deezerId: 'd1' }, track: null },
      ]);

      const result = await service.getRecommendations('u1');

      expect(mockRepo.upsertSnapshot).not.toHaveBeenCalled();
      expect(result?.recommendations.map((r) => r.deezerId)).toEqual(['d2']);
    });
  });

  describe('recompute', () => {
    it('keeps the existing snapshot untouched when the user has dropped below the review threshold', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(1);
      const existing = {
        userId: 'u1',
        payload: [],
        generatedAt: new Date(),
      };
      mockRepo.getSnapshot.mockResolvedValue(existing);

      const result = await service.recompute('u1');

      expect(result).toBe(existing);
      expect(mockRepo.upsertSnapshot).not.toHaveBeenCalled();
    });

    it('queries Last.fm for each favorite artist (reviews rated >=7) and tags SIMILAR_ARTIST candidates', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      mockRepo.getFavoriteArtistSignals.mockResolvedValue([
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
      ]);
      mockRepo.getGenreSignals.mockResolvedValue([]);
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([]);
      mockLastFm.getSimilarArtists.mockResolvedValue([{ name: 'Thom Yorke' }]);
      mockCatalog.search.mockResolvedValue({
        items: [
          { type: 'artist', item: artistFixture('a2', 'Thom Yorke', 100) },
        ],
        nextCursor: null,
        total: 1,
      });
      mockCatalog.getArtistAlbums.mockResolvedValue({
        items: [
          albumFixture(
            'd1',
            'Anima',
            artistFixture('a2', 'Thom Yorke', 100),
            'Rock',
            500,
          ),
        ],
        nextCursor: null,
        total: 1,
      });

      await service.recompute('u1');

      expect(mockLastFm.getSimilarArtists).toHaveBeenCalledWith(
        'Radiohead',
        expect.any(Number),
      );
      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        Array<{ deezerId: string; reason: string; reasonLabel: string }>,
        Date,
      ];
      expect(payload).toEqual([
        expect.objectContaining({
          deezerId: 'd1',
          reason: 'SIMILAR_ARTIST',
          reasonLabel: 'Porque reseñaste a Radiohead',
        }),
      ]);
    });

    it('treats a single well-rated review as a valid similar-artist seed (regression: 3 reviews of 3 distinct artists must not fall back to genre-only)', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      // Only ONE review of this artist — previously required >=2 to qualify.
      mockRepo.getFavoriteArtistSignals.mockResolvedValue([
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
      ]);
      mockRepo.getGenreSignals.mockResolvedValue([]);
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([]);
      mockLastFm.getSimilarArtists.mockResolvedValue([
        { name: 'Thom Yorke' },
        { name: 'The Strokes' },
        { name: 'Muse' },
        { name: 'Atoms For Peace' },
        { name: 'Jeff Buckley' },
      ]);
      mockCatalog.search.mockImplementation((query: string) =>
        Promise.resolve({
          items: [
            { type: 'artist', item: artistFixture(`id-${query}`, query) },
          ],
          nextCursor: null,
          total: 1,
        }),
      );
      mockCatalog.getArtistAlbums.mockImplementation((deezerId: string) =>
        Promise.resolve({
          items: [
            albumFixture(
              `${deezerId}-a1`,
              'Album 1',
              artistFixture(deezerId, deezerId),
            ),
            albumFixture(
              `${deezerId}-a2`,
              'Album 2',
              artistFixture(deezerId, deezerId),
            ),
          ],
          nextCursor: null,
          total: 2,
        }),
      );

      await service.recompute('u1');

      expect(mockLastFm.getSimilarArtists).toHaveBeenCalledWith(
        'Radiohead',
        expect.any(Number),
      );
      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        Array<{ deezerId: string; reason: string }>,
        Date,
      ];
      // 5 similar artists x 2 albums each (diversity cap) = 10 candidates.
      expect(payload).toHaveLength(10);
      expect(payload.every((p) => p.reason === 'SIMILAR_ARTIST')).toBe(true);
    });

    it('falls back to genre matches when there are no favorite artists', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      mockRepo.getFavoriteArtistSignals.mockResolvedValue([]);
      mockRepo.getGenreSignals.mockResolvedValue([
        { album: { genreLabel: 'Rock' }, track: null },
      ]);
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([]);
      mockRepo.findAlbumsByGenres.mockResolvedValue([
        {
          deezerId: 'd2',
          genreLabel: 'Rock',
          artist: { deezerId: 'a3', name: 'Radiohead' },
        },
      ]);
      mockCatalog.getAlbum.mockResolvedValue(
        albumFixture(
          'd2',
          'OK Computer',
          artistFixture('a3', 'Radiohead', 200),
          'Rock',
          900,
        ),
      );

      await service.recompute('u1');

      expect(mockRepo.findAlbumsByGenres).toHaveBeenCalledWith(
        ['Rock'],
        [],
        expect.any(Number),
      );
      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        Array<{ deezerId: string; reason: string; reasonLabel: string }>,
        Date,
      ];
      expect(payload).toEqual([
        expect.objectContaining({
          deezerId: 'd2',
          reason: 'GENRE_MATCH',
          reasonLabel: 'Porque te gusta el género Rock',
        }),
      ]);
    });

    it('excludes albums the user already reviewed', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      mockRepo.getFavoriteArtistSignals.mockResolvedValue([
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
      ]);
      mockRepo.getGenreSignals.mockResolvedValue([]);
      // Already reviewed d1 (via a TRACK review whose track belongs to album d1).
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([
        { album: null, track: { album: { deezerId: 'd1' } } },
      ]);
      mockLastFm.getSimilarArtists.mockResolvedValue([{ name: 'Thom Yorke' }]);
      mockCatalog.search.mockResolvedValue({
        items: [
          { type: 'artist', item: artistFixture('a2', 'Thom Yorke', 100) },
        ],
        nextCursor: null,
        total: 1,
      });
      mockCatalog.getArtistAlbums.mockResolvedValue({
        items: [
          albumFixture('d1', 'Anima', artistFixture('a2', 'Thom Yorke', 100)),
        ],
        nextCursor: null,
        total: 1,
      });

      await service.recompute('u1');

      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        Array<{ deezerId: string }>,
        Date,
      ];
      expect(payload).toEqual([]);
    });

    it('caps recommendations per artist for diversity', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      mockRepo.getFavoriteArtistSignals.mockResolvedValue([
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
      ]);
      mockRepo.getGenreSignals.mockResolvedValue([]);
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([]);
      mockLastFm.getSimilarArtists.mockResolvedValue([{ name: 'Thom Yorke' }]);
      const similarArtist = artistFixture('a2', 'Thom Yorke', 100);
      mockCatalog.search.mockResolvedValue({
        items: [{ type: 'artist', item: similarArtist }],
        nextCursor: null,
        total: 1,
      });
      mockCatalog.getArtistAlbums.mockResolvedValue({
        items: [
          albumFixture('d1', 'Album 1', similarArtist),
          albumFixture('d2', 'Album 2', similarArtist),
          albumFixture('d3', 'Album 3', similarArtist),
        ],
        nextCursor: null,
        total: 3,
      });

      await service.recompute('u1');

      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        Array<{ deezerId: string }>,
        Date,
      ];
      expect(payload).toHaveLength(2);
    });

    it('orders SIMILAR_ARTIST candidates before GENRE_MATCH regardless of fan count', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      mockRepo.getFavoriteArtistSignals.mockResolvedValue([
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
      ]);
      mockRepo.getGenreSignals.mockResolvedValue([
        { album: { genreLabel: 'Rock' }, track: null },
      ]);
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([]);
      mockLastFm.getSimilarArtists.mockResolvedValue([{ name: 'Thom Yorke' }]);
      mockCatalog.search.mockResolvedValue({
        items: [
          { type: 'artist', item: artistFixture('a2', 'Thom Yorke', 10) },
        ],
        nextCursor: null,
        total: 1,
      });
      // Low fan count for the similar-artist candidate...
      mockCatalog.getArtistAlbums.mockResolvedValue({
        items: [
          albumFixture(
            'd1',
            'Anima',
            artistFixture('a2', 'Thom Yorke', 10),
            null,
            10,
          ),
        ],
        nextCursor: null,
        total: 1,
      });
      mockRepo.findAlbumsByGenres.mockResolvedValue([
        {
          deezerId: 'd2',
          genreLabel: 'Rock',
          artist: { deezerId: 'a3', name: 'Someone Popular' },
        },
      ]);
      // ...much higher fan count for the genre-match candidate.
      mockCatalog.getAlbum.mockResolvedValue(
        albumFixture(
          'd2',
          'OK Computer',
          artistFixture('a3', 'Someone Popular', 99999),
          'Rock',
          99999,
        ),
      );

      await service.recompute('u1');

      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        Array<{ deezerId: string; reason: string }>,
        Date,
      ];
      expect(payload.map((p) => p.deezerId)).toEqual(['d1', 'd2']);
    });

    it("does not let one favorite artist's Last.fm failure abort the rest", async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      mockRepo.getFavoriteArtistSignals.mockResolvedValue([
        {
          album: { artistId: 'artist-1', artist: { name: 'Broken Artist' } },
          track: null,
        },
        {
          album: { artistId: 'artist-1', artist: { name: 'Broken Artist' } },
          track: null,
        },
        {
          album: { artistId: 'artist-2', artist: { name: 'Working Artist' } },
          track: null,
        },
        {
          album: { artistId: 'artist-2', artist: { name: 'Working Artist' } },
          track: null,
        },
      ]);
      mockRepo.getGenreSignals.mockResolvedValue([]);
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([]);
      mockLastFm.getSimilarArtists.mockImplementation((name: string) => {
        if (name === 'Broken Artist') return Promise.reject(new Error('boom'));
        return Promise.resolve([{ name: 'Similar To Working' }]);
      });
      mockCatalog.search.mockResolvedValue({
        items: [
          { type: 'artist', item: artistFixture('a2', 'Similar To Working') },
        ],
        nextCursor: null,
        total: 1,
      });
      mockCatalog.getArtistAlbums.mockResolvedValue({
        items: [
          albumFixture(
            'd1',
            'Some Album',
            artistFixture('a2', 'Similar To Working'),
          ),
        ],
        nextCursor: null,
        total: 1,
      });

      await service.recompute('u1');

      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        Array<{ deezerId: string }>,
        Date,
      ];
      expect(payload.map((p) => p.deezerId)).toEqual(['d1']);
    });

    it('skips a similar artist with no Deezer match without breaking the rest', async () => {
      mockRepo.countActiveReviews.mockResolvedValue(3);
      mockRepo.getFavoriteArtistSignals.mockResolvedValue([
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
        {
          album: { artistId: 'artist-1', artist: { name: 'Radiohead' } },
          track: null,
        },
      ]);
      mockRepo.getGenreSignals.mockResolvedValue([]);
      mockRepo.getReviewedAlbumDeezerIds.mockResolvedValue([]);
      mockLastFm.getSimilarArtists.mockResolvedValue([
        { name: 'Unknown To Deezer' },
        { name: 'Thom Yorke' },
      ]);
      mockCatalog.search.mockImplementation((query: string) => {
        if (query === 'Unknown To Deezer') {
          return Promise.resolve({ items: [], nextCursor: null, total: 0 });
        }
        return Promise.resolve({
          items: [{ type: 'artist', item: artistFixture('a2', 'Thom Yorke') }],
          nextCursor: null,
          total: 1,
        });
      });
      mockCatalog.getArtistAlbums.mockResolvedValue({
        items: [albumFixture('d1', 'Anima', artistFixture('a2', 'Thom Yorke'))],
        nextCursor: null,
        total: 1,
      });

      await service.recompute('u1');

      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        Array<{ deezerId: string }>,
        Date,
      ];
      expect(payload.map((p) => p.deezerId)).toEqual(['d1']);
    });
  });
});
