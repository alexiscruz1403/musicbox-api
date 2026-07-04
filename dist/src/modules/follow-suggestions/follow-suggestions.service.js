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
import { FollowSuggestionsRepository } from './follow-suggestions.repository.js';
const WEIGHTS = {
    ownReviewAlbum: 5,
    ownReviewTrack: 4,
    ownReviewArtist: 2,
    ownLikeAlbum: 3,
    ownLikeTrack: 2,
    ownLikeArtist: 1,
};
const MAX_SUGGESTIONS = 5;
let FollowSuggestionsService = class FollowSuggestionsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getSuggestions(userId) {
        let snapshot = await this.repo.getSnapshot(userId);
        if (!snapshot) {
            snapshot = await this.recompute(userId);
        }
        const payload = snapshot.payload;
        const followed = new Set((await this.repo.getFollowedIds(userId)).map((f) => f.followeeId));
        const freshIds = payload
            .map((p) => p.userId)
            .filter((id) => id !== userId && !followed.has(id));
        const users = await this.repo.hydrateUsers(freshIds);
        const byId = new Map(users.map((u) => [u.id, u]));
        const cards = freshIds
            .map((id) => byId.get(id))
            .filter((u) => !!u);
        if (cards.length < MAX_SUGGESTIONS) {
            const exclude = [userId, ...followed, ...cards.map((c) => c.id)];
            const fill = await this.repo.findPopularUsers(exclude, MAX_SUGGESTIONS - cards.length);
            cards.push(...fill);
        }
        return cards.slice(0, MAX_SUGGESTIONS);
    }
    async recompute(userId) {
        const followed = new Set((await this.repo.getFollowedIds(userId)).map((f) => f.followeeId));
        const { albumIds, trackIds, artistIds } = await this.gatherSignals(userId);
        const scores = await this.scoreCandidates(userId, followed, albumIds, trackIds, artistIds);
        let ranked = [...scores.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([id]) => ({ userId: id }))
            .slice(0, MAX_SUGGESTIONS);
        if (ranked.length < MAX_SUGGESTIONS) {
            const exclude = [userId, ...followed, ...ranked.map((r) => r.userId)];
            const fill = await this.repo.findPopularUsers(exclude, MAX_SUGGESTIONS - ranked.length);
            ranked = [...ranked, ...fill.map((u) => ({ userId: u.id }))];
        }
        const generatedAt = new Date();
        return this.repo.upsertSnapshot(userId, ranked, generatedAt);
    }
    async gatherSignals(userId) {
        const [reviews, likes] = await Promise.all([
            this.repo.getOwnReviewSignals(userId),
            this.repo.getOwnLikeSignals(userId),
        ]);
        const albumIds = new Set();
        const trackIds = new Set();
        const artistIds = new Set();
        for (const r of [...reviews, ...likes.map((l) => l.review)]) {
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
    async scoreCandidates(userId, followed, albumIds, trackIds, artistIds) {
        const [byAlbumReview, byTrackReview, byArtistReview, byAlbumLike, byTrackLike, byArtistLike,] = await Promise.all([
            this.repo.findReviewsByAlbumIds(albumIds),
            this.repo.findReviewsByTrackIds(trackIds),
            this.repo.findReviewsByArtistIds(artistIds),
            this.repo.findLikesByAlbumIds(albumIds),
            this.repo.findLikesByTrackIds(trackIds),
            this.repo.findLikesByArtistIds(artistIds),
        ]);
        const seen = new Set();
        const scores = new Map();
        const add = (bucket, candidateId, itemId, weight) => {
            if (!itemId || candidateId === userId || followed.has(candidateId))
                return;
            const key = `${bucket}:${candidateId}:${itemId}`;
            if (seen.has(key))
                return;
            seen.add(key);
            scores.set(candidateId, (scores.get(candidateId) ?? 0) + weight);
        };
        for (const r of byAlbumReview) {
            add('rev-album', r.userId, r.albumId, WEIGHTS.ownReviewAlbum);
        }
        for (const r of byTrackReview) {
            add('rev-track', r.userId, r.trackId, WEIGHTS.ownReviewTrack);
        }
        for (const r of byArtistReview) {
            const artistId = r.album?.artistId ?? r.track?.artistId;
            add('rev-artist', r.userId, artistId, WEIGHTS.ownReviewArtist);
        }
        for (const l of byAlbumLike) {
            add('like-album', l.userId, l.review.albumId, WEIGHTS.ownLikeAlbum);
        }
        for (const l of byTrackLike) {
            add('like-track', l.userId, l.review.trackId, WEIGHTS.ownLikeTrack);
        }
        for (const l of byArtistLike) {
            const artistId = l.review.album?.artistId ?? l.review.track?.artistId;
            add('like-artist', l.userId, artistId, WEIGHTS.ownLikeArtist);
        }
        return scores;
    }
};
FollowSuggestionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FollowSuggestionsRepository])
], FollowSuggestionsService);
export { FollowSuggestionsService };
//# sourceMappingURL=follow-suggestions.service.js.map