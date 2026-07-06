import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import type { Queue } from 'bullmq';
import { TRENDING_QUEUE } from '../../events/events.constants.js';
import {
  TRENDING_JOB_NAME,
  TRENDING_RECALC_INTERVAL_MS,
  TRENDING_SCHEDULER_ID,
} from '../trending.constants.js';

// No cron primitive exists in this repo (@nestjs/schedule isn't installed) —
// BullMQ's job-scheduler API is the idiomatic equivalent, consistent with
// "BullMQ is the only job primitive in the project". upsertJobScheduler is
// idempotent across restarts/instances (same schedulerId just gets updated).
@Injectable()
export class TrendingScheduler implements OnApplicationBootstrap {
  constructor(@InjectQueue(TRENDING_QUEUE) private readonly queue: Queue) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.queue.upsertJobScheduler(
      TRENDING_SCHEDULER_ID,
      { every: TRENDING_RECALC_INTERVAL_MS },
      { name: TRENDING_JOB_NAME },
    );
  }
}
