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
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CatalogService } from '../catalog/catalog.service.js';
import { LastFmClient } from './lastfm/lastfm.client.js';
import { MAX_FAVORITE_ARTISTS, MAX_PER_ARTIST, MIN_REVIEWS_FOR_RECOMMENDATIONS, RECOMMENDATIONS_TOP_N, SIMILAR_ARTISTS_PER_FAVORITE, } from './recommendations.constants.js';
import { RecommendationsRepository } from './recommendations.repository.js';
let RecommendationsService = class RecommendationsService {
    repo;
    catalog;
    lastfm;
    i18n;
    constructor(repo, catalog, lastfm, i18n) {
        this.repo = repo;
        this.catalog = catalog;
        this.lastfm = lastfm;
        this.i18n = i18n;
    }
    async getRecommendations(userId) {
        const reviewCount = await this.repo.countActiveReviews(userId);
        if (reviewCount < MIN_REVIEWS_FOR_RECOMMENDATIONS)
            return null;
        let snapshot = await this.repo.getSnapshot(userId);
        if (!snapshot)
            snapshot = await this.recompute(userId);
        const reviewedIds = await this.getReviewedDeezerIds(userId);
        const lang = I18nContext.current()?.lang;
        const recommendations = snapshot.payload
            .filter((r) => !reviewedIds.has(r.deezerId))
            .map((r) => ({
            ...r,
            reasonLabel: this.i18n.translate(`recommendations.${r.reason}`, {
                lang,
                args: r.reasonParams,
            }),
        }));
        return { recommendations, generatedAt: snapshot.generatedAt };
    }
    async recompute(userId) {
        const reviewCount = await this.repo.countActiveReviews(userId);
        if (reviewCount < MIN_REVIEWS_FOR_RECOMMENDATIONS) {
            const existing = await this.repo.getSnapshot(userId);
            if (existing)
                return existing;
            return this.repo.upsertSnapshot(userId, [], new Date());
        }
        const [favoriteArtists, genres, reviewedDeezerIds] = await Promise.all([
            this.getFavoriteArtists(userId),
            this.getGenres(userId),
            this.getReviewedDeezerIds(userId),
        ]);
        const seen = new Set(reviewedDeezerIds);
        const perArtist = new Map();
        const candidates = [];
        const tryAdd = (album, reason, reasonParams) => {
            if (seen.has(album.deezerId))
                return;
            const count = perArtist.get(album.artist.deezerId) ?? 0;
            if (count >= MAX_PER_ARTIST)
                return;
            seen.add(album.deezerId);
            perArtist.set(album.artist.deezerId, count + 1);
            candidates.push({
                deezerId: album.deezerId,
                type: 'album',
                title: album.title,
                artistName: album.artist.name,
                coverUrl: album.coverUrl,
                reason,
                reasonParams,
                fans: album.fans,
            });
        };
        for (const fav of favoriteArtists) {
            try {
                const similar = await this.lastfm.getSimilarArtists(fav.name, SIMILAR_ARTISTS_PER_FAVORITE);
                for (const s of similar) {
                    try {
                        const found = await this.catalog.search(s.name, 'artist', 1, null);
                        const match = found.items[0];
                        if (!match || match.type !== 'artist')
                            continue;
                        const albums = await this.catalog.getArtistAlbums(match.item.deezerId, SIMILAR_ARTISTS_PER_FAVORITE, null);
                        for (const album of albums.items) {
                            tryAdd(album, 'SIMILAR_ARTIST', { artistName: fav.name });
                        }
                    }
                    catch {
                    }
                }
            }
            catch {
            }
        }
        if (candidates.length < RECOMMENDATIONS_TOP_N && genres.length > 0) {
            const remaining = RECOMMENDATIONS_TOP_N - candidates.length;
            const localAlbums = await this.repo.findAlbumsByGenres(genres, [...seen], remaining);
            for (const row of localAlbums) {
                try {
                    const album = await this.catalog.getAlbum(row.deezerId);
                    tryAdd(album, 'GENRE_MATCH', { genreLabel: row.genreLabel });
                }
                catch {
                }
            }
        }
        const ranked = candidates
            .sort((a, b) => {
            if (a.reason !== b.reason) {
                return a.reason === 'SIMILAR_ARTIST' ? -1 : 1;
            }
            return b.fans - a.fans;
        })
            .slice(0, RECOMMENDATIONS_TOP_N)
            .map(({ fans: _fans, ...item }) => item);
        const generatedAt = new Date();
        return this.repo.upsertSnapshot(userId, ranked, generatedAt);
    }
    async getFavoriteArtists(userId) {
        const rows = await this.repo.getFavoriteArtistSignals(userId);
        const counts = new Map();
        for (const r of rows) {
            const artistId = r.album?.artistId ?? r.track?.artistId;
            const artist = r.album?.artist ?? r.track?.artist;
            if (!artistId || !artist)
                continue;
            const entry = counts.get(artistId) ?? { name: artist.name, count: 0 };
            entry.count += 1;
            counts.set(artistId, entry);
        }
        return [...counts.entries()]
            .map(([artistId, v]) => ({ artistId, name: v.name, count: v.count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, MAX_FAVORITE_ARTISTS);
    }
    async getGenres(userId) {
        const rows = await this.repo.getGenreSignals(userId);
        const genres = new Set();
        for (const r of rows) {
            const genre = r.album?.genreLabel ?? r.track?.album?.genreLabel;
            if (genre)
                genres.add(genre);
        }
        return [...genres];
    }
    async getReviewedDeezerIds(userId) {
        const rows = await this.repo.getReviewedAlbumDeezerIds(userId);
        const ids = new Set();
        for (const r of rows) {
            const deezerId = r.album?.deezerId ?? r.track?.album?.deezerId;
            if (deezerId)
                ids.add(deezerId);
        }
        return ids;
    }
};
RecommendationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RecommendationsRepository,
        CatalogService,
        LastFmClient,
        I18nService])
], RecommendationsService);
export { RecommendationsService };
//# sourceMappingURL=recommendations.service.js.map