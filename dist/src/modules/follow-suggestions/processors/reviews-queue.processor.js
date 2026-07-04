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
import { REVIEWS_QUEUE } from '../../events/events.constants.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
let ReviewsQueueProcessor = class ReviewsQueueProcessor extends WorkerHost {
    followSuggestions;
    constructor(followSuggestions) {
        super();
        this.followSuggestions = followSuggestions;
    }
    async process(job) {
        if (job.name !== 'review.created')
            return;
        await this.followSuggestions.recompute(job.data.userId);
    }
};
ReviewsQueueProcessor = __decorate([
    Injectable(),
    Processor(REVIEWS_QUEUE),
    __metadata("design:paramtypes", [FollowSuggestionsService])
], ReviewsQueueProcessor);
export { ReviewsQueueProcessor };
//# sourceMappingURL=reviews-queue.processor.js.map