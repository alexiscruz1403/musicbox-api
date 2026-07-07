import { WorkerHost } from '@nestjs/bullmq';
import type { Job, Queue } from 'bullmq';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
export declare class ReviewsQueueProcessor extends WorkerHost {
    private readonly followSuggestions;
    private readonly recommendations;
    constructor(followSuggestions: FollowSuggestionsService, recommendations: Queue);
    process(job: Job<ReviewEventPayload>): Promise<void>;
}
