import type { OnApplicationBootstrap } from '@nestjs/common';
import type { PgBossService } from '../../../pgboss/pgboss.service.js';
export declare abstract class PgBossJobScheduler implements OnApplicationBootstrap {
    private readonly pgBoss;
    private readonly queue;
    private readonly event;
    private readonly cron;
    private readonly key;
    constructor(pgBoss: PgBossService, queue: string, event: string, cron: string, key: string);
    onApplicationBootstrap(): Promise<void>;
}
