import { Injectable } from '@nestjs/common';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { PgBossJobScheduler } from '../../common/scheduling/pgboss-job-scheduler.js';
import { CATALOG_QUEUE } from '../../events/events.constants.js';
import {
  CATALOG_SYNC_CRON_PATTERN,
  CATALOG_SYNC_JOB_NAME,
  CATALOG_SYNC_SCHEDULER_ID,
} from '../catalog.constants.js';

// Cron diario (4am, después del job de recommendations a las 3am) vía
// `boss.schedule` de pg-boss — mismo patrón que Trending/Recommendations.
@Injectable()
export class CatalogScheduler extends PgBossJobScheduler {
  constructor(pgBoss: PgBossService) {
    super(
      pgBoss,
      CATALOG_QUEUE,
      CATALOG_SYNC_JOB_NAME,
      CATALOG_SYNC_CRON_PATTERN,
      CATALOG_SYNC_SCHEDULER_ID,
    );
  }
}
