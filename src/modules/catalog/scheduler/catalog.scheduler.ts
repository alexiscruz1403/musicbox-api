import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bullmq';
import { BullMqJobScheduler } from '../../common/scheduling/bullmq-job-scheduler.js';
import { CATALOG_QUEUE } from '../../events/events.constants.js';
import {
  CATALOG_SYNC_CRON_PATTERN,
  CATALOG_SYNC_JOB_NAME,
  CATALOG_SYNC_SCHEDULER_ID,
} from '../catalog.constants.js';

// No cron primitive exists in this repo (@nestjs/schedule isn't installed) —
// BullMQ's job-scheduler API is the idiomatic equivalent (same pattern as
// TrendingScheduler/RecommendationsScheduler), using a cron `pattern` since
// this needs to run at a fixed daily time, not a rolling interval.
@Injectable()
export class CatalogScheduler extends BullMqJobScheduler {
  constructor(@InjectQueue(CATALOG_QUEUE) queue: Queue) {
    super(queue, CATALOG_SYNC_SCHEDULER_ID, CATALOG_SYNC_JOB_NAME, {
      pattern: CATALOG_SYNC_CRON_PATTERN,
    });
  }
}
