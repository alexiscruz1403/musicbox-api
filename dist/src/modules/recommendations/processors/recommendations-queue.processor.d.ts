import { type OnApplicationBootstrap } from '@nestjs/common';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { RecommendationsRepository } from '../recommendations.repository.js';
import { RecommendationsService } from '../recommendations.service.js';
export declare class RecommendationsQueueProcessor implements OnApplicationBootstrap {
    private readonly service;
    private readonly repo;
    private readonly pgBoss;
    constructor(service: RecommendationsService, repo: RecommendationsRepository, pgBoss: PgBossService);
    onApplicationBootstrap(): Promise<void>;
    private handleBatch;
}
