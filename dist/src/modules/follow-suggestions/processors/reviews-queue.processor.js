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
import { RECOMMENDATIONS_QUEUE, REVIEWS_QUEUE, } from '../../events/events.constants.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
let ReviewsQueueProcessor = class ReviewsQueueProcessor {
    followSuggestions;
    pgBoss;
    constructor(followSuggestions, pgBoss) {
        this.followSuggestions = followSuggestions;
        this.pgBoss = pgBoss;
    }
    async onApplicationBootstrap() {
        await this.pgBoss.boss.work(REVIEWS_QUEUE, (jobs) => this.handleBatch(jobs));
    }
    async handleBatch(jobs) {
        for (const { data } of jobs) {
            if (data.event !== 'review.created')
                continue;
            await Promise.all([
                this.pgBoss.boss.send(RECOMMENDATIONS_QUEUE, data),
                this.followSuggestions.recompute(data.payload.userId),
            ]);
        }
    }
};
ReviewsQueueProcessor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FollowSuggestionsService,
        PgBossService])
], ReviewsQueueProcessor);
export { ReviewsQueueProcessor };
//# sourceMappingURL=reviews-queue.processor.js.map