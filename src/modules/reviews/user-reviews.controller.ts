import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { Public } from '../common/decorators/public.decorator.js';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { ListUserReviewsQueryDto } from './dto/list-user-reviews-query.dto.js';
import { ReviewsService } from './reviews.service.js';

// Lives in ReviewsModule, not UsersModule, even though the route is
// `users/:handle/reviews` — same no-shared-prefix precedent as
// AlbumTrackReviewsController in this module. Moving it here lets
// UsersModule drop its import of ReviewsModule entirely (it previously only
// needed ReviewsService for this one delegated endpoint), which in turn
// drops the transitive Users -> Reviews -> Social -> Events dependency
// chain — see docs/musicbox.md and the architecture review that flagged it.
@Public()
@UseGuards(OptionalJwtAuthGuard)
@Controller()
export class UserReviewsController {
  constructor(private readonly reviews: ReviewsService) {}

  @Get('users/:handle/reviews')
  async getReviews(
    @Param('handle') handle: string,
    @Query() query: ListUserReviewsQueryDto,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const result = await this.reviews.listByUserHandle(
      handle,
      query,
      req.user?.sub,
    );
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }
}
