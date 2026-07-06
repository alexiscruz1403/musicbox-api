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
import { TRENDING_ALBUMS_CACHE_KEY, TRENDING_CACHE_TTL_SECONDS, TRENDING_TRACKS_CACHE_KEY, } from './trending.constants.js';
import { TrendingRepository } from './trending.repository.js';
let TrendingService = class TrendingService {
    repo;
    redis;
    constructor(repo, redis) {
        this.repo = repo;
        this.redis = redis;
    }
    async getAlbums(limit) {
        const items = await this.getCached(TRENDING_ALBUMS_CACHE_KEY, () => this.computeAlbums());
        return items.slice(0, limit);
    }
    async getTracks(limit) {
        const items = await this.getCached(TRENDING_TRACKS_CACHE_KEY, () => this.computeTracks());
        return items.slice(0, limit);
    }
    async recalculate() {
        const [albums, tracks] = await Promise.all([
            this.computeAlbums(),
            this.computeTracks(),
        ]);
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
    async getCached(key, compute) {
        const cached = await this.redis.get(key);
        if (cached !== null)
            return JSON.parse(cached);
        const items = await compute();
        await this.redis.set(key, JSON.stringify(items), TRENDING_CACHE_TTL_SECONDS);
        return items;
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
        return groups
            .map((g) => {
            const track = byId.get(g.id);
            if (!track)
                return null;
            return {
                deezerId: track.deezerId,
                title: track.title,
                artist: {
                    deezerId: track.artist.deezerId,
                    name: track.artist.name,
                    imageUrl: track.artist.imageUrl,
                },
                albumDeezerId: track.album?.deezerId ?? null,
                coverUrl: track.album?.coverUrl ?? null,
                reviewCount: g.reviewCount,
                avgRating: g.avgRating,
            };
        })
            .filter((item) => item !== null);
    }
};
TrendingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TrendingRepository,
        RedisService])
], TrendingService);
export { TrendingService };
//# sourceMappingURL=trending.service.js.map