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
import { RedisService } from '../../redis/redis.service.js';
import { CatalogService } from '../catalog/catalog.service.js';
import { TRENDING_ALBUMS_CACHE_KEY, TRENDING_CACHE_TTL_SECONDS, TRENDING_TRACKS_CACHE_KEY, } from './trending.constants.js';
import { TrendingRepository } from './trending.repository.js';
let TrendingService = class TrendingService {
    repo;
    redis;
    catalogService;
    constructor(repo, redis, catalogService) {
        this.repo = repo;
        this.redis = redis;
        this.catalogService = catalogService;
    }
    async getAlbums(limit) {
        const items = await this.getCached(TRENDING_ALBUMS_CACHE_KEY, () => this.computeAlbums(), (payload) => payload?.albums);
        return items.slice(0, limit);
    }
    async getTracks(limit) {
        const items = await this.getCached(TRENDING_TRACKS_CACHE_KEY, () => this.computeTracks(), (payload) => payload?.tracks);
        return items.slice(0, limit);
    }
    async recalculate() {
        const previous = await this.repo.findLatestSnapshot();
        const previousPayload = previous?.payload;
        const [rawAlbums, rawTracks] = await Promise.all([
            this.computeAlbums(),
            this.computeTracks(),
        ]);
        const albums = this.applyRankChange(rawAlbums, previousPayload?.albums);
        const tracks = this.applyRankChange(rawTracks, previousPayload?.tracks);
        await Promise.all([
            this.redis.set(TRENDING_ALBUMS_CACHE_KEY, JSON.stringify(albums), TRENDING_CACHE_TTL_SECONDS),
            this.redis.set(TRENDING_TRACKS_CACHE_KEY, JSON.stringify(tracks), TRENDING_CACHE_TTL_SECONDS),
        ]);
        await this.repo.saveSnapshot({
            albums,
            tracks,
        });
        return { albums, tracks };
    }
    async getCached(key, compute, extractPrevious) {
        const cached = await this.redis.get(key);
        if (cached !== null) {
            return JSON.parse(cached);
        }
        const items = await compute();
        const previous = await this.repo.findLatestSnapshot();
        const ranked = this.applyRankChange(items, extractPrevious(previous?.payload));
        await this.redis.set(key, JSON.stringify(ranked), TRENDING_CACHE_TTL_SECONDS);
        return ranked;
    }
    applyRankChange(current, previous) {
        const prevIndex = new Map((previous ?? []).map((it, idx) => [it.deezerId, idx]));
        return current.map((item, idx) => {
            const rank = idx + 1;
            const prevIdx = prevIndex.get(item.deezerId);
            return {
                ...item,
                rank,
                rankChange: prevIdx === undefined ? null : prevIdx + 1 - rank,
            };
        });
    }
    async computeAlbums() {
        const groups = await this.repo.topAlbumGroups();
        const albums = await this.repo.hydrateAlbums(groups.map((g) => g.id));
        const byId = new Map(albums.map((a) => [a.id, a]));
        return groups
            .map((g) => {
            const album = byId.get(g.id);
            if (!album)
                return null;
            return {
                deezerId: album.deezerId,
                title: album.title,
                artist: {
                    deezerId: album.artist.deezerId,
                    name: album.artist.name,
                    imageUrl: album.artist.imageUrl,
                },
                coverUrl: album.coverUrl,
                reviewCount: g.reviewCount,
                avgRating: g.avgRating,
            };
        })
            .filter((item) => item !== null);
    }
    async computeTracks() {
        const groups = await this.repo.topTrackGroups();
        const tracks = await this.repo.hydrateTracks(groups.map((g) => g.id));
        const byId = new Map(tracks.map((t) => [t.id, t]));
        const items = await Promise.all(groups.map(async (g) => {
            const track = byId.get(g.id);
            if (!track)
                return null;
            let albumDeezerId = track.album?.deezerId ?? null;
            let coverUrl = track.album?.coverUrl ?? null;
            if (!track.album) {
                const fallback = await this.resolveAlbumFallback(track.deezerId);
                albumDeezerId = fallback?.albumDeezerId ?? null;
                coverUrl = fallback?.coverUrl ?? null;
            }
            return {
                deezerId: track.deezerId,
                title: track.title,
                artist: {
                    deezerId: track.artist.deezerId,
                    name: track.artist.name,
                    imageUrl: track.artist.imageUrl,
                },
                albumDeezerId,
                coverUrl,
                reviewCount: g.reviewCount,
                avgRating: g.avgRating,
            };
        }));
        return items.filter((item) => item !== null);
    }
    async resolveAlbumFallback(deezerId) {
        try {
            const track = await this.catalogService.getTrack(deezerId);
            return { albumDeezerId: track.albumDeezerId, coverUrl: track.coverUrl };
        }
        catch {
            return null;
        }
    }
};
TrendingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TrendingRepository,
        RedisService,
        CatalogService])
], TrendingService);
export { TrendingService };
//# sourceMappingURL=trending.service.js.map