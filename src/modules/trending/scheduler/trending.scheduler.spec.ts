import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { TRENDING_QUEUE } from '../../events/events.constants.js';
import {
  TRENDING_CRON_PATTERN,
  TRENDING_JOB_NAME,
  TRENDING_SCHEDULER_ID,
} from '../trending.constants.js';
import { TrendingScheduler } from './trending.scheduler.js';

// Cubre también la base PgBossJobScheduler (sin cobertura previa): registra el
// cron con boss.schedule, idempotente por (cola, key).
describe('TrendingScheduler', () => {
  it('schedules the recalculate cron on the trending queue keyed by scheduler id', async () => {
    const schedule = vi.fn();
    const pgBoss = { boss: { schedule } } as unknown as PgBossService;

    const scheduler = new TrendingScheduler(pgBoss);
    await scheduler.onApplicationBootstrap();

    expect(schedule).toHaveBeenCalledWith(
      TRENDING_QUEUE,
      TRENDING_CRON_PATTERN,
      { event: TRENDING_JOB_NAME, payload: {} },
      { key: TRENDING_SCHEDULER_ID },
    );
  });
});
