import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { IdempotencyInterceptor } from '../common/interceptors/idempotency.interceptor.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CreateReactionDto } from './dto/create-reaction.dto.js';
import { ListCommentsQueryDto } from './dto/list-comments-query.dto.js';
import { SocialService } from './social.service.js';

@Controller('reviews')
export class ReviewSocialController {
  constructor(private readonly social: SocialService) {}

  @Post(':id/reactions')
  @UseInterceptors(IdempotencyInterceptor)
  async react(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: CreateReactionDto,
  ) {
    return { data: await this.social.react(user.sub, id, dto) };
  }

  @Delete(':id/reactions')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeReaction(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
  ) {
    await this.social.removeReaction(user.sub, id);
  }

  @Public()
  @Get(':id/comments')
  async listComments(
    @Param('id') id: string,
    @Query() query: ListCommentsQueryDto,
  ) {
    const result = await this.social.listComments(id, query);
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }

  @Post(':id/comments')
  @Throttle({ default: { limit: 30, ttl: 3600 } })
  @UseInterceptors(IdempotencyInterceptor)
  async createComment(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return { data: await this.social.createComment(user.sub, id, dto) };
  }
}
