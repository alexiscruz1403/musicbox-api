import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
export declare class ReviewsQueueProcessor extends WorkerHost {
    private readonly followSuggestions;
    constructor(followSuggestions: FollowSuggestionsService);
    process(job: Job<ReviewEventPayload>): Promise<void>;
}
