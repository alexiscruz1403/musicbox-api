import { HttpService } from '@nestjs/axios';
import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { LastFmSimilarArtist } from './lastfm.types.js';
export declare class LastFmClient implements OnModuleInit {
    private readonly http;
    private readonly baseUrl;
    private readonly apiKey;
    constructor(http: HttpService, config: ConfigService);
    onModuleInit(): void;
    getSimilarArtists(artistName: string, limit: number): Promise<LastFmSimilarArtist[]>;
}
