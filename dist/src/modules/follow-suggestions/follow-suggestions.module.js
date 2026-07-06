var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NOTIFICATIONS_QUEUE } from '../events/events.constants.js';
import { FollowSuggestionsController } from './follow-suggestions.controller.js';
import { FollowSuggestionsRepository } from './follow-suggestions.repository.js';
import { FollowSuggestionsService } from './follow-suggestions.service.js';
import { ReviewsQueueProcessor } from './processors/reviews-queue.processor.js';
import { SocialQueueProcessor } from './processors/social-queue.processor.js';
let FollowSuggestionsModule = class FollowSuggestionsModule {
};
FollowSuggestionsModule = __decorate([
    Module({
        imports: [BullModule.registerQueue({ name: NOTIFICATIONS_QUEUE })],
        controllers: [FollowSuggestionsController],
        providers: [
            FollowSuggestionsService,
            FollowSuggestionsRepository,
            ReviewsQueueProcessor,
            SocialQueueProcessor,
        ],
    })
], FollowSuggestionsModule);
export { FollowSuggestionsModule };
//# sourceMappingURL=follow-suggestions.module.js.map