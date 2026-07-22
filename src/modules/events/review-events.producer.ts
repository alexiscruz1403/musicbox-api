import { Injectable } from '@nestjs/common';
import { PgBossService } from '../../pgboss/pgboss.service.js';
import { REVIEWS_QUEUE } from './events.constants.js';

export interface ReviewEventPayload {
  reviewId: string;
  userId: string;
  type: 'TRACK' | 'ALBUM';
  albumId: string | null;
  trackId: string | null;
}

@Injectable()
export class ReviewEventsProducer {
  constructor(private readonly pgBoss: PgBossService) {}

  emitCreated(payload: ReviewEventPayload) {
    return this.pgBoss.boss.send(REVIEWS_QUEUE, {
      event: 'review.created',
      payload,
    });
  }

  emitUpdated(payload: ReviewEventPayload) {
    return this.pgBoss.boss.send(REVIEWS_QUEUE, {
      event: 'review.updated',
      payload,
    });
  }

  emitDeleted(payload: ReviewEventPayload) {
    return this.pgBoss.boss.send(REVIEWS_QUEUE, {
      event: 'review.deleted',
      payload,
    });
  }
}
