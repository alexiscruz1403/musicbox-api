var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { CatalogModule } from '../catalog/catalog.module.js';
import { TrendingQueueProcessor } from './processors/trending-queue.processor.js';
import { TrendingScheduler } from './scheduler/trending.scheduler.js';
import { TrendingController } from './trending.controller.js';
import { TrendingRepository } from './trending.repository.js';
import { TrendingService } from './trending.service.js';
let TrendingModule = class TrendingModule {
};
TrendingModule = __decorate([
    Module({
        imports: [CatalogModule],
        controllers: [TrendingController],
        providers: [
            TrendingService,
            TrendingRepository,
            TrendingScheduler,
            TrendingQueueProcessor,
        ],
    })
], TrendingModule);
export { TrendingModule };
//# sourceMappingURL=trending.module.js.map