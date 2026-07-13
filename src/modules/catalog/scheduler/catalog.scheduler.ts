import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import type { Queue } from 'bullmq';
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
export class CatalogScheduler implements OnApplicationBootstrap {
  constructor(@InjectQueue(CATALOG_QUEUE) private readonly queue: Queue) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.queue.upsertJobScheduler(
      CATALOG_SYNC_SCHEDULER_ID,
      { pattern: CATALOG_SYNC_CRON_PATTERN },
      { name: CATALOG_SYNC_JOB_NAME },
    );
  }
}
