var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
let CatalogModule = class CatalogModule {
};
CatalogModule = __decorate([
    Module({
        imports: [
            HttpModule.registerAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    baseURL: config.getOrThrow('DEEZER_BASE_URL'),
                    timeout: 10_000,
                }),
            }),
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
], CatalogModule);
export { CatalogModule };
//# sourceMappingURL=catalog.module.js.map