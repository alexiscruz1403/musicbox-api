var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service.js';
import { TRENDING_WINDOW_DAYS } from '../trending/trending.constants.js';
import { ARTIST_DETAIL_CACHE_TTL_SECONDS, ARTIST_DETAIL_TOP_N, } from './catalog.constants.js';
import { CatalogRepository, } from './catalog.repository.js';
import { CatalogService } from './catalog.service.js';
let ArtistDetailService = class ArtistDetailService {
    catalogService;
    repo;
    redis;
    constructor(catalogService, repo, redis) {
        this.catalogService = catalogService;
        this.repo = repo;
        this.redis = redis;
    }
    async getDetail(deezerId) {
        const key = `catalog:artist-detail:${deezerId}`;
        const cached = await this.redis.get(key);
        const response = cached !== null
            ? JSON.parse(cached)
            : await this.buildDetail(deezerId);
        if (cached === null) {
            await this.redis.set(key, JSON.stringify(response), ARTIST_DETAIL_CACHE_TTL_SECONDS);
        }
        const artistStats = await this.repo.getArtistStats(deezerId);
        response.artist = {
            ...response.artist,
            reviewCount: artistStats?.reviewCount ?? 0,
        };
        return response;
    }
    async buildDetail(deezerId) {
        const artist = await this.catalogService.getArtist(deezerId);
        const artistRow = await this.repo.findArtistByDeezerId(deezerId);
        if (!artistRow) {
            throw new NotFoundException(`Artist ${deezerId} not found`);
        }
        const windowStart = new Date(Date.now() - TRENDING_WINDOW_DAYS * 24 * 60 * 60 * 1000);
        const [topReviewedAlbumGroups, topReviewedTrackGroups, trendingAlbumGroups, trendingTrackGroups,] = await Promise.all([
            this.repo.topReviewedAlbumIds(artistRow.id, ARTIST_DETAIL_TOP_N),
            this.repo.topReviewedTrackIds(artistRow.id, ARTIST_DETAIL_TOP_N),
            this.repo.trendingAlbumIds(artistRow.id, ARTIST_DETAIL_TOP_N, windowStart),
            this.repo.trendingTrackIds(artistRow.id, ARTIST_DETAIL_TOP_N, windowStart),
        ]);
        const albumIds = [
            ...new Set([...topReviewedAlbumGroups, ...trendingAlbumGroups].map((g) => g.id)),
        ];
        const trackIds = [
            ...new Set([...topReviewedTrackGroups, ...trendingTrackGroups].map((g) => g.id)),
        ];
        const [albumRows, trackRows] = await Promise.all([
            this.repo.hydrateAlbumSummaries(albumIds),
            this.repo.hydrateTrackSummaries(trackIds),
        ]);
        const albumById = new Map(albumRows.map((a) => [a.id, a]));
        const trackById = new Map(trackRows.map((t) => [t.id, t]));
        const toAlbumItem = (g) => {
            const album = albumById.get(g.id);
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
        };
        const toTrackItem = (g) => {
            const track = trackById.get(g.id);
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
        };
        const notNull = (item) => item !== null;
        return {
            artist,
            topReviewedAlbums: topReviewedAlbumGroups
                .map(toAlbumItem)
                .filter(notNull),
            topReviewedTracks: topReviewedTrackGroups
                .map(toTrackItem)
                .filter(notNull),
            trendingAlbums: trendingAlbumGroups.map(toAlbumItem).filter(notNull),
            trendingTracks: trendingTrackGroups.map(toTrackItem).filter(notNull),
        };
    }
};
ArtistDetailService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CatalogService,
        CatalogRepository,
        RedisService])
], ArtistDetailService);
export { ArtistDetailService };
//# sourceMappingURL=artist-detail.service.js.map