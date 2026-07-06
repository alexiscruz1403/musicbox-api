import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job, Queue } from 'bullmq';
import {
  NOTIFICATIONS_QUEUE,
  SOCIAL_QUEUE,
} from '../../events/events.constants.js';
import type {
  CommentEventPayload,
  FollowEventPayload,
  ReactionEventPayload,
} from '../../events/social-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';

type SocialJobPayload =
  ReactionEventPayload | CommentEventPayload | FollowEventPayload;

// Notification-relevant job names relayed to NOTIFICATIONS_QUEUE — literal
// reading of the event list in musicbox.md §11 (reaction.changed excluded,
// same criterion this processor already applies for follow-suggestions).
const NOTIFIABLE_JOB_NAMES = new Set([
  'reaction.added',
  'comment.created',
  'follow.created',
]);

@Injectable()
@Processor(SOCIAL_QUEUE)
export class SocialQueueProcessor extends WorkerHost {
  constructor(
    private readonly followSuggestions: FollowSuggestionsService,
    @InjectQueue(NOTIFICATIONS_QUEUE) private readonly notifications: Queue,
  ) {
    super();
  }

  async process(job: Job<SocialJobPayload>): Promise<void> {
    await this.relayToNotifications(job);
    await this.recomputeFollowSuggestions(job);
  }

  // A queue can only have one @Processor in this app (BullMQ splits jobs
  // between workers on the same queue instead of delivering to both) — see
  // docs/musicbox-backend-guide.md:2066. NotificationsModule can't register
  // its own @Processor(SOCIAL_QUEUE), so this processor relays the job names
  // it cares about onto NOTIFICATIONS_QUEUE, which NotificationsModule owns
  // exclusively.
  private async relayToNotifications(
    job: Job<SocialJobPayload>,
  ): Promise<void> {
    if (!NOTIFIABLE_JOB_NAMES.has(job.name)) return;
    await this.notifications.add(job.name, job.data);
  }

  private async recomputeFollowSuggestions(
    job: Job<SocialJobPayload>,
  ): Promise<void> {
    // No-op for comment.created/follow.created and DISLIKE reactions — only
    // LIKE add/change is a positive taste signal per spec.
    if (job.name !== 'reaction.added' && job.name !== 'reaction.changed') {
      return;
    }
    const payload = job.data as ReactionEventPayload;
    if (payload.type !== 'LIKE') return;
    await this.followSuggestions.recompute(payload.userId);
  }
}
