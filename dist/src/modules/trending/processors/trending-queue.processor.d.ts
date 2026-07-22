import { type OnApplicationBootstrap } from '@nestjs/common';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { TrendingService } from '../trending.service.js';
export declare class TrendingQueueProcessor implements OnApplicationBootstrap {
    private readonly trendingService;
    private readonly pgBoss;
    constructor(trendingService: TrendingService, pgBoss: PgBossService);
    onApplicationBootstrap(): Promise<void>;
    private handleBatch;
}
