import { Module } from '@nestjs/common';
import { CatalogModule } from '../catalog/catalog.module.js';
import { EventsModule } from '../events/events.module.js';
import { SocialModule } from '../social/social.module.js';
import { AlbumTrackReviewsController } from './album-track-reviews.controller.js';
import { ReviewsController } from './reviews.controller.js';
import { ReviewsRepository } from './reviews.repository.js';
import { ReviewsService } from './reviews.service.js';

@Module({
  imports: [CatalogModule, EventsModule, SocialModule],
  controllers: [ReviewsController, AlbumTrackReviewsController],
  providers: [ReviewsService, ReviewsRepository],
  exports: [ReviewsService],
})
export class ReviewsModule {}
