import { OnApplicationBootstrap } from '@nestjs/common';
import type { Queue } from 'bullmq';
export declare class RecommendationsScheduler implements OnApplicationBootstrap {
    private readonly queue;
    constructor(queue: Queue);
    onApplicationBootstrap(): Promise<void>;
}
