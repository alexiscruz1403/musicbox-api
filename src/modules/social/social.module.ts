import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module.js';
import { CommentsController } from './comments.controller.js';
import { ReviewSocialController } from './review-social.controller.js';
import { SocialRepository } from './social.repository.js';
import { SocialService } from './social.service.js';

@Module({
  imports: [EventsModule],
  controllers: [ReviewSocialController, CommentsController],
  providers: [SocialService, SocialRepository],
  exports: [SocialService],
})
export class SocialModule {}
