import { WorkerHost } from '@nestjs/bullmq';
import type { Job, Queue } from 'bullmq';
import type { CommentEventPayload, FollowEventPayload, FollowRequestAcceptedEventPayload, FollowRequestEventPayload, ReactionEventPayload } from '../../events/social-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
type SocialJobPayload = ReactionEventPayload | CommentEventPayload | FollowEventPayload | FollowRequestEventPayload | FollowRequestAcceptedEventPayload;
export declare class SocialQueueProcessor extends WorkerHost {
    private readonly followSuggestions;
    private readonly notifications;
    constructor(followSuggestions: FollowSuggestionsService, notifications: Queue);
    process(job: Job<SocialJobPayload>): Promise<void>;
    private relayToNotifications;
    private recomputeFollowSuggestions;
}
export {};
