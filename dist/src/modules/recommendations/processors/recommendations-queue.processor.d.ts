import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import type { ReviewEventPayload } from '../../events/review-events.producer.js';
import { RecommendationsRepository } from '../recommendations.repository.js';
import { RecommendationsService } from '../recommendations.service.js';
export declare class RecommendationsQueueProcessor extends WorkerHost {
    private readonly service;
    private readonly repo;
    constructor(service: RecommendationsService, repo: RecommendationsRepository);
    process(job: Job<ReviewEventPayload | undefined>): Promise<void>;
}
