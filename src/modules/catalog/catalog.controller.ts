import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { Public } from '../common/decorators/public.decorator.js';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { ArtistDetailService } from './artist-detail.service.js';
import { CatalogHistoryService } from './catalog-history.service.js';
import { CatalogQuickSearchService } from './catalog-quick-search.service.js';
import { CatalogService } from './catalog.service.js';
import { ArtistTracksQueryDto } from './dto/artist-tracks-query.dto.js';
import { QuickSearchCatalogDto } from './dto/quick-search-catalog.dto.js';
import { SearchCatalogDto } from './dto/search-catalog.dto.js';

@Public()
@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly catalog: CatalogService,
    private readonly artistDetail: ArtistDetailService,
    private readonly quickSearch: CatalogQuickSearchService,
    private readonly history: CatalogHistoryService,
  ) {}

  @Get('search')
  @UseGuards(OptionalJwtAuthGuard)
  async search(
    @Query() dto: SearchCatalogDto,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const result = await this.catalog.search(
      dto.q,
      dto.type,
      dto.limit,
      dto.cursor ?? null,
      req.user?.sub,
    );
    if (req.user) {
      await this.history.recordSearch(req.user.sub, dto.q);
    }
    return { data: result };
  }

  @Get('quick-search')
  @Throttle({ default: { limit: 30, ttl: 60 } })
  async quickSearchCatalog(@Query() dto: QuickSearchCatalogDto) {
    return { data: await this.quickSearch.quickSearch(dto.q) };
  }

  @Get('albums/:deezerId')
  @UseGuards(OptionalJwtAuthGuard)
  async getAlbum(
    @Param('deezerId') deezerId: string,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const album = await this.catalog.getAlbum(deezerId, req.user?.sub);
    if (req.user) {
      await this.history.recordAlbumView(req.user.sub, album);
    }
    return { data: album };
  }

  @Get('tracks/:deezerId')
  @UseGuards(OptionalJwtAuthGuard)
  async getTrack(
    @Param('deezerId') deezerId: string,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const track = await this.catalog.getTrack(deezerId, req.user?.sub);
    if (req.user) {
      await this.history.recordTrackView(req.user.sub, track);
    }
    return { data: track };
  }

  @Get('artists/:deezerId/albums')
  async getArtistAlbums(
    @Param('deezerId') deezerId: string,
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
  ) {
    const parsedLimit = limit
      ? Math.min(Math.max(parseInt(limit, 10), 1), 50)
      : 20;
    return {
      data: await this.catalog.getArtistAlbums(
        deezerId,
        parsedLimit,
        cursor ?? null,
      ),
    };
  }

  @Get('artists/:deezerId')
  async getArtist(@Param('deezerId') deezerId: string) {
    return { data: await this.catalog.getArtist(deezerId) };
  }

  @Get('artists/:deezerId/detail')
  @UseGuards(OptionalJwtAuthGuard)
  async getArtistDetail(
    @Param('deezerId') deezerId: string,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const detail = await this.artistDetail.getDetail(deezerId);
    if (req.user) {
      await this.history.recordArtistView(req.user.sub, detail.artist);
    }
    return { data: detail };
  }

  @Get('artists/:deezerId/tracks')
  async getArtistTracks(
    @Param('deezerId') deezerId: string,
    @Query() dto: ArtistTracksQueryDto,
  ) {
    return {
      data: await this.catalog.getArtistTracks(
        deezerId,
        dto.limit,
        dto.cursor ?? null,
      ),
    };
  }
}
