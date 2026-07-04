var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { SocialService } from '../social/social.service.js';
import { decodeAllCursor, encodeAllCursor, FEED_PHASES, } from './feed-cursor.util.js';
import { FeedRepository } from './feed.repository.js';
const TRENDING_POOL_SIZE = 50;
let FeedService = class FeedService {
    repo;
    social;
    constructor(repo, social) {
        this.repo = repo;
        this.social = social;
    }
    async getFeed(userId, query) {
        const result = query.type === 'ALL'
            ? await this.getAllFeed(userId, query.cursor, query.limit)
            : await this.repo.listFeed(userId, query.cursor, query.limit);
        const stats = await this.social.getReviewStats(result.items.map((r) => r.id), userId);
        return {
            items: result.items.map((r) => ({ ...r, ...stats.get(r.id) })),
            nextCursor: result.nextCursor,
        };
    }
    async getAllFeed(userId, cursor, limit) {
        const take = Math.min(limit, 50);
        const { phase: startPhase, id: startId } = decodeAllCursor(cursor);
        const [followedIds, signalRows] = await Promise.all([
            this.repo.getFollowedIds(userId),
            this.repo.getOwnReviewSignals(userId),
        ]);
        const excludeUserIds = [userId, ...followedIds];
        const { albumIds, trackIds, artistIds } = this.deriveSignalIds(signalRows);
        const trendingIds = await this.getTrendingIds(excludeUserIds);
        const fetchers = {
            S: (cursorId, take) => this.repo.findSimilarReviews({
                excludeUserIds,
                albumIds,
                trackIds,
                artistIds,
                cursorId,
                take,
            }),
            T: (cursorId, take) => this.repo.findTrendingReviews({
                excludeUserIds,
                albumIds,
                trackIds,
                artistIds,
                trendingIds,
                cursorId,
                take,
            }),
            R: (cursorId, take) => this.repo.findRandomReviews({
                excludeUserIds,
                albumIds,
                trackIds,
                artistIds,
                trendingIds,
                cursorId,
                take,
            }),
        };
        const items = [];
        let remaining = take;
        let phaseIndex = FEED_PHASES.indexOf(startPhase);
        let cursorId = startId;
        let nextCursor = null;
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
            phaseIndex += 1;
            cursorId = undefined;
            if (remaining === 0) {
                nextCursor =
                    phaseIndex < FEED_PHASES.length
                        ? encodeAllCursor({ phase: FEED_PHASES[phaseIndex], id: undefined })
                        : null;
            }
        }
        return { items, nextCursor };
    }
    deriveSignalIds(rows) {
        const albumIds = new Set();
        const trackIds = new Set();
        const artistIds = new Set();
        for (const r of rows) {
            if (r.albumId)
                albumIds.add(r.albumId);
            if (r.trackId)
                trackIds.add(r.trackId);
            if (r.album?.artistId)
                artistIds.add(r.album.artistId);
            if (r.track?.artistId)
                artistIds.add(r.track.artistId);
        }
        return {
            albumIds: [...albumIds],
            trackIds: [...trackIds],
            artistIds: [...artistIds],
        };
    }
    async getTrendingIds(excludeUserIds) {
        const now = new Date();
        const since = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const candidateIds = await this.repo.getTodaysCandidateIds(excludeUserIds, since);
        if (candidateIds.length === 0)
            return [];
        const [likeGroups, commentGroups] = await Promise.all([
            this.repo.countLikesByReviewIds(candidateIds),
            this.repo.countCommentsByReviewIds(candidateIds),
        ]);
        const scores = new Map(candidateIds.map((id) => [id, 0]));
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
};
FeedService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FeedRepository,
        SocialService])
], FeedService);
export { FeedService };
//# sourceMappingURL=feed.service.js.map