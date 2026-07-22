import { Injectable, type OnApplicationBootstrap } from '@nestjs/common';
import type { Job } from 'pg-boss';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  TRENDING_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import { TRENDING_JOB_NAME } from '../trending.constants.js';
import { TrendingService } from '../trending.service.js';

@Injectable()
export class TrendingQueueProcessor implements OnApplicationBootstrap {
  constructor(
    private readonly trendingService: TrendingService,
    private readonly pgBoss: PgBossService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.pgBoss.boss.work<JobEnvelope>(TRENDING_QUEUE, (jobs) =>
      this.handleBatch(jobs),
    );
  }

  private async handleBatch(jobs: Job<JobEnvelope>[]): Promise<void> {
    for (const { data } of jobs) {
      if (data.event !== TRENDING_JOB_NAME) continue;
      await this.trendingService.recalculate();
    }
  }
}
