import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bullmq';
import { BullMqJobScheduler } from '../../common/scheduling/bullmq-job-scheduler.js';
import { RECOMMENDATIONS_QUEUE } from '../../events/events.constants.js';
import {
  RECOMMENDATIONS_CRON_PATTERN,
  RECOMMENDATIONS_JOB_NAME,
  RECOMMENDATIONS_SCHEDULER_ID,
} from '../recommendations.constants.js';

// No cron primitive exists in this repo (@nestjs/schedule isn't installed) —
// BullMQ's job-scheduler API is the idiomatic equivalent (same pattern as
// TrendingScheduler), here using a cron `pattern` instead of `every` since
// the spec calls for a fixed daily time, not an interval.
@Injectable()
export class RecommendationsScheduler extends BullMqJobScheduler {
  constructor(@InjectQueue(RECOMMENDATIONS_QUEUE) queue: Queue) {
    super(queue, RECOMMENDATIONS_SCHEDULER_ID, RECOMMENDATIONS_JOB_NAME, {
      pattern: RECOMMENDATIONS_CRON_PATTERN,
    });
  }
}
