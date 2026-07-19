import { I18nService } from 'nestjs-i18n';
import { CatalogService } from '../catalog/catalog.service.js';
import { LastFmClient } from './lastfm/lastfm.client.js';
import { type RecommendationItem } from './recommendations.constants.js';
import { RecommendationsRepository } from './recommendations.repository.js';
export declare class RecommendationsService {
    private readonly repo;
    private readonly catalog;
    private readonly lastfm;
    private readonly i18n;
    constructor(repo: RecommendationsRepository, catalog: CatalogService, lastfm: LastFmClient, i18n: I18nService);
    getRecommendations(userId: string): Promise<{
        recommendations: (RecommendationItem & {
            reasonLabel: string;
        })[];
        generatedAt: Date;
    } | null>;
    recompute(userId: string): Promise<{
        userId: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        generatedAt: Date;
    }>;
    private getFavoriteArtists;
    private getGenres;
    private getReviewedDeezerIds;
}
