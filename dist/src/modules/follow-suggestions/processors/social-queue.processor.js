var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { NOTIFICATIONS_QUEUE, SOCIAL_QUEUE, } from '../../events/events.constants.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
const NOTIFIABLE_JOB_NAMES = new Set([
    'reaction.added',
    'comment.created',
    'follow.created',
]);
let SocialQueueProcessor = class SocialQueueProcessor extends WorkerHost {
    followSuggestions;
    notifications;
    constructor(followSuggestions, notifications) {
        super();
        this.followSuggestions = followSuggestions;
        this.notifications = notifications;
    }
    async process(job) {
        await this.relayToNotifications(job);
        await this.recomputeFollowSuggestions(job);
    }
    async relayToNotifications(job) {
        if (!NOTIFIABLE_JOB_NAMES.has(job.name))
            return;
        await this.notifications.add(job.name, job.data);
    }
    async recomputeFollowSuggestions(job) {
        if (job.name !== 'reaction.added' && job.name !== 'reaction.changed') {
            return;
        }
        const payload = job.data;
        if (payload.type !== 'LIKE')
            return;
        await this.followSuggestions.recompute(payload.userId);
    }
};
SocialQueueProcessor = __decorate([
    Injectable(),
    Processor(SOCIAL_QUEUE),
    __param(1, InjectQueue(NOTIFICATIONS_QUEUE)),
    __metadata("design:paramtypes", [FollowSuggestionsService, Function])
], SocialQueueProcessor);
export { SocialQueueProcessor };
//# sourceMappingURL=social-queue.processor.js.map