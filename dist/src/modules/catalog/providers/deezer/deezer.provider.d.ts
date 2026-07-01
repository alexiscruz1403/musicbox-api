import { OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { CatalogAlbum, CatalogArtist, CatalogPage, CatalogSearchResult, CatalogSearchType, CatalogTrack, MusicCatalogProvider } from '../music-catalog.provider.js';
export declare class DeezerMusicCatalogProvider implements MusicCatalogProvider, OnModuleInit {
    private readonly http;
    private readonly baseUrl;
    constructor(http: HttpService, config: ConfigService);
    onModuleInit(): void;
    private encodeCursor;
    private decodeCursor;
    private assertNoError;
    private mapArtist;
    private mapTrack;
    private mapAlbum;
    search(query: string, type: CatalogSearchType, limit: number, cursor: string | null): Promise<CatalogPage<CatalogSearchResult>>;
    getAlbum(deezerId: string): Promise<CatalogAlbum>;
    getTrack(deezerId: string): Promise<CatalogTrack>;
    getArtist(deezerId: string): Promise<CatalogArtist>;
    getArtistAlbums(deezerId: string, limit: number, cursor: string | null): Promise<CatalogPage<CatalogAlbum>>;
}
