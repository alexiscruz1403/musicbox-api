import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator.js';
import { CatalogService } from './catalog.service.js';
import { SearchCatalogDto } from './dto/search-catalog.dto.js';

@Public()
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('search')
  async search(@Query() dto: SearchCatalogDto) {
    return {
      data: await this.catalog.search(
        dto.q,
        dto.type,
        dto.limit,
        dto.cursor ?? null,
      ),
    };
  }

  @Get('albums/:deezerId')
  async getAlbum(@Param('deezerId') deezerId: string) {
    return { data: await this.catalog.getAlbum(deezerId) };
  }

  @Get('tracks/:deezerId')
  async getTrack(@Param('deezerId') deezerId: string) {
    return { data: await this.catalog.getTrack(deezerId) };
  }

  @Get('artists/:deezerId/albums')
  async getArtistAlbums(
    @Param('deezerId') deezerId: string,
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
  ) {
    const parsedLimit = limit ? Math.min(Math.max(parseInt(limit, 10), 1), 50) : 20;
    return {
      data: await this.catalog.getArtistAlbums(deezerId, parsedLimit, cursor ?? null),
    };
  }

  @Get('artists/:deezerId')
  async getArtist(@Param('deezerId') deezerId: string) {
    return { data: await this.catalog.getArtist(deezerId) };
  }
}
