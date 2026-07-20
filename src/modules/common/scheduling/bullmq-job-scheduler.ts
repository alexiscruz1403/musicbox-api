import type { OnApplicationBootstrap } from '@nestjs/common';
import type { Queue } from 'bullmq';

export type BullMqRepeat = { every: number } | { pattern: string };

/**
 * Shared `OnApplicationBootstrap` shape for the project's BullMQ job
 * schedulers (Catalog/Trending/Recommendations) — each one only differs by
 * queue token, scheduler id, job name and repeat config (interval vs cron
 * pattern), all supplied by the concrete subclass's constructor.
 * `upsertJobScheduler` is idempotent by `schedulerId` — safe across restarts
 * and multiple instances, never creates duplicate repeatable jobs.
 */
export abstract class BullMqJobScheduler implements OnApplicationBootstrap {
  constructor(
    private readonly queue: Queue,
    private readonly schedulerId: string,
    private readonly jobName: string,
    private readonly repeat: BullMqRepeat,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.queue.upsertJobScheduler(this.schedulerId, this.repeat, {
      name: this.jobName,
    });
  }
}
