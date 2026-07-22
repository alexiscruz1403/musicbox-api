var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { RECOMMENDATIONS_QUEUE, } from '../../events/events.constants.js';
import { MIN_REVIEWS_FOR_RECOMMENDATIONS, RECOMMENDATIONS_JOB_NAME, } from '../recommendations.constants.js';
import { RecommendationsRepository } from '../recommendations.repository.js';
import { RecommendationsService } from '../recommendations.service.js';
let RecommendationsQueueProcessor = class RecommendationsQueueProcessor {
    service;
    repo;
    pgBoss;
    constructor(service, repo, pgBoss) {
        this.service = service;
        this.repo = repo;
        this.pgBoss = pgBoss;
    }
    async onApplicationBootstrap() {
        await this.pgBoss.boss.work(RECOMMENDATIONS_QUEUE, (jobs) => this.handleBatch(jobs));
    }
    async handleBatch(jobs) {
        for (const { data } of jobs) {
            if (data.event === 'review.created') {
                const count = await this.repo.countActiveReviews(data.payload.userId);
                if (count >= MIN_REVIEWS_FOR_RECOMMENDATIONS) {
                    await this.service.recompute(data.payload.userId);
                }
                continue;
            }
            if (data.event === RECOMMENDATIONS_JOB_NAME) {
                const users = await this.repo.listUserIdsWithSnapshot();
                for (const { userId } of users) {
                    await this.service.recompute(userId);
                }
            }
        }
    }
};
RecommendationsQueueProcessor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RecommendationsService,
        RecommendationsRepository,
        PgBossService])
], RecommendationsQueueProcessor);
export { RecommendationsQueueProcessor };
//# sourceMappingURL=recommendations-queue.processor.js.map