import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CatalogController } from './catalog.controller.js';
import { CatalogRepository } from './catalog.repository.js';
import { CatalogService } from './catalog.service.js';
import { MUSIC_CATALOG_PROVIDER } from './providers/music-catalog.provider.js';
import { DeezerMusicCatalogProvider } from './providers/deezer/deezer.provider.js';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.getOrThrow<string>('DEEZER_BASE_URL'),
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
export class CatalogModule {}
