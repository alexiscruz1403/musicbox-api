import type { Response } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { RecommendationsService } from './recommendations.service.js';
export declare class RecommendationsController {
    private readonly service;
    constructor(service: RecommendationsService);
    getRecommendations(user: JwtPayload, res: Response): Promise<{
        data: {
            recommendations: (import("./recommendations.constants.js").RecommendationItem & {
                reasonLabel: string;
            })[];
            generatedAt: Date;
        };
    } | undefined>;
}
