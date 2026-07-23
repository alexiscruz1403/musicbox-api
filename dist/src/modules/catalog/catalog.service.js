var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service.js';
import { CatalogSyncService } from './catalog-sync.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { mapWithConcurrency } from '../common/concurrency/map-with-concurrency.util.js';
import { CATALOG_DB_FANOUT_CONCURRENCY, PREVIEW_URL_CACHE_TTL_SECONDS, PREVIEW_URL_MISSING_CACHE_TTL_SECONDS, } from './catalog.constants.js';
import { MUSIC_CATALOG_PROVIDER, } from './providers/music-catalog.provider.js';
let CatalogService = class CatalogService {
    catalogProvider;
    repo;
    redis;
    catalogSyncService;
    CACHE_TTL = 86_400;
    constructor(catalogProvider, repo, redis, catalogSyncService) {
        this.catalogProvider = catalogProvider;
        this.repo = repo;
        this.redis = redis;
        this.catalogSyncService = catalogSyncService;
    }
    async withCacheTtl(key, fetcher, ttlSecondsFor) {
        const cached = await this.redis.get(key);
        if (cached !== null)
            return JSON.parse(cached);
        const result = await fetcher();
        await this.redis.set(key, JSON.stringify(result), ttlSecondsFor(result));
        return result;
    }
    withCache(key, fetcher) {
        return this.withCacheTtl(key, fetcher, () => this.CACHE_TTL);
    }
    async search(query, type, limit, cursor, viewerId) {
        const key = `catalog:search:${type}:${query}:${limit}:${cursor ?? '0'}`;
        const page = await this.withCache(key, () => this.catalogProvider.search(query, type, limit, cursor));
        return {
            ...page,
            items: await this.enrichSearchResults(page.items, viewerId),
        };
    }
    async enrichSearchResults(items, viewerId) {
        const albumIds = items
            .filter((r) => r.type === 'album')
            .map((r) => r.item.deezerId);
        const trackIds = items
            .filter((r) => r.type === 'track')
            .map((r) => r.item.deezerId);
        const artistIds = items
            .filter((r) => r.type === 'artist')
            .map((r) => r.item.deezerId);
        const [albumStats, trackStats, artistStats] = await Promise.all([
            this.repo.getAlbumStatsBatch(albumIds, viewerId),
            this.repo.getTrackStatsBatch(trackIds, viewerId),
            this.repo.getArtistStatsBatch(artistIds),
        ]);
        return items.map((result) => {
            if (result.type === 'album') {
                const stats = albumStats.get(result.item.deezerId);
                return {
                    type: 'album',
                    item: {
                        ...result.item,
                        reviewCount: stats?.reviewCount ?? 0,
                        userRating: stats?.userRating ?? null,
                        tracks: [],
                    },
                };
            }
            if (result.type === 'track') {
                const stats = trackStats.get(result.item.deezerId);
                return {
                    type: 'track',
                    item: {
                        ...result.item,
                        reviewCount: stats?.reviewCount ?? 0,
                        userRating: stats?.userRating ?? null,
                    },
                };
            }
            const stats = artistStats.get(result.item.deezerId);
            return {
                type: 'artist',
                item: { ...result.item, reviewCount: stats?.reviewCount ?? 0 },
            };
        });
    }
    async getAlbum(deezerId, viewerId) {
        const key = `catalog:album:${deezerId}`;
        let freshFromMetadataFetch = null;
        const album = await this.withCache(key, async () => {
            const album = await this.catalogProvider.getAlbum(deezerId);
            freshFromMetadataFetch = album;
            const artist = await this.repo.upsertArtist(album.artist);
            const persistedAlbum = await this.repo.upsertAlbum(album, artist.id);
            await mapWithConcurrency(album.tracks, CATALOG_DB_FANOUT_CONCURRENCY, (track) => this.repo.upsertTrack(track, artist.id, persistedAlbum.id));
            return album;
        });
        const previewMap = await this.resolveAlbumPreviewMap(deezerId, freshFromMetadataFetch);
        const stats = await this.repo.getAlbumStats(deezerId, viewerId);
        return {
            ...album,
            reviewCount: stats?.reviewCount ?? 0,
            userRating: stats?.userRating ?? null,
            tracks: album.tracks.map((track) => ({
                ...track,
                previewUrl: previewMap.get(track.deezerId) ?? null,
                userRating: stats?.trackRatings.get(track.deezerId) ?? null,
            })),
        };
    }
    async resolveAlbumPreviewMap(deezerId, freshAlbum) {
        const key = `catalog:album-preview:${deezerId}`;
        const payload = await this.withCacheTtl(key, async () => {
            const source = freshAlbum ?? (await this.catalogProvider.getAlbum(deezerId));
            return Object.fromEntries(source.tracks.map((t) => [t.deezerId, t.previewUrl]));
        }, () => PREVIEW_URL_CACHE_TTL_SECONDS);
        return new Map(Object.entries(payload));
    }
    async getTrack(deezerId, viewerId) {
        const key = `catalog:track:${deezerId}`;
        let freshFromMetadataFetch = null;
        const track = await this.withCache(key, async () => {
            const track = await this.catalogProvider.getTrack(deezerId);
            freshFromMetadataFetch = track;
            const artist = await this.repo.upsertArtist(track.artist);
            const albumId = track.albumDeezerId
                ? await this.repo.findAlbumIdByDeezerId(track.albumDeezerId)
                : null;
            await this.repo.upsertTrack(track, artist.id, albumId);
            return track;
        });
        const previewUrl = await this.resolveTrackPreviewUrl(deezerId, freshFromMetadataFetch);
        const stats = await this.repo.getTrackStats(deezerId, viewerId);
        return {
            ...track,
            previewUrl,
            reviewCount: stats?.reviewCount ?? 0,
            userRating: stats?.userRating ?? null,
        };
    }
    async resolveTrackPreviewUrl(deezerId, freshTrack) {
        const key = `catalog:track-preview:${deezerId}`;
        const wrapped = await this.withCacheTtl(key, async () => ({
            previewUrl: (freshTrack ?? (await this.catalogProvider.getTrack(deezerId))).previewUrl,
        }), (r) => r.previewUrl
            ? PREVIEW_URL_CACHE_TTL_SECONDS
            : PREVIEW_URL_MISSING_CACHE_TTL_SECONDS);
        return wrapped.previewUrl;
    }
    async getArtist(deezerId) {
        const key = `catalog:artist:${deezerId}`;
        const artist = await this.withCache(key, async () => {
            const artist = await this.catalogProvider.getArtist(deezerId);
            await this.repo.upsertArtist(artist);
            return artist;
        });
        const stats = await this.repo.getArtistStats(deezerId);
        return { ...artist, reviewCount: stats?.reviewCount ?? 0 };
    }
    getArtistAlbums(deezerId, limit, cursor) {
        const key = `catalog:artist-albums:${deezerId}:${limit}:${cursor ?? '0'}`;
        return this.withCache(key, () => this.catalogProvider.getArtistAlbums(deezerId, limit, cursor));
    }
    getArtistTracks(deezerId, limit, cursor) {
        const key = `catalog:artist-tracks:${deezerId}:${limit}:${cursor ?? '0'}`;
        return this.withCache(key, async () => {
            const artistRow = await this.catalogSyncService.ensureArtistSynced(deezerId);
            const page = await this.repo.findTracksByArtist(artistRow.id, cursor, limit);
            return {
                items: page.items.map((track) => ({
                    deezerId: track.deezerId,
                    title: track.title,
                    artist: {
                        deezerId: track.artist.deezerId,
                        name: track.artist.name,
                        imageUrl: track.artist.imageUrl,
                        fans: 0,
                        albumsCount: 0,
                    },
                    albumDeezerId: track.album?.deezerId ?? null,
                    albumTitle: track.album?.title ?? null,
                    coverUrl: track.album?.coverUrl ?? null,
                    releaseDate: track.album?.releaseDate?.toISOString() ?? null,
                    durationMs: track.durationMs,
                    trackNumber: track.trackNumber,
                    previewUrl: track.previewUrl,
                })),
                nextCursor: page.nextCursor,
                total: page.total,
            };
        });
    }
};
CatalogService = __decorate([
    Injectable(),
    __param(0, Inject(MUSIC_CATALOG_PROVIDER)),
    __metadata("design:paramtypes", [Object, CatalogRepository,
        RedisService,
        CatalogSyncService])
], CatalogService);
export { CatalogService };
//# sourceMappingURL=catalog.service.js.map