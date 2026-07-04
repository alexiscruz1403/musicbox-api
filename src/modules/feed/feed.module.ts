import { Module } from '@nestjs/common';
import { SocialModule } from '../social/social.module.js';
import { FeedController } from './feed.controller.js';
import { FeedRepository } from './feed.repository.js';
import { FeedService } from './feed.service.js';

@Module({
  imports: [SocialModule],
  controllers: [FeedController],
  providers: [FeedService, FeedRepository],
})
export class FeedModule {}
