import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import axiosRetry from 'axios-retry';
import type {
  CatalogAlbum,
  CatalogArtist,
  CatalogPage,
  CatalogSearchResult,
  CatalogSearchType,
  CatalogTrack,
  MusicCatalogProvider,
} from '../music-catalog.provider.js';
import type {
  DeezerAlbum,
  DeezerArtist,
  DeezerError,
  DeezerSearchResponse,
  DeezerTrack,
} from './deezer.types.js';

@Injectable()
export class DeezerMusicCatalogProvider
  implements MusicCatalogProvider, OnModuleInit
{
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    config: ConfigService,
  ) {
    this.baseUrl = config.getOrThrow<string>('DEEZER_BASE_URL');
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

  private encodeCursor(offset: number): string {
    return Buffer.from(String(offset)).toString('base64');
  }

  private decodeCursor(cursor: string): number {
    return parseInt(Buffer.from(cursor, 'base64').toString('utf8'), 10);
  }

  private assertNoError(data: unknown): void {
    if (
      data !== null &&
      typeof data === 'object' &&
      'error' in data &&
      (data as DeezerError).error
    ) {
      const err = (data as DeezerError).error;
      throw new NotFoundException(`Deezer: ${err.message} (code ${err.code})`);
    }
  }

  private mapArtist(raw: DeezerArtist): CatalogArtist {
    return {
      deezerId: String(raw.id),
      name: raw.name,
      imageUrl: raw.picture_medium ?? null,
    };
  }

  private mapTrack(raw: DeezerTrack, albumReleaseDate?: string): CatalogTrack {
    return {
      deezerId: String(raw.id),
      title: raw.title,
      artist: this.mapArtist(raw.artist),
      albumDeezerId: raw.album ? String(raw.album.id) : null,
      coverUrl: raw.album?.cover_medium ?? null,
      releaseDate:
        raw.release_date ?? raw.album?.release_date ?? albumReleaseDate ?? null,
      durationMs: raw.duration != null ? raw.duration * 1000 : null,
      trackNumber: raw.track_position ?? null,
      previewUrl: raw.preview ?? null,
    };
  }

  private mapAlbum(raw: DeezerAlbum): CatalogAlbum {
    return {
      deezerId: String(raw.id),
      title: raw.title,
      artist: this.mapArtist(raw.artist),
      coverUrl: raw.cover_medium ?? null,
      releaseDate: raw.release_date ?? null,
      genreLabel: raw.genres?.data[0]?.name ?? null,
      tracks:
        raw.tracks?.data.map((t) => this.mapTrack(t, raw.release_date)) ?? [],
    };
  }

  async search(
    query: string,
    type: CatalogSearchType,
    limit: number,
    cursor: string | null,
  ): Promise<CatalogPage<CatalogSearchResult>> {
    const index = cursor ? this.decodeCursor(cursor) : 0;
    const searchPath: Record<CatalogSearchType, string> = {
      artist: 'search/artist',
      album: 'search/album',
      track: 'search/track',
    };
    const { data } = await firstValueFrom(
      this.http.get<
        DeezerSearchResponse<DeezerAlbum | DeezerTrack | DeezerArtist>
      >(`${this.baseUrl}/${searchPath[type]}`, {
        params: { q: query, limit, index },
      }),
    );
    this.assertNoError(data);

    const nextOffset = index + data.data.length;
    const nextCursor =
      nextOffset < data.total ? this.encodeCursor(nextOffset) : null;

    const items: CatalogSearchResult[] = data.data.map((raw) => {
      if (type === 'artist') {
        return {
          type: 'artist' as const,
          item: this.mapArtist(raw as DeezerArtist),
        };
      }
      if (type === 'album') {
        return {
          type: 'album' as const,
          item: this.mapAlbum(raw as DeezerAlbum),
        };
      }
      return {
        type: 'track' as const,
        item: this.mapTrack(raw as DeezerTrack),
      };
    });

    return { items, nextCursor, total: data.total };
  }

  async getAlbum(deezerId: string): Promise<CatalogAlbum> {
    const { data } = await firstValueFrom(
      this.http.get<DeezerAlbum>(`${this.baseUrl}/album/${deezerId}`),
    );
    this.assertNoError(data);
    return this.mapAlbum(data);
  }

  async getTrack(deezerId: string): Promise<CatalogTrack> {
    const { data } = await firstValueFrom(
      this.http.get<DeezerTrack>(`${this.baseUrl}/track/${deezerId}`),
    );
    this.assertNoError(data);
    return this.mapTrack(data);
  }

  async getArtist(deezerId: string): Promise<CatalogArtist> {
    const { data } = await firstValueFrom(
      this.http.get<DeezerArtist>(`${this.baseUrl}/artist/${deezerId}`),
    );
    this.assertNoError(data);
    return this.mapArtist(data);
  }

  async getArtistAlbums(
    deezerId: string,
    limit: number,
    cursor: string | null,
  ): Promise<CatalogPage<CatalogAlbum>> {
    const index = cursor ? this.decodeCursor(cursor) : 0;
    const { data } = await firstValueFrom(
      this.http.get<DeezerSearchResponse<DeezerAlbum>>(
        `${this.baseUrl}/artist/${deezerId}/albums`,
        { params: { limit, index } },
      ),
    );
    this.assertNoError(data);

    const nextOffset = index + data.data.length;
    const nextCursor =
      nextOffset < data.total ? this.encodeCursor(nextOffset) : null;

    return {
      items: data.data.map((a) => this.mapAlbum(a)),
      nextCursor,
      total: data.total,
    };
  }
}
