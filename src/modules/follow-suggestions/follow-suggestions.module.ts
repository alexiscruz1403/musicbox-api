import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NOTIFICATIONS_QUEUE } from '../events/events.constants.js';
import { FollowSuggestionsController } from './follow-suggestions.controller.js';
import { FollowSuggestionsRepository } from './follow-suggestions.repository.js';
import { FollowSuggestionsService } from './follow-suggestions.service.js';
import { ReviewsQueueProcessor } from './processors/reviews-queue.processor.js';
import { SocialQueueProcessor } from './processors/social-queue.processor.js';

@Module({
  // NOTIFICATIONS_QUEUE is already created (with its defaultJobOptions) by
  // EventsModule; re-registering the same name here just obtains the local
  // @InjectQueue() token for SocialQueueProcessor's relay — the standard
  // @nestjs/bullmq pattern for multi-module queue access.
  imports: [BullModule.registerQueue({ name: NOTIFICATIONS_QUEUE })],
  controllers: [FollowSuggestionsController],
  providers: [
    FollowSuggestionsService,
    FollowSuggestionsRepository,
    ReviewsQueueProcessor,
    SocialQueueProcessor,
  ],
})
export class FollowSuggestionsModule {}
