var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axiosRetry from 'axios-retry';
import { firstValueFrom } from 'rxjs';
let LastFmClient = class LastFmClient {
    http;
    baseUrl;
    apiKey;
    constructor(http, config) {
        this.http = http;
        this.baseUrl = config.get('LASTFM_BASE_URL');
        this.apiKey = config.get('LASTFM_API_KEY');
    }
    onModuleInit() {
        axiosRetry(this.http.axiosRef, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error) ||
                error.response?.status === 429,
        });
    }
    async getSimilarArtists(artistName, limit) {
        if (!this.apiKey)
            return [];
        try {
            const { data } = await firstValueFrom(this.http.get(`${this.baseUrl}/`, {
                params: {
                    method: 'artist.getSimilar',
                    artist: artistName,
                    api_key: this.apiKey,
                    format: 'json',
                    limit,
                },
            }));
            if (data.error)
                return [];
            return data.similarartists?.artist ?? [];
        }
        catch {
            return [];
        }
    }
};
LastFmClient = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService,
        ConfigService])
], LastFmClient);
export { LastFmClient };
//# sourceMappingURL=lastfm.client.js.map