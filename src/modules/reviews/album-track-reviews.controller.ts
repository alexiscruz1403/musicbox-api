import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator.js';
import { ListReviewsQueryDto } from './dto/list-reviews-query.dto.js';
import { ReviewsService } from './reviews.service.js';

@Public()
@Controller()
export class AlbumTrackReviewsController {
  constructor(private readonly reviews: ReviewsService) {}

  @Get('albums/:deezerId/reviews')
  async listByAlbum(
    @Param('deezerId') deezerId: string,
    @Query() query: ListReviewsQueryDto,
  ) {
    const result = await this.reviews.listByAlbum(deezerId, query);
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }

  @Get('tracks/:deezerId/reviews')
  async listByTrack(
    @Param('deezerId') deezerId: string,
    @Query() query: ListReviewsQueryDto,
  ) {
    const result = await this.reviews.listByTrack(deezerId, query);
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }
}
