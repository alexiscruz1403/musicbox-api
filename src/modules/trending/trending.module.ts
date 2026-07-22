import { Module } from '@nestjs/common';
import { CatalogModule } from '../catalog/catalog.module.js';
import { TrendingQueueProcessor } from './processors/trending-queue.processor.js';
import { TrendingScheduler } from './scheduler/trending.scheduler.js';
import { TrendingController } from './trending.controller.js';
import { TrendingRepository } from './trending.repository.js';
import { TrendingService } from './trending.service.js';

@Module({
  // Las colas pg-boss las crea PgBossService (@Global) al arrancar; el
  // scheduler/processor acceden al bus vía PgBossService, sin registrar cola
  // por módulo.
  // CatalogModule: TrendingService falls back to CatalogService.getTrack()
  // for coverUrl when a track's local Album link isn't populated yet (see
  // TrendingService.resolveAlbumFallback, docs/fase-5-features.md).
  imports: [CatalogModule],
  controllers: [TrendingController],
  providers: [
    TrendingService,
    TrendingRepository,
    TrendingScheduler,
    TrendingQueueProcessor,
  ],
})
export class TrendingModule {}
