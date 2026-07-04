import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { SOCIAL_QUEUE } from '../../events/events.constants.js';
import type { ReactionEventPayload } from '../../events/social-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';

@Injectable()
@Processor(SOCIAL_QUEUE)
export class SocialQueueProcessor extends WorkerHost {
  constructor(private readonly followSuggestions: FollowSuggestionsService) {
    super();
  }

  async process(job: Job<ReactionEventPayload>): Promise<void> {
    // No-op for comment.created/follow.created and DISLIKE reactions — only
    // LIKE add/change is a positive taste signal per spec.
    if (job.name !== 'reaction.added' && job.name !== 'reaction.changed') {
      return;
    }
    if (job.data.type !== 'LIKE') return;
    await this.followSuggestions.recompute(job.data.userId);
  }
}
