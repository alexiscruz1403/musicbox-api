import { Module } from '@nestjs/common';
import { FollowSuggestionsController } from './follow-suggestions.controller.js';
import { FollowSuggestionsRepository } from './follow-suggestions.repository.js';
import { FollowSuggestionsService } from './follow-suggestions.service.js';
import { ReviewsQueueProcessor } from './processors/reviews-queue.processor.js';
import { SocialQueueProcessor } from './processors/social-queue.processor.js';

@Module({
  controllers: [FollowSuggestionsController],
  providers: [
    FollowSuggestionsService,
    FollowSuggestionsRepository,
    ReviewsQueueProcessor,
    SocialQueueProcessor,
  ],
})
export class FollowSuggestionsModule {}
