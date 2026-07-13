import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { CatalogSyncService } from '../catalog-sync.service.js';
export declare class CatalogQueueProcessor extends WorkerHost {
    private readonly catalogSyncService;
    constructor(catalogSyncService: CatalogSyncService);
    process(job: Job): Promise<void>;
}
