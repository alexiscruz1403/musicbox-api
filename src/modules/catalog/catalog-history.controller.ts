import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { CatalogHistoryService } from './catalog-history.service.js';

// Deliberately a separate controller (not added to CatalogController, which
// carries a class-level @Public()) — @Public() only ever sets `true` and
// there is no method-level override, so a mandatory-auth route can't live
// on that class. Nest merges routes from multiple controllers sharing the
// same prefix, so this stays under /catalog with normal global-guard auth.
@Controller('catalog')
export class CatalogHistoryController {
  constructor(private readonly history: CatalogHistoryService) {}

  @Get('search-history')
  async listSearchHistory(@CurrentUser() user: JwtPayload) {
    return { data: await this.history.listSearchHistory(user.sub) };
  }

  @Delete('search-history/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSearchHistoryItem(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
  ) {
    await this.history.deleteSearchHistoryItem(user.sub, id);
  }

  @Delete('search-history')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllSearchHistory(@CurrentUser() user: JwtPayload) {
    await this.history.deleteAllSearchHistory(user.sub);
  }

  @Get('recently-viewed')
  async listRecentlyViewed(@CurrentUser() user: JwtPayload) {
    return { data: await this.history.listRecentlyViewed(user.sub) };
  }

  // Bundle prefetch for offline caching — full detail for the last 10
  // visited resources in a single round trip, instead of the client making
  // up to 10 separate detail requests right before going offline.
  @Get('recently-viewed/details')
  async listRecentlyViewedDetails(@CurrentUser() user: JwtPayload) {
    return { data: await this.history.getRecentlyViewedDetails(user.sub) };
  }
}
