var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let RecommendationsModule = class RecommendationsModule {
};
RecommendationsModule = __decorate([
    Module({
        imports: [
            CatalogModule,
            HttpModule.registerAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    baseURL: config.get('LASTFM_BASE_URL'),
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
], RecommendationsModule);
export { RecommendationsModule };
//# sourceMappingURL=recommendations.module.js.map