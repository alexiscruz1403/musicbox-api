import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import type { JwtPayload } from '../../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { Public } from '../../common/decorators/public.decorator.js';
import { CreatePushSubscriptionDto } from './dto/create-push-subscription.dto.js';
import { PushSubscriptionsService } from './push-subscriptions.service.js';

@Controller('push')
export class PushSubscriptionsController {
  constructor(private readonly push: PushSubscriptionsService) {}

  // @Public(): the client needs this before/independent of subscribing to a
  // particular account, to call PushManager.subscribe({applicationServerKey}).
  @Public()
  @Get('vapid-public-key')
  getVapidPublicKey() {
    return { data: { publicKey: this.push.getVapidPublicKey() } };
  }

  // Upsert by endpoint — no meaningful "created" vs "updated" distinction to
  // report back, and the sibling DELETE below is already 204 for the same
  // reason. Nothing in the response body either way.
  @Post('subscriptions')
  @HttpCode(HttpStatus.NO_CONTENT)
  async subscribe(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreatePushSubscriptionDto,
    @Req() req: Request,
  ): Promise<void> {
    await this.push.subscribe(user.sub, dto, req.headers['user-agent']);
  }

  // 204 whether or not a matching row existed — the browser may call
  // unsubscribe() more than once (e.g. from a pushsubscriptionchange handler
  // and an explicit user action), so this must be a safe no-op either way.
  @Delete('subscriptions')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unsubscribe(
    @CurrentUser() user: JwtPayload,
    @Query('endpoint') endpoint: string,
  ): Promise<void> {
    await this.push.unsubscribe(user.sub, endpoint);
  }
}
