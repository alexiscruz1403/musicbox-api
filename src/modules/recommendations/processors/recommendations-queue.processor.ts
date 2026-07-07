import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { RECOMMENDATIONS_QUEUE } from '../../events/events.constants.js';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import {
  MIN_REVIEWS_FOR_RECOMMENDATIONS,
  RECOMMENDATIONS_JOB_NAME,
} from '../recommendations.constants.js';
import { RecommendationsRepository } from '../recommendations.repository.js';
import { RecommendationsService } from '../recommendations.service.js';

// EventsModule (@Global) already registers RECOMMENDATIONS_QUEUE via
// BullModule.registerQueue — @Processor discovery is app-wide, so this
// module doesn't need to import EventsModule for the worker to bind.
@Injectable()
@Processor(RECOMMENDATIONS_QUEUE)
export class RecommendationsQueueProcessor extends WorkerHost {
  constructor(
    private readonly service: RecommendationsService,
    private readonly repo: RecommendationsRepository,
  ) {
    super();
  }

  async process(job: Job<ReviewEventPayload | undefined>): Promise<void> {
    if (job.name === 'review.created') {
      const payload = job.data as ReviewEventPayload;
      const count = await this.repo.countActiveReviews(payload.userId);
      if (count >= MIN_REVIEWS_FOR_RECOMMENDATIONS) {
        await this.service.recompute(payload.userId);
      }
      return;
    }

    if (job.name === RECOMMENDATIONS_JOB_NAME) {
      const users = await this.repo.listUserIdsWithSnapshot();
      for (const { userId } of users) {
        await this.service.recompute(userId);
      }
    }
  }
}
