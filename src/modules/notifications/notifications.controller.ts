import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Sse,
  type MessageEvent,
} from '@nestjs/common';
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
  @Sse('stream')
  stream(@CurrentUser() user: JwtPayload): Observable<MessageEvent> {
    return this.sse.subscribe(user.sub);
  }
}
