import { Injectable, type OnApplicationBootstrap } from '@nestjs/common';
import type { Job } from 'pg-boss';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  RECOMMENDATIONS_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import {
  MIN_REVIEWS_FOR_RECOMMENDATIONS,
  RECOMMENDATIONS_JOB_NAME,
} from '../recommendations.constants.js';
import { RecommendationsRepository } from '../recommendations.repository.js';
import { RecommendationsService } from '../recommendations.service.js';

type RecommendationsJob = JobEnvelope<ReviewEventPayload>;

// Worker (pg-boss) de RECOMMENDATIONS_QUEUE: maneja el review.created relayado
// desde REVIEWS_QUEUE y el cron diario `generate-recommendations`.
@Injectable()
export class RecommendationsQueueProcessor implements OnApplicationBootstrap {
  constructor(
    private readonly service: RecommendationsService,
    private readonly repo: RecommendationsRepository,
    private readonly pgBoss: PgBossService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.pgBoss.boss.work<RecommendationsJob>(
      RECOMMENDATIONS_QUEUE,
      (jobs) => this.handleBatch(jobs),
    );
  }

  private async handleBatch(jobs: Job<RecommendationsJob>[]): Promise<void> {
    for (const { data } of jobs) {
      if (data.event === 'review.created') {
        const count = await this.repo.countActiveReviews(data.payload.userId);
        if (count >= MIN_REVIEWS_FOR_RECOMMENDATIONS) {
          await this.service.recompute(data.payload.userId);
        }
        continue;
      }

      if (data.event === RECOMMENDATIONS_JOB_NAME) {
        const users = await this.repo.listUserIdsWithSnapshot();
        for (const { userId } of users) {
          await this.service.recompute(userId);
        }
      }
    }
  }
}
