import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { PgBossJobScheduler } from '../../common/scheduling/pgboss-job-scheduler.js';
export declare class CatalogScheduler extends PgBossJobScheduler {
    constructor(pgBoss: PgBossService);
}
