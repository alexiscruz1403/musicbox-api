import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator.js';
import { ListTrendingQueryDto } from './dto/list-trending-query.dto.js';
import { TrendingService } from './trending.service.js';

@Public()
@Controller('trending')
export class TrendingController {
  constructor(private readonly service: TrendingService) {}

  @Get('albums')
  async getAlbums(@Query() query: ListTrendingQueryDto) {
    return { data: await this.service.getAlbums(query.limit) };
  }

  @Get('tracks')
  async getTracks(@Query() query: ListTrendingQueryDto) {
    return { data: await this.service.getTracks(query.limit) };
  }
}
