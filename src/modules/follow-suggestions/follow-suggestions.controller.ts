import { Controller, Get } from '@nestjs/common';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FollowSuggestionsService } from './follow-suggestions.service.js';

@Controller('follow-suggestions')
export class FollowSuggestionsController {
  constructor(private readonly service: FollowSuggestionsService) {}

  @Get()
  async getSuggestions(@CurrentUser() user: JwtPayload) {
    return { data: await this.service.getSuggestions(user.sub) };
  }
}
