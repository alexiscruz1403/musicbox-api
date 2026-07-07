import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import {
  INSUFFICIENT_REVIEWS_HEADER,
  INSUFFICIENT_REVIEWS_STATUS,
} from './recommendations.constants.js';
import { RecommendationsService } from './recommendations.service.js';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly service: RecommendationsService) {}

  @Get()
  async getRecommendations(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.service.getRecommendations(user.sub);
    if (!result) {
      res
        .status(204)
        .setHeader(INSUFFICIENT_REVIEWS_HEADER, INSUFFICIENT_REVIEWS_STATUS);
      return;
    }

    return { data: result };
  }
}
