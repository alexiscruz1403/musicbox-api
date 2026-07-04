import { Test, TestingModule } from '@nestjs/testing';
import { SocialService } from '../social/social.service.js';
import { encodeAllCursor, encodeFollowedCursor } from './feed-cursor.util.js';
import { FeedRepository } from './feed.repository.js';
import { FeedService } from './feed.service.js';

const mockRepo = {
  listFeed: vi.fn(),
  getFollowedIds: vi.fn(),
  getOwnReviewSignals: vi.fn(),
  getTodaysCandidateIds: vi.fn(),
  countLikesByReviewIds: vi.fn(),
  countCommentsByReviewIds: vi.fn(),
  findSimilarReviews: vi.fn(),
  findTrendingReviews: vi.fn(),
  findRandomReviews: vi.fn(),
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

function review(id: string) {
  return { id, description: `review ${id}` };
}

describe('FeedService', () => {
  let service: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedService,
        { provide: FeedRepository, useValue: mockRepo },
        { provide: SocialService, useValue: mockSocial },
      ],
    }).compile();

    service = module.get(FeedService);
    vi.clearAllMocks();
    mockSocial.getReviewStats.mockImplementation((ids: string[]) =>
      Promise.resolve(new Map(ids.map((id) => [id, { ...defaultStats }]))),
    );
    mockRepo.getFollowedIds.mockResolvedValue([]);
    mockRepo.getOwnReviewSignals.mockResolvedValue([]);
    mockRepo.getTodaysCandidateIds.mockResolvedValue([]);
    mockRepo.countLikesByReviewIds.mockResolvedValue([]);
    mockRepo.countCommentsByReviewIds.mockResolvedValue([]);
    mockRepo.findSimilarReviews.mockResolvedValue([]);
    mockRepo.findTrendingReviews.mockResolvedValue([]);
    mockRepo.findRandomReviews.mockResolvedValue([]);
  });

  describe('mode branching', () => {
    it('defaults to FOLLOWED mode (calls listFeed only)', async () => {
      mockRepo.listFeed.mockResolvedValue({ items: [], nextCursor: null });
      await service.getFeed('u1', {
        type: 'FOLLOWED',
        cursor: 'abc',
        limit: 20,
      });
      expect(mockRepo.listFeed).toHaveBeenCalledWith('u1', 'abc', 20);
      expect(mockRepo.findSimilarReviews).not.toHaveBeenCalled();
    });

    it('ALL mode never calls listFeed', async () => {
      await service.getFeed('u1', { type: 'ALL', limit: 20 });
      expect(mockRepo.listFeed).not.toHaveBeenCalled();
    });
  });

  describe('FOLLOWED mode (unchanged behavior)', () => {
    it('forwards cursor and limit to the repository', async () => {
      mockRepo.listFeed.mockResolvedValue({ items: [], nextCursor: null });
      await service.getFeed('u1', {
        type: 'FOLLOWED',
        cursor: 'abc',
        limit: 20,
      });
      expect(mockRepo.listFeed).toHaveBeenCalledWith('u1', 'abc', 20);
    });

    it('merges stats onto each item, using the requester as viewer', async () => {
      const r = review('r1');
      mockRepo.listFeed.mockResolvedValue({ items: [r], nextCursor: 'next' });
      mockSocial.getReviewStats.mockResolvedValue(
        new Map([
          ['r1', { ...defaultStats, likesCount: 4, userReaction: 'LIKE' }],
        ]),
      );

      const result = await service.getFeed('u1', {
        type: 'FOLLOWED',
        cursor: undefined,
        limit: 20,
      });

      expect(mockSocial.getReviewStats).toHaveBeenCalledWith(['r1'], 'u1');
      expect(result).toEqual({
        items: [{ ...r, ...defaultStats, likesCount: 4, userReaction: 'LIKE' }],
        nextCursor: 'next',
      });
    });

    it('returns an empty feed when the user follows no one', async () => {
      mockRepo.listFeed.mockResolvedValue({ items: [], nextCursor: null });
      const result = await service.getFeed('u1', {
        type: 'FOLLOWED',
        cursor: undefined,
        limit: 20,
      });
      expect(result).toEqual({ items: [], nextCursor: null });
    });
  });

  describe('ALL mode', () => {
    it('fills the page from a single phase and never calls later phases', async () => {
      mockRepo.findSimilarReviews.mockResolvedValue([
        review('s1'),
        review('s2'),
      ]);
      const result = await service.getFeed('u1', { type: 'ALL', limit: 2 });

      expect(result.items.map((i) => i.id)).toEqual(['s1', 's2']);
      expect(mockRepo.findTrendingReviews).not.toHaveBeenCalled();
      expect(mockRepo.findRandomReviews).not.toHaveBeenCalled();
    });

    it('cascades into the next phase within one call when a phase runs short', async () => {
      // Similar has only 1 row (of a requested 4: limit=3 -> take=4), so it's
      // "exhausted" (1 <= 3) and the loop must advance to Trending for the rest.
      mockRepo.findSimilarReviews.mockResolvedValue([review('s1')]);
      mockRepo.findTrendingReviews.mockResolvedValue([
        review('t1'),
        review('t2'),
      ]);

      const result = await service.getFeed('u1', { type: 'ALL', limit: 3 });

      expect(result.items.map((i) => i.id)).toEqual(['s1', 't1', 't2']);
      expect(mockRepo.findSimilarReviews).toHaveBeenCalledWith(
        expect.objectContaining({ cursorId: undefined, take: 4 }),
      );
      expect(mockRepo.findTrendingReviews).toHaveBeenCalledWith(
        expect.objectContaining({ cursorId: undefined, take: 3 }),
      );
    });

    it('falls through an empty trending pool straight to random, in the same call', async () => {
      mockRepo.findSimilarReviews.mockResolvedValue([]);
      mockRepo.findTrendingReviews.mockResolvedValue([]);
      mockRepo.findRandomReviews.mockResolvedValue([review('r1')]);

      const result = await service.getFeed('u1', { type: 'ALL', limit: 5 });

      expect(result.items.map((i) => i.id)).toEqual(['r1']);
    });

    it('exact-boundary: a phase yields precisely `remaining` rows and still points nextCursor at the next phase', async () => {
      // limit=2 -> take=2, so findSimilarReviews is asked for take:3. It
      // resolves exactly 2 rows (not 3), which must be treated as "exhausted"
      // (2 > 2 is false) even though the page is now exactly full.
      mockRepo.findSimilarReviews.mockResolvedValue([
        review('s1'),
        review('s2'),
      ]);

      const result = await service.getFeed('u1', { type: 'ALL', limit: 2 });

      expect(result.items.map((i) => i.id)).toEqual(['s1', 's2']);
      expect(result.nextCursor).not.toBeNull();
      const decoded: unknown = JSON.parse(
        Buffer.from(result.nextCursor!, 'base64').toString('utf8'),
      );
      expect(decoded).toEqual({ phase: 'T', id: undefined });
    });

    it('returns nextCursor null only when all 3 phases combined are exhausted', async () => {
      mockRepo.findSimilarReviews.mockResolvedValue([review('s1')]);
      mockRepo.findTrendingReviews.mockResolvedValue([]);
      mockRepo.findRandomReviews.mockResolvedValue([]);

      const result = await service.getFeed('u1', { type: 'ALL', limit: 5 });

      expect(result.items.map((i) => i.id)).toEqual(['s1']);
      expect(result.nextCursor).toBeNull();
    });

    it('computes followedIds/signals/trending exactly once per call, even across all 3 phases', async () => {
      mockRepo.findSimilarReviews.mockResolvedValue([review('s1')]);
      mockRepo.findTrendingReviews.mockResolvedValue([review('t1')]);
      mockRepo.findRandomReviews.mockResolvedValue([review('r1')]);
      mockRepo.getTodaysCandidateIds.mockResolvedValue(['t1']);

      await service.getFeed('u1', { type: 'ALL', limit: 3 });

      expect(mockRepo.getFollowedIds).toHaveBeenCalledTimes(1);
      expect(mockRepo.getOwnReviewSignals).toHaveBeenCalledTimes(1);
      expect(mockRepo.getTodaysCandidateIds).toHaveBeenCalledTimes(1);
    });

    it('resumes at the correct phase/id from a previously-encoded cursor', async () => {
      mockRepo.findTrendingReviews.mockResolvedValue([review('t2')]);
      const cursor = encodeAllCursor({ phase: 'T', id: 't1' });

      await service.getFeed('u1', { type: 'ALL', cursor, limit: 5 });

      expect(mockRepo.findSimilarReviews).not.toHaveBeenCalled();
      expect(mockRepo.findTrendingReviews).toHaveBeenCalledWith(
        expect.objectContaining({ cursorId: 't1', take: 6 }),
      );
    });

    it('treats a mismatched-mode (FOLLOWED-style) cursor as a fresh start without throwing', async () => {
      const followedStyleCursor = encodeFollowedCursor(
        '3f6a1e2b-8c4d-4b7a-9e2f-1a2b3c4d5e6f',
      );
      mockRepo.findSimilarReviews.mockResolvedValue([review('s1')]);

      await expect(
        service.getFeed('u1', {
          type: 'ALL',
          cursor: followedStyleCursor,
          limit: 5,
        }),
      ).resolves.toBeDefined();

      expect(mockRepo.findSimilarReviews).toHaveBeenCalledWith(
        expect.objectContaining({ cursorId: undefined }),
      );
    });
  });
});
