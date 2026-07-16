import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CATALOG_QUEUE } from '../events/events.constants.js';
import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogSyncService } from './catalog-sync.service.js';
import { CatalogController } from './catalog.controller.js';
import { CatalogHistoryController } from './catalog-history.controller.js';
import { CatalogHistoryRepository } from './catalog-history.repository.js';
import { CatalogHistoryService } from './catalog-history.service.js';
import { CatalogQuickSearchService } from './catalog-quick-search.service.js';
import { CatalogRepository } from './catalog.repository.js';
import { CatalogService } from './catalog.service.js';
import { MUSIC_CATALOG_PROVIDER } from './providers/music-catalog.provider.js';
import { DeezerMusicCatalogProvider } from './providers/deezer/deezer.provider.js';
import { CatalogQueueProcessor } from './processors/catalog-queue.processor.js';
import { CatalogScheduler } from './scheduler/catalog.scheduler.js';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.getOrThrow<string>('DEEZER_BASE_URL'),
        timeout: 10_000,
      }),
    }),
    // CATALOG_QUEUE is already created (with its defaultJobOptions) by
    // EventsModule; re-registering the same name here just obtains the local
    // @InjectQueue() token for the scheduler/processor — the standard
    // @nestjs/bullmq pattern for multi-module queue access (see TrendingModule).
    BullModule.registerQueue({ name: CATALOG_QUEUE }),
  ],
  controllers: [CatalogController, CatalogHistoryController],
  providers: [
    CatalogService,
    CatalogRepository,
    CatalogSyncService,
    ArtistDetailService,
    CatalogScheduler,
    CatalogQueueProcessor,
    CatalogHistoryRepository,
    CatalogHistoryService,
    CatalogQuickSearchService,
    {
      provide: MUSIC_CATALOG_PROVIDER,
      useClass: DeezerMusicCatalogProvider,
    },
  ],
  exports: [CatalogService],
})
export class CatalogModule {}
