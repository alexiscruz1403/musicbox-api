import { Injectable } from '@nestjs/common';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { PgBossJobScheduler } from '../../common/scheduling/pgboss-job-scheduler.js';
import { TRENDING_QUEUE } from '../../events/events.constants.js';
import {
  TRENDING_CRON_PATTERN,
  TRENDING_JOB_NAME,
  TRENDING_SCHEDULER_ID,
} from '../trending.constants.js';

// Recalculo horario vía el cron de pg-boss (`boss.schedule`), idempotente por
// (cola, key). Antes era un intervalo `every: 1h` de BullMQ; el cron `0 * * * *`
// dispara en la hora exacta en vez de a las N horas del boot — equivalente en
// cadencia y alineado al TTL de cache (TRENDING_CACHE_TTL_SECONDS).
@Injectable()
export class TrendingScheduler extends PgBossJobScheduler {
  constructor(pgBoss: PgBossService) {
    super(
      pgBoss,
      TRENDING_QUEUE,
      TRENDING_JOB_NAME,
      TRENDING_CRON_PATTERN,
      TRENDING_SCHEDULER_ID,
    );
  }
}
