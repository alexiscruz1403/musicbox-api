import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { REVIEWS_QUEUE } from '../../events/events.constants.js';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';

// EventsModule (@Global) already registers REVIEWS_QUEUE via
// BullModule.registerQueue — @Processor discovery is app-wide (Nest's
// DiscoveryService scans every provider), so this module doesn't need to
// import EventsModule for the worker to bind correctly.
@Injectable()
@Processor(REVIEWS_QUEUE)
export class ReviewsQueueProcessor extends WorkerHost {
  constructor(private readonly followSuggestions: FollowSuggestionsService) {
    super();
  }

  async process(job: Job<ReviewEventPayload>): Promise<void> {
    if (job.name !== 'review.created') return;
    await this.followSuggestions.recompute(job.data.userId);
  }
}
