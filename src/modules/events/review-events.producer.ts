import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bullmq';
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
  constructor(@InjectQueue(REVIEWS_QUEUE) private readonly queue: Queue) {}

  emitCreated(payload: ReviewEventPayload) {
    return this.queue.add('review.created', payload);
  }

  emitUpdated(payload: ReviewEventPayload) {
    return this.queue.add('review.updated', payload);
  }

  emitDeleted(payload: ReviewEventPayload) {
    return this.queue.add('review.deleted', payload);
  }
}
