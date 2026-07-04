import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { Public } from '../common/decorators/public.decorator.js';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { ListReviewsQueryDto } from './dto/list-reviews-query.dto.js';
import { ReviewsService } from './reviews.service.js';

@Public()
@UseGuards(OptionalJwtAuthGuard)
@Controller()
export class AlbumTrackReviewsController {
  constructor(private readonly reviews: ReviewsService) {}

  @Get('albums/:deezerId/reviews')
  async listByAlbum(
    @Param('deezerId') deezerId: string,
    @Query() query: ListReviewsQueryDto,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const result = await this.reviews.listByAlbum(
      deezerId,
      query,
      req.user?.sub,
    );
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }

  @Get('tracks/:deezerId/reviews')
  async listByTrack(
    @Param('deezerId') deezerId: string,
    @Query() query: ListReviewsQueryDto,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const result = await this.reviews.listByTrack(
      deezerId,
      query,
      req.user?.sub,
    );
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }
}
