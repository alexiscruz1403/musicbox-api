import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { CatalogModule } from '../catalog/catalog.module.js';
import { TRENDING_QUEUE } from '../events/events.constants.js';
import { TrendingQueueProcessor } from './processors/trending-queue.processor.js';
import { TrendingScheduler } from './scheduler/trending.scheduler.js';
import { TrendingController } from './trending.controller.js';
import { TrendingRepository } from './trending.repository.js';
import { TrendingService } from './trending.service.js';

@Module({
  // TRENDING_QUEUE is already created (with its defaultJobOptions) by
  // EventsModule; re-registering the same name here just obtains the local
  // @InjectQueue() token for the scheduler — the standard @nestjs/bullmq
  // pattern for multi-module queue access.
  // CatalogModule: TrendingService falls back to CatalogService.getTrack()
  // for coverUrl when a track's local Album link isn't populated yet (see
  // TrendingService.resolveAlbumFallback, docs/fase-5-features.md).
  imports: [BullModule.registerQueue({ name: TRENDING_QUEUE }), CatalogModule],
  controllers: [TrendingController],
  providers: [
    TrendingService,
    TrendingRepository,
    TrendingScheduler,
    TrendingQueueProcessor,
  ],
})
export class TrendingModule {}
