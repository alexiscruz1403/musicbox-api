import { Test, TestingModule } from '@nestjs/testing';
import { FollowSuggestionsRepository } from './follow-suggestions.repository.js';
import { FollowSuggestionsService } from './follow-suggestions.service.js';

const mockRepo = {
  getOwnReviewSignals: vi.fn(),
  getOwnLikeSignals: vi.fn(),
  findReviewsByAlbumIds: vi.fn(),
  findReviewsByTrackIds: vi.fn(),
  findReviewsByArtistIds: vi.fn(),
  findLikesByAlbumIds: vi.fn(),
  findLikesByTrackIds: vi.fn(),
  findLikesByArtistIds: vi.fn(),
  getFollowedIds: vi.fn(),
  findPopularUsers: vi.fn(),
  hydrateUsers: vi.fn(),
  getSnapshot: vi.fn(),
  upsertSnapshot: vi.fn(),
};

function noSignals() {
  mockRepo.getOwnReviewSignals.mockResolvedValue([]);
  mockRepo.getOwnLikeSignals.mockResolvedValue([]);
}

function noCandidates() {
  mockRepo.findReviewsByAlbumIds.mockResolvedValue([]);
  mockRepo.findReviewsByTrackIds.mockResolvedValue([]);
  mockRepo.findReviewsByArtistIds.mockResolvedValue([]);
  mockRepo.findLikesByAlbumIds.mockResolvedValue([]);
  mockRepo.findLikesByTrackIds.mockResolvedValue([]);
  mockRepo.findLikesByArtistIds.mockResolvedValue([]);
}

