import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { TrendingService } from '../trending.service.js';
export declare class TrendingQueueProcessor extends WorkerHost {
    private readonly trendingService;
    constructor(trendingService: TrendingService);
    process(job: Job): Promise<void>;
}
