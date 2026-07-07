var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { RECOMMENDATIONS_QUEUE } from '../../events/events.constants.js';
import { MIN_REVIEWS_FOR_RECOMMENDATIONS, RECOMMENDATIONS_JOB_NAME, } from '../recommendations.constants.js';
import { RecommendationsRepository } from '../recommendations.repository.js';
import { RecommendationsService } from '../recommendations.service.js';
let RecommendationsQueueProcessor = class RecommendationsQueueProcessor extends WorkerHost {
    service;
    repo;
    constructor(service, repo) {
        super();
        this.service = service;
        this.repo = repo;
    }
    async process(job) {
        if (job.name === 'review.created') {
            const payload = job.data;
            const count = await this.repo.countActiveReviews(payload.userId);
            if (count >= MIN_REVIEWS_FOR_RECOMMENDATIONS) {
                await this.service.recompute(payload.userId);
            }
            return;
        }
        if (job.name === RECOMMENDATIONS_JOB_NAME) {
            const users = await this.repo.listUserIdsWithSnapshot();
            for (const { userId } of users) {
                await this.service.recompute(userId);
            }
        }
    }
};
RecommendationsQueueProcessor = __decorate([
    Injectable(),
    Processor(RECOMMENDATIONS_QUEUE),
    __metadata("design:paramtypes", [RecommendationsService,
        RecommendationsRepository])
], RecommendationsQueueProcessor);
export { RecommendationsQueueProcessor };
//# sourceMappingURL=recommendations-queue.processor.js.map