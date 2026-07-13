import { OnApplicationBootstrap } from '@nestjs/common';
import type { Queue } from 'bullmq';
export declare class CatalogScheduler implements OnApplicationBootstrap {
    private readonly queue;
    constructor(queue: Queue);
    onApplicationBootstrap(): Promise<void>;
}
