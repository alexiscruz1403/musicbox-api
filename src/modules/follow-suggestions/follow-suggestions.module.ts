import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import {
  NOTIFICATIONS_QUEUE,
  RECOMMENDATIONS_QUEUE,
} from '../events/events.constants.js';
import { FollowSuggestionsController } from './follow-suggestions.controller.js';
import { FollowSuggestionsRepository } from './follow-suggestions.repository.js';
import { FollowSuggestionsService } from './follow-suggestions.service.js';
import { ReviewsQueueProcessor } from './processors/reviews-queue.processor.js';
import { SocialQueueProcessor } from './processors/social-queue.processor.js';

@Module({
  // NOTIFICATIONS_QUEUE/RECOMMENDATIONS_QUEUE are already created (with their
  // defaultJobOptions) by EventsModule; re-registering the same names here
  // just obtains the local @InjectQueue() tokens for the relays in
  // SocialQueueProcessor/ReviewsQueueProcessor — the standard @nestjs/bullmq
  // pattern for multi-module queue access.
  imports: [
    BullModule.registerQueue(
      { name: NOTIFICATIONS_QUEUE },
      { name: RECOMMENDATIONS_QUEUE },
    ),
  ],
  controllers: [FollowSuggestionsController],
  providers: [
    FollowSuggestionsService,
    FollowSuggestionsRepository,
    ReviewsQueueProcessor,
    SocialQueueProcessor,
  ],
})
export class FollowSuggestionsModule {}
