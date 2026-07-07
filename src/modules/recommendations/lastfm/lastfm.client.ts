import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axiosRetry from 'axios-retry';
import { firstValueFrom } from 'rxjs';
import type {
  LastFmSimilarArtist,
  LastFmSimilarArtistsResponse,
} from './lastfm.types.js';

// Concrete client, not a port/adapter like MusicCatalogProvider — there's no
// second similarity provider to swap in, so an interface + DI token would be
// unused indirection. Tests mock this class directly (same as RedisService
// elsewhere), not a raw HttpService/axios layer.
@Injectable()
export class LastFmClient implements OnModuleInit {
  private readonly baseUrl: string;
  private readonly apiKey: string | undefined;

  constructor(
    private readonly http: HttpService,
    config: ConfigService,
  ) {
    this.baseUrl = config.get<string>('LASTFM_BASE_URL')!;
    this.apiKey = config.get<string>('LASTFM_API_KEY');
  }

  onModuleInit() {
    axiosRetry(this.http.axiosRef, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error.response?.status === 429,
    });
  }

  async getSimilarArtists(
    artistName: string,
    limit: number,
  ): Promise<LastFmSimilarArtist[]> {
    // LASTFM_API_KEY is optional infra-wide (Fase 2/3) — degrade to the
    // genre-based fallback in RecommendationsService rather than fail.
    if (!this.apiKey) return [];

    try {
      const { data } = await firstValueFrom(
        this.http.get<LastFmSimilarArtistsResponse>(`${this.baseUrl}/`, {
          params: {
            method: 'artist.getSimilar',
            artist: artistName,
            api_key: this.apiKey,
            format: 'json',
            limit,
          },
        }),
      );
      if (data.error) return [];
      return data.similarartists?.artist ?? [];
    } catch {
      // A single unrecognized artist / transient Last.fm failure shouldn't
      // abort the whole recompute — see docs/musicbox.md §18 (external API
      // rate limits/instability).
      return [];
    }
  }
}
