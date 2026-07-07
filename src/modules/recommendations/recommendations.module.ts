import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CatalogModule } from '../catalog/catalog.module.js';
import { RECOMMENDATIONS_QUEUE } from '../events/events.constants.js';
import { LastFmClient } from './lastfm/lastfm.client.js';
import { RecommendationsQueueProcessor } from './processors/recommendations-queue.processor.js';
import { RecommendationsController } from './recommendations.controller.js';
import { RecommendationsRepository } from './recommendations.repository.js';
import { RecommendationsService } from './recommendations.service.js';
import { RecommendationsScheduler } from './scheduler/recommendations.scheduler.js';

@Module({
  imports: [
    // RECOMMENDATIONS_QUEUE is already created (with its defaultJobOptions)
    // by EventsModule; re-registering the same name here just obtains the
    // local @InjectQueue() token, same pattern as TrendingModule/FollowSuggestionsModule.
    BullModule.registerQueue({ name: RECOMMENDATIONS_QUEUE }),
    CatalogModule,
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>('LASTFM_BASE_URL'),
        timeout: 10_000,
      }),
    }),
  ],
  controllers: [RecommendationsController],
  providers: [
    RecommendationsService,
    RecommendationsRepository,
    LastFmClient,
    RecommendationsQueueProcessor,
    RecommendationsScheduler,
  ],
})
export class RecommendationsModule {}
