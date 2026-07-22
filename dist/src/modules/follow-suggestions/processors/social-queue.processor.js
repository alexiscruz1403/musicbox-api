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
import { NOTIFICATIONS_QUEUE, SOCIAL_QUEUE, } from '../../events/events.constants.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
const NOTIFIABLE_EVENTS = new Set([
    'reaction.added',
    'comment.created',
    'follow.created',
    'follow.requested',
    'follow.request.accepted',
]);
let SocialQueueProcessor = class SocialQueueProcessor {
    followSuggestions;
    pgBoss;
    constructor(followSuggestions, pgBoss) {
        this.followSuggestions = followSuggestions;
        this.pgBoss = pgBoss;
    }
    async onApplicationBootstrap() {
        await this.pgBoss.boss.work(SOCIAL_QUEUE, (jobs) => this.handleBatch(jobs));
    }
    async handleBatch(jobs) {
        for (const { data } of jobs) {
            await this.relayToNotifications(data);
            await this.recomputeFollowSuggestions(data);
        }
    }
    async relayToNotifications({ event, payload, }) {
        if (!NOTIFIABLE_EVENTS.has(event))
            return;
        await this.pgBoss.boss.send(NOTIFICATIONS_QUEUE, { event, payload });
    }
    async recomputeFollowSuggestions({ event, payload, }) {
        if (event !== 'reaction.added' && event !== 'reaction.changed')
            return;
        const reaction = payload;
        if (reaction.type !== 'LIKE')
            return;
        await this.followSuggestions.recompute(reaction.userId);
    }
};
SocialQueueProcessor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FollowSuggestionsService,
        PgBossService])
], SocialQueueProcessor);
export { SocialQueueProcessor };
//# sourceMappingURL=social-queue.processor.js.map