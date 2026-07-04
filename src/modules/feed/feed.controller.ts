import { Controller, Get, Query } from '@nestjs/common';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { ListFeedQueryDto } from './dto/list-feed-query.dto.js';
import { FeedService } from './feed.service.js';

@Controller('feed')
export class FeedController {
  constructor(private readonly feed: FeedService) {}

  @Get()
  async getFeed(
    @CurrentUser() user: JwtPayload,
    @Query() query: ListFeedQueryDto,
  ) {
    const result = await this.feed.getFeed(user.sub, query);
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }
}
