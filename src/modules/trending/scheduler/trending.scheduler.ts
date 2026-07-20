import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bullmq';
import { BullMqJobScheduler } from '../../common/scheduling/bullmq-job-scheduler.js';
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
export class TrendingScheduler extends BullMqJobScheduler {
  constructor(@InjectQueue(TRENDING_QUEUE) queue: Queue) {
    super(queue, TRENDING_SCHEDULER_ID, TRENDING_JOB_NAME, {
      every: TRENDING_RECALC_INTERVAL_MS,
    });
  }
}
