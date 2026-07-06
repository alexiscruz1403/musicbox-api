import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { TRENDING_QUEUE } from '../../events/events.constants.js';
import { TRENDING_JOB_NAME } from '../trending.constants.js';
import { TrendingService } from '../trending.service.js';

@Injectable()
@Processor(TRENDING_QUEUE)
export class TrendingQueueProcessor extends WorkerHost {
  constructor(private readonly trendingService: TrendingService) {
    super();
  }

  async process(job: Job): Promise<void> {
    if (job.name !== TRENDING_JOB_NAME) return;
    await this.trendingService.recalculate();
  }
}