describe('FollowSuggestionsService', () => {
  let service: FollowSuggestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowSuggestionsService,
        { provide: FollowSuggestionsRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get(FollowSuggestionsService);
    vi.clearAllMocks();
    mockRepo.getFollowedIds.mockResolvedValue([]);
    mockRepo.findPopularUsers.mockResolvedValue([]);
    mockRepo.upsertSnapshot.mockResolvedValue({
      userId: 'u1',
      payload: [],
      generatedAt: new Date(),
    });
  });

  describe('recompute', () => {
    it('scores a candidate who reviewed the same album higher than one who only shares an artist', async () => {
      mockRepo.getOwnReviewSignals.mockResolvedValue([
        {
          albumId: 'album-1',
          trackId: null,
          album: { artistId: 'artist-1' },
          track: null,
        },
      ]);
      mockRepo.getOwnLikeSignals.mockResolvedValue([]);
      mockRepo.findReviewsByAlbumIds.mockResolvedValue([
        { userId: 'candidate-album', albumId: 'album-1' },
      ]);
      mockRepo.findReviewsByTrackIds.mockResolvedValue([]);
      mockRepo.findReviewsByArtistIds.mockResolvedValue([
        {
          userId: 'candidate-artist',
          album: { artistId: 'artist-1' },
          track: null,
        },
      ]);
      mockRepo.findLikesByAlbumIds.mockResolvedValue([]);
      mockRepo.findLikesByTrackIds.mockResolvedValue([]);
      mockRepo.findLikesByArtistIds.mockResolvedValue([]);

      await service.recompute('u1');

      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        { userId: string }[],
        Date,
      ];
      const albumCandidateIndex = payload.findIndex(
        (p) => p.userId === 'candidate-album',
      );
      const artistCandidateIndex = payload.findIndex(
        (p) => p.userId === 'candidate-artist',
      );
      expect(albumCandidateIndex).toBeGreaterThanOrEqual(0);
      expect(artistCandidateIndex).toBeGreaterThanOrEqual(0);
      expect(albumCandidateIndex).toBeLessThan(artistCandidateIndex);
    });

    it('dedupes a candidate who liked 2 different reviews of the same album into 1 match', async () => {
      mockRepo.getOwnReviewSignals.mockResolvedValue([]);
      mockRepo.getOwnLikeSignals.mockResolvedValue([
        {
          review: {
            albumId: 'album-1',
            trackId: null,
            album: { artistId: 'artist-1' },
            track: null,
          },
        },
      ]);
      noCandidates();
      mockRepo.findLikesByAlbumIds.mockResolvedValue([
        { userId: 'candidate-1', review: { albumId: 'album-1' } },
        { userId: 'candidate-1', review: { albumId: 'album-1' } },
      ]);
      mockRepo.findPopularUsers.mockResolvedValue([]);

      await service.recompute('u1');

      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        { userId: string }[],
        Date,
      ];
      // With the album-like weight (3) counted only once, candidate-1 should
      // appear exactly once in the ranked payload, not scored/ranked twice.
      expect(payload.filter((p) => p.userId === 'candidate-1')).toHaveLength(1);
    });

    it('excludes self and already-followed users from scoring', async () => {
      mockRepo.getFollowedIds.mockResolvedValue([{ followeeId: 'followed-1' }]);
      mockRepo.getOwnReviewSignals.mockResolvedValue([
        {
          albumId: 'album-1',
          trackId: null,
          album: { artistId: 'artist-1' },
          track: null,
        },
      ]);
      mockRepo.getOwnLikeSignals.mockResolvedValue([]);
      mockRepo.findReviewsByAlbumIds.mockResolvedValue([
        { userId: 'u1', albumId: 'album-1' },
        { userId: 'followed-1', albumId: 'album-1' },
        { userId: 'candidate-1', albumId: 'album-1' },
      ]);
      mockRepo.findReviewsByTrackIds.mockResolvedValue([]);
      mockRepo.findReviewsByArtistIds.mockResolvedValue([]);
      mockRepo.findLikesByAlbumIds.mockResolvedValue([]);
      mockRepo.findLikesByTrackIds.mockResolvedValue([]);
      mockRepo.findLikesByArtistIds.mockResolvedValue([]);

      await service.recompute('u1');

      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        { userId: string }[],
        Date,
      ];
      expect(payload.map((p) => p.userId)).toEqual(['candidate-1']);
    });

    it('fills remaining slots with findPopularUsers when fewer than 5 candidates are found', async () => {
      mockRepo.getFollowedIds.mockResolvedValue([]);
      mockRepo.getOwnReviewSignals.mockResolvedValue([
        {
          albumId: 'album-1',
          trackId: null,
          album: { artistId: 'artist-1' },
          track: null,
        },
      ]);
      mockRepo.getOwnLikeSignals.mockResolvedValue([]);
      mockRepo.findReviewsByAlbumIds.mockResolvedValue([
        { userId: 'candidate-1', albumId: 'album-1' },
      ]);
      mockRepo.findReviewsByTrackIds.mockResolvedValue([]);
      mockRepo.findReviewsByArtistIds.mockResolvedValue([]);
      mockRepo.findLikesByAlbumIds.mockResolvedValue([]);
      mockRepo.findLikesByTrackIds.mockResolvedValue([]);
      mockRepo.findLikesByArtistIds.mockResolvedValue([]);
      mockRepo.findPopularUsers.mockResolvedValue([
        { id: 'popular-1', handle: 'p1', displayName: 'P1', avatarUrl: null },
        { id: 'popular-2', handle: 'p2', displayName: 'P2', avatarUrl: null },
        { id: 'popular-3', handle: 'p3', displayName: 'P3', avatarUrl: null },
        { id: 'popular-4', handle: 'p4', displayName: 'P4', avatarUrl: null },
      ]);

      await service.recompute('u1');

      expect(mockRepo.findPopularUsers).toHaveBeenCalledWith(
        expect.arrayContaining(['u1', 'candidate-1']),
        4,
      );
      const [, payload] = mockRepo.upsertSnapshot.mock.calls[0] as [
        string,
        { userId: string }[],
        Date,
      ];
      expect(payload).toHaveLength(5);
      expect(payload.map((p) => p.userId)).toContain('candidate-1');
      expect(payload.map((p) => p.userId)).toContain('popular-1');
    });

    it('does not run any candidate query when the user has no signals', async () => {
      noSignals();

      await service.recompute('u1');

      expect(mockRepo.findReviewsByAlbumIds).toHaveBeenCalledWith([]);
      expect(mockRepo.findReviewsByTrackIds).toHaveBeenCalledWith([]);
      expect(mockRepo.findReviewsByArtistIds).toHaveBeenCalledWith([]);
    });
  });

  describe('getSuggestions', () => {
    it('computes lazily when no snapshot exists', async () => {
      mockRepo.getSnapshot.mockResolvedValue(null);
      noSignals();
      noCandidates();
      mockRepo.upsertSnapshot.mockResolvedValue({
        userId: 'u1',
        payload: [{ userId: 'popular-1' }],
        generatedAt: new Date(),
      });
      mockRepo.findPopularUsers.mockResolvedValue([
        { id: 'popular-1', handle: 'p1', displayName: 'P1', avatarUrl: null },
      ]);
      mockRepo.hydrateUsers.mockResolvedValue([
        { id: 'popular-1', handle: 'p1', displayName: 'P1', avatarUrl: null },
      ]);

      const result = await service.getSuggestions('u1');

      expect(mockRepo.upsertSnapshot).toHaveBeenCalled();
      expect(result.map((u) => u.id)).toContain('popular-1');
    });

    it('does not recompute when a snapshot already exists', async () => {
      mockRepo.getSnapshot.mockResolvedValue({
        userId: 'u1',
        payload: [{ userId: 'existing-1' }],
        generatedAt: new Date(),
      });
      mockRepo.hydrateUsers.mockResolvedValue([
        { id: 'existing-1', handle: 'e1', displayName: 'E1', avatarUrl: null },
      ]);
      mockRepo.findPopularUsers.mockResolvedValue([]);

      await service.getSuggestions('u1');

      expect(mockRepo.upsertSnapshot).not.toHaveBeenCalled();
    });

    it('re-filters users followed since the snapshot was generated and tops up at read time', async () => {
      mockRepo.getSnapshot.mockResolvedValue({
        userId: 'u1',
        payload: [{ userId: 'now-followed' }, { userId: 'still-suggested' }],
        generatedAt: new Date(),
      });
      mockRepo.getFollowedIds.mockResolvedValue([
        { followeeId: 'now-followed' },
      ]);
      mockRepo.hydrateUsers.mockResolvedValue([
        {
          id: 'still-suggested',
          handle: 's1',
          displayName: 'S1',
          avatarUrl: null,
        },
      ]);
      mockRepo.findPopularUsers.mockResolvedValue([
        { id: 'fill-1', handle: 'f1', displayName: 'F1', avatarUrl: null },
      ]);

      const result = await service.getSuggestions('u1');

      expect(mockRepo.hydrateUsers).toHaveBeenCalledWith(['still-suggested']);
      expect(result.map((u) => u.id)).toEqual(['still-suggested', 'fill-1']);
    });
  });
});
