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
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import axiosRetry from 'axios-retry';
let DeezerMusicCatalogProvider = class DeezerMusicCatalogProvider {
    http;
    baseUrl;
    constructor(http, config) {
        this.http = http;
        this.baseUrl = config.getOrThrow('DEEZER_BASE_URL');
    }
    onModuleInit() {
        axiosRetry(this.http.axiosRef, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error) ||
                error.response?.status === 429,
        });
    }
    encodeCursor(offset) {
        return Buffer.from(String(offset)).toString('base64');
    }
    decodeCursor(cursor) {
        return parseInt(Buffer.from(cursor, 'base64').toString('utf8'), 10);
    }
    assertNoError(data) {
        if (data !== null &&
            typeof data === 'object' &&
            'error' in data &&
            data.error) {
            const err = data.error;
            throw new NotFoundException(`Deezer: ${err.message} (code ${err.code})`);
        }
    }
    mapArtist(raw) {
        return {
            deezerId: String(raw.id),
            name: raw.name,
            imageUrl: raw.picture_medium ?? null,
            fans: raw.nb_fan ?? 0,
        };
    }
    mapTrack(raw, albumReleaseDate) {
        return {
            deezerId: String(raw.id),
            title: raw.title,
            artist: this.mapArtist(raw.artist),
            albumDeezerId: raw.album ? String(raw.album.id) : null,
            coverUrl: raw.album?.cover_medium ?? null,
            releaseDate: raw.release_date ?? raw.album?.release_date ?? albumReleaseDate ?? null,
            durationMs: raw.duration != null ? raw.duration * 1000 : null,
            trackNumber: raw.track_position ?? null,
            previewUrl: raw.preview ?? null,
        };
    }
    mapAlbum(raw, artistOverride) {
        return {
            deezerId: String(raw.id),
            title: raw.title,
            artist: artistOverride ?? this.mapArtist(raw.artist),
            coverUrl: raw.cover_medium ?? null,
            releaseDate: raw.release_date ?? null,
            genreLabel: raw.genres?.data[0]?.name ?? null,
            tracks: raw.tracks?.data.map((t) => this.mapTrack(t, raw.release_date)) ?? [],
            fans: raw.fans ?? 0,
        };
    }
    async search(query, type, limit, cursor) {
        const index = cursor ? this.decodeCursor(cursor) : 0;
        const searchPath = {
            artist: 'search/artist',
            album: 'search/album',
            track: 'search/track',
        };
        const { data } = await firstValueFrom(this.http.get(`${this.baseUrl}/${searchPath[type]}`, {
            params: { q: query, limit, index },
        }));
        this.assertNoError(data);
        const nextOffset = index + data.data.length;
        const nextCursor = nextOffset < data.total ? this.encodeCursor(nextOffset) : null;
        const items = data.data.map((raw) => {
            if (type === 'artist') {
                return {
                    type: 'artist',
                    item: this.mapArtist(raw),
                };
            }
            if (type === 'album') {
                return {
                    type: 'album',
                    item: this.mapAlbum(raw),
                };
            }
            return {
                type: 'track',
                item: this.mapTrack(raw),
            };
        });
        return { items, nextCursor, total: data.total };
    }
    async getAlbum(deezerId) {
        const { data } = await firstValueFrom(this.http.get(`${this.baseUrl}/album/${deezerId}`));
        this.assertNoError(data);
        return this.mapAlbum(data);
    }
    async getTrack(deezerId) {
        const { data } = await firstValueFrom(this.http.get(`${this.baseUrl}/track/${deezerId}`));
        this.assertNoError(data);
        return this.mapTrack(data);
    }
    async getArtist(deezerId) {
        const { data } = await firstValueFrom(this.http.get(`${this.baseUrl}/artist/${deezerId}`));
        this.assertNoError(data);
        return this.mapArtist(data);
    }
    async getArtistAlbums(deezerId, limit, cursor) {
        const index = cursor ? this.decodeCursor(cursor) : 0;
        const [artist, { data }] = await Promise.all([
            this.getArtist(deezerId),
            firstValueFrom(this.http.get(`${this.baseUrl}/artist/${deezerId}/albums`, { params: { limit, index } })),
        ]);
        this.assertNoError(data);
        const nextOffset = index + data.data.length;
        const nextCursor = nextOffset < data.total ? this.encodeCursor(nextOffset) : null;
        return {
            items: data.data.map((a) => this.mapAlbum(a, artist)),
            nextCursor,
            total: data.total,
        };
    }
};
DeezerMusicCatalogProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService,
        ConfigService])
], DeezerMusicCatalogProvider);
export { DeezerMusicCatalogProvider };
//# sourceMappingURL=deezer.provider.js.map