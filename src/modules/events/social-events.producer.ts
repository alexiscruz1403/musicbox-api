import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bullmq';
import { SOCIAL_QUEUE } from './events.constants.js';

export interface ReactionEventPayload {
  reactionId: string;
  reviewId: string;
  reviewOwnerId: string;
  userId: string;
  type: 'LIKE' | 'DISLIKE';
}

export interface CommentEventPayload {
  commentId: string;
  reviewId: string;
  reviewOwnerId: string;
  userId: string;
}

export interface FollowEventPayload {
  followerId: string;
  followeeId: string;
}

@Injectable()
export class SocialEventsProducer {
  constructor(@InjectQueue(SOCIAL_QUEUE) private readonly queue: Queue) {}

  emitReactionAdded(payload: ReactionEventPayload) {
    return this.queue.add('reaction.added', payload);
  }

  emitReactionChanged(payload: ReactionEventPayload) {
    return this.queue.add('reaction.changed', payload);
  }

  emitCommentCreated(payload: CommentEventPayload) {
    return this.queue.add('comment.created', payload);
  }

  emitFollowCreated(payload: FollowEventPayload) {
    return this.queue.add('follow.created', payload);
  }
}
