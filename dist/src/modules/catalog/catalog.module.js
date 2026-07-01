var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CatalogController } from './catalog.controller.js';
import { CatalogRepository } from './catalog.repository.js';
import { CatalogService } from './catalog.service.js';
import { MUSIC_CATALOG_PROVIDER } from './providers/music-catalog.provider.js';
import { DeezerMusicCatalogProvider } from './providers/deezer/deezer.provider.js';
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
        controllers: [CatalogController],
        providers: [
            CatalogService,
            CatalogRepository,
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