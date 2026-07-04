import { Injectable } from '@nestjs/common';
import { SocialService } from '../social/social.service.js';
import type { ListFeedQueryDto } from './dto/list-feed-query.dto.js';
import {
  decodeAllCursor,
  encodeAllCursor,
  FEED_PHASES,
  type FeedPhase,
} from './feed-cursor.util.js';
import { FeedRepository, type FeedReviewRow } from './feed.repository.js';

const TRENDING_POOL_SIZE = 50;

interface OwnReviewSignalRow {
  albumId: string | null;
  trackId: string | null;
  album: { artistId: string } | null;
  track: { artistId: string } | null;
}

@Injectable()
export class FeedService {
  constructor(
    private readonly repo: FeedRepository,
    private readonly social: SocialService,
  ) {}

  async getFeed(userId: string, query: ListFeedQueryDto) {
    const result =
      query.type === 'ALL'
        ? await this.getAllFeed(userId, query.cursor, query.limit)
        : await this.repo.listFeed(userId, query.cursor, query.limit);

    const stats = await this.social.getReviewStats(
      result.items.map((r) => r.id),
      userId,
    );
    return {
      items: result.items.map((r) => ({ ...r, ...stats.get(r.id)! })),
      nextCursor: result.nextCursor,
    };
  }

  private async getAllFeed(
    userId: string,
    cursor: string | undefined,
    limit: number,
  ) {
    const take = Math.min(limit, 50);
    const { phase: startPhase, id: startId } = decodeAllCursor(cursor);

    const [followedIds, signalRows] = await Promise.all([
      this.repo.getFollowedIds(userId),
      this.repo.getOwnReviewSignals(userId),
    ]);
    const excludeUserIds = [userId, ...followedIds];
    const { albumIds, trackIds, artistIds } = this.deriveSignalIds(signalRows);
    const trendingIds = await this.getTrendingIds(excludeUserIds);

    const fetchers: Record<
      FeedPhase,
      (cursorId: string | undefined, take: number) => Promise<FeedReviewRow[]>
    > = {
      S: (cursorId, take) =>
        this.repo.findSimilarReviews({
          excludeUserIds,
          albumIds,
          trackIds,
          artistIds,
          cursorId,
          take,
        }),
      T: (cursorId, take) =>
        this.repo.findTrendingReviews({
          excludeUserIds,
          albumIds,
          trackIds,
          artistIds,
          trendingIds,
          cursorId,
          take,
        }),
      R: (cursorId, take) =>
        this.repo.findRandomReviews({
          excludeUserIds,
          albumIds,
          trackIds,
          artistIds,
          trendingIds,
          cursorId,
          take,
        }),
    };

    const items: FeedReviewRow[] = [];
    let remaining = take;
    let phaseIndex = FEED_PHASES.indexOf(startPhase);
    let cursorId = startId;
    let nextCursor: string | null = null;

    while (remaining > 0 && phaseIndex < FEED_PHASES.length) {
      const phase = FEED_PHASES[phaseIndex];
      const rows = await fetchers[phase](cursorId, remaining + 1);
      const hasMore = rows.length > remaining;
      const pageRows = hasMore ? rows.slice(0, remaining) : rows;
      items.push(...pageRows);
      remaining -= pageRows.length;

      if (hasMore) {
        nextCursor = encodeAllCursor({
          phase,
          id: pageRows[pageRows.length - 1].id,
        });
        break;
      }

      // Phase exhausted (no extra row found). Advance; next phase always
      // starts with a fresh cursor — its keyset is independent.
      phaseIndex += 1;
      cursorId = undefined;

      if (remaining === 0) {
        // Exact-boundary fix: the page was satisfied at the exact moment
        // this phase ran dry, so we never probed the next phase this
        // request. Do NOT set nextCursor = null here — point optimistically
        // at the next phase's fresh start; if it turns out empty too, the
        // next request's loop cascades through it for free.
        nextCursor =
          phaseIndex < FEED_PHASES.length
            ? encodeAllCursor({ phase: FEED_PHASES[phaseIndex], id: undefined })
            : null;
      }
    }

    return { items, nextCursor };
  }

  private deriveSignalIds(rows: OwnReviewSignalRow[]) {
    const albumIds = new Set<string>();
    const trackIds = new Set<string>();
    const artistIds = new Set<string>();
    for (const r of rows) {
      if (r.albumId) albumIds.add(r.albumId);
      if (r.trackId) trackIds.add(r.trackId);
      if (r.album?.artistId) artistIds.add(r.album.artistId);
      if (r.track?.artistId) artistIds.add(r.track.artistId);
    }
    return {
      albumIds: [...albumIds],
      trackIds: [...trackIds],
      artistIds: [...artistIds],
    };
  }

  private async getTrendingIds(excludeUserIds: string[]): Promise<string[]> {
    const now = new Date();
    const since = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    const candidateIds = await this.repo.getTodaysCandidateIds(
      excludeUserIds,
      since,
    );
    if (candidateIds.length === 0) return [];

    const [likeGroups, commentGroups] = await Promise.all([
      this.repo.countLikesByReviewIds(candidateIds),
      this.repo.countCommentsByReviewIds(candidateIds),
    ]);

    const scores = new Map<string, number>(candidateIds.map((id) => [id, 0]));
    for (const g of likeGroups) {
      scores.set(g.reviewId, (scores.get(g.reviewId) ?? 0) + g._count);
    }
    for (const g of commentGroups) {
      scores.set(g.reviewId, (scores.get(g.reviewId) ?? 0) + g._count);
    }

    return [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, TRENDING_POOL_SIZE)
      .map(([id]) => id);
  }
}
