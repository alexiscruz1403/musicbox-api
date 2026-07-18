import { CatalogService } from '../catalog/catalog.service.js';
import { LastFmClient } from './lastfm/lastfm.client.js';
import { type RecommendationItem } from './recommendations.constants.js';
import { RecommendationsRepository } from './recommendations.repository.js';
export declare class RecommendationsService {
    private readonly repo;
    private readonly catalog;
    private readonly lastfm;
    constructor(repo: RecommendationsRepository, catalog: CatalogService, lastfm: LastFmClient);
    getRecommendations(userId: string): Promise<{
        recommendations: RecommendationItem[];
        generatedAt: Date;
    } | null>;
    recompute(userId: string): Promise<{
        payload: import("@prisma/client/runtime/client").JsonValue;
        userId: string;
        generatedAt: Date;
    }>;
    private getFavoriteArtists;
    private getGenres;
    private getReviewedDeezerIds;
}
