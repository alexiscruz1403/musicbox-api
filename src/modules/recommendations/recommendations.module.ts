import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CatalogModule } from '../catalog/catalog.module.js';
import { LastFmClient } from './lastfm/lastfm.client.js';
import { RecommendationsQueueProcessor } from './processors/recommendations-queue.processor.js';
import { RecommendationsController } from './recommendations.controller.js';
import { RecommendationsRepository } from './recommendations.repository.js';
import { RecommendationsService } from './recommendations.service.js';
import { RecommendationsScheduler } from './scheduler/recommendations.scheduler.js';

@Module({
  imports: [
    // Las colas pg-boss las crea PgBossService (@Global); el scheduler/worker
    // acceden al bus vía PgBossService, sin registrar cola por módulo.
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
