import { Injectable } from '@nestjs/common';
import { PgBossService } from '../../pgboss/pgboss.service.js';
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

export interface FollowRequestEventPayload {
  requesterId: string;
  targetId: string;
}

export interface FollowRequestAcceptedEventPayload {
  requesterId: string;
  accepterId: string;
}

@Injectable()
export class SocialEventsProducer {
  constructor(private readonly pgBoss: PgBossService) {}

  emitReactionAdded(payload: ReactionEventPayload) {
    return this.pgBoss.boss.send(SOCIAL_QUEUE, {
      event: 'reaction.added',
      payload,
    });
  }

  emitReactionChanged(payload: ReactionEventPayload) {
    return this.pgBoss.boss.send(SOCIAL_QUEUE, {
      event: 'reaction.changed',
      payload,
    });
  }

  emitCommentCreated(payload: CommentEventPayload) {
    return this.pgBoss.boss.send(SOCIAL_QUEUE, {
      event: 'comment.created',
      payload,
    });
  }

  emitFollowCreated(payload: FollowEventPayload) {
    return this.pgBoss.boss.send(SOCIAL_QUEUE, {
      event: 'follow.created',
      payload,
    });
  }

  emitFollowRequested(payload: FollowRequestEventPayload) {
    return this.pgBoss.boss.send(SOCIAL_QUEUE, {
      event: 'follow.requested',
      payload,
    });
  }

  emitFollowRequestAccepted(payload: FollowRequestAcceptedEventPayload) {
    return this.pgBoss.boss.send(SOCIAL_QUEUE, {
      event: 'follow.request.accepted',
      payload,
    });
  }
}
