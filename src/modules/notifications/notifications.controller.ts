import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Sse,
  type MessageEvent,
} from '@nestjs/common';
import type { Response } from 'express';
import type { Observable } from 'rxjs';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { ListNotificationsQueryDto } from './dto/list-notifications-query.dto.js';
import { NotificationsSseService } from './notifications-sse.service.js';
import { NotificationsService } from './notifications.service.js';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly service: NotificationsService,
    private readonly sse: NotificationsSseService,
  ) {}

  @Get()
  async list(
    @CurrentUser() user: JwtPayload,
    @Query() query: ListNotificationsQueryDto,
  ) {
    const result = await this.service.list(user.sub, query);
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }

  @Patch(':id/read')
  async markRead(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return { data: await this.service.markRead(user.sub, id) };
  }

  @Post('read-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAllRead(@CurrentUser() user: JwtPayload): Promise<void> {
    await this.service.markAllRead(user.sub);
  }

  // Standard Bearer-header auth (same global JwtAuthGuard as every other
  // route) — native EventSource can't set that header, so the frontend must
  // consume this with fetch()/ReadableStream instead of new EventSource().
  // @Res({ passthrough: true }) lets us add a header without taking over
  // response handling — Nest still streams the returned Observable itself,
  // same passthrough usage as RecommendationsController's dynamic 204.
  @Sse('stream')
  stream(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ): Observable<MessageEvent> {
    // Tells an Nginx (or similar) reverse proxy in front of this server not
    // to buffer the response, which would otherwise delay/batch SSE events
    // instead of flushing them to the client as they're emitted.
    res.setHeader('X-Accel-Buffering', 'no');
    return this.sse.subscribe(user.sub);
  }
}
