import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job, Queue } from 'bullmq';
import {
  RECOMMENDATIONS_QUEUE,
  REVIEWS_QUEUE,
} from '../../events/events.constants.js';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';

// EventsModule (@Global) already registers REVIEWS_QUEUE via
// BullModule.registerQueue — @Processor discovery is app-wide (Nest's
// DiscoveryService scans every provider), so this module doesn't need to
// import EventsModule for the worker to bind correctly.
//
// A queue can only have one @Processor in this app (BullMQ splits jobs
// between workers on the same queue instead of delivering to both) — see
// docs/musicbox-backend-guide.md:2066. RecommendationsModule can't register
// its own @Processor(REVIEWS_QUEUE), so this processor relays review.created
// onto RECOMMENDATIONS_QUEUE, which RecommendationsModule owns exclusively
// (same relay pattern SocialQueueProcessor already uses for notifications).
@Injectable()
@Processor(REVIEWS_QUEUE)
export class ReviewsQueueProcessor extends WorkerHost {
  constructor(
    private readonly followSuggestions: FollowSuggestionsService,
    @InjectQueue(RECOMMENDATIONS_QUEUE) private readonly recommendations: Queue,
  ) {
    super();
  }

  async process(job: Job<ReviewEventPayload>): Promise<void> {
    if (job.name !== 'review.created') return;
    await Promise.all([
      this.recommendations.add(job.name, job.data),
      this.followSuggestions.recompute(job.data.userId),
    ]);
  }
}
