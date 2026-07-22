import { type OnApplicationBootstrap } from '@nestjs/common';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { CatalogSyncService } from '../catalog-sync.service.js';
export declare class CatalogQueueProcessor implements OnApplicationBootstrap {
    private readonly catalogSyncService;
    private readonly pgBoss;
    constructor(catalogSyncService: CatalogSyncService, pgBoss: PgBossService);
    onApplicationBootstrap(): Promise<void>;
    private handleBatch;
}
