import { Injectable, type OnApplicationBootstrap } from '@nestjs/common';
import type { Job } from 'pg-boss';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  RECOMMENDATIONS_QUEUE,
  REVIEWS_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';

type ReviewJob = JobEnvelope<ReviewEventPayload>;

// Worker (pg-boss) de REVIEWS_QUEUE. Dueño exclusivo de la cola: relaya
// review.created a RECOMMENDATIONS_QUEUE (que RecommendationsModule consume en
// exclusiva) — mismo patrón de relay que SocialQueueProcessor usa para
// notifications, ya que cada job pg-boss se entrega a un solo worker.
@Injectable()
export class ReviewsQueueProcessor implements OnApplicationBootstrap {
  constructor(
    private readonly followSuggestions: FollowSuggestionsService,
    private readonly pgBoss: PgBossService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.pgBoss.boss.work<ReviewJob>(REVIEWS_QUEUE, (jobs) =>
      this.handleBatch(jobs),
    );
  }

  private async handleBatch(jobs: Job<ReviewJob>[]): Promise<void> {
    for (const { data } of jobs) {
      if (data.event !== 'review.created') continue;
      await Promise.all([
        this.pgBoss.boss.send(RECOMMENDATIONS_QUEUE, data),
        this.followSuggestions.recompute(data.payload.userId),
      ]);
    }
  }
}
