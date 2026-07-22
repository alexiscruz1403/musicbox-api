import { Injectable } from '@nestjs/common';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { PgBossJobScheduler } from '../../common/scheduling/pgboss-job-scheduler.js';
import { RECOMMENDATIONS_QUEUE } from '../../events/events.constants.js';
import {
  RECOMMENDATIONS_CRON_PATTERN,
  RECOMMENDATIONS_JOB_NAME,
  RECOMMENDATIONS_SCHEDULER_ID,
} from '../recommendations.constants.js';

// Cron diario (3am) vía `boss.schedule` de pg-boss — mismo patrón que
// TrendingScheduler/CatalogScheduler. El worker de RECOMMENDATIONS_QUEUE
// distingue este job (event = RECOMMENDATIONS_JOB_NAME) del review.created
// relayado.
@Injectable()
export class RecommendationsScheduler extends PgBossJobScheduler {
  constructor(pgBoss: PgBossService) {
    super(
      pgBoss,
      RECOMMENDATIONS_QUEUE,
      RECOMMENDATIONS_JOB_NAME,
      RECOMMENDATIONS_CRON_PATTERN,
      RECOMMENDATIONS_SCHEDULER_ID,
    );
  }
}
