import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../common/interceptors/idempotency.interceptor.js';
import { CreateReportDto } from './dto/create-report.dto.js';
import { ModerationService } from './moderation.service.js';

@Controller('reports')
export class ReportsController {
  constructor(private readonly moderation: ModerationService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 3600 } })
  @UseInterceptors(IdempotencyInterceptor)
  async create(@CurrentUser() user: JwtPayload, @Body() dto: CreateReportDto) {
    return { data: await this.moderation.createReport(user.sub, dto) };
  }
}
