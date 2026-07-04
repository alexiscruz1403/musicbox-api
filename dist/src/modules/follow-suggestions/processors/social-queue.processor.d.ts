import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import type { ReactionEventPayload } from '../../events/social-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
export declare class SocialQueueProcessor extends WorkerHost {
    private readonly followSuggestions;
    constructor(followSuggestions: FollowSuggestionsService);
    process(job: Job<ReactionEventPayload>): Promise<void>;
}
