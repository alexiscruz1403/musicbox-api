import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';
import { memoryStorage } from 'multer';
import type { Request, Response } from 'express';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { IdempotencyInterceptor } from '../common/interceptors/idempotency.interceptor.js';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { QuickSearchUsersDto } from './dto/quick-search-users.dto.js';
import { SearchUsersQueryDto } from './dto/search-users-query.dto.js';
import { UpdateFollowRequestStatusDto } from './dto/update-follow-request-status.dto.js';
import { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { FollowService } from './follow.service.js';
import { UserSearchHistoryService } from './user-search-history.service.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(
    private readonly users: UsersService,
    private readonly followService: FollowService,
    private readonly searchHistory: UserSearchHistoryService,
  ) {}

  @Get('me')
  async getMe(@CurrentUser() user: JwtPayload) {
    return { data: await this.users.getMe(user.sub) };
  }

  @Patch('me')
  @UseInterceptors(IdempotencyInterceptor)
  async updateMe(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateProfileDto,
  ) {
    return { data: await this.users.updateProfile(user.sub, dto) };
  }

  @Post('me/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Solo se permiten imágenes.'), false);
        }
        cb(null, true);
      },
    }),
    IdempotencyInterceptor,
  )
  async uploadAvatar(
    @CurrentUser() user: JwtPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.users.uploadAvatar(user.sub, file.buffer);
    return { data: { avatarUrl: url } };
  }

  @Post('me/cover')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Solo se permiten imágenes.'), false);
        }
        cb(null, true);
      },
    }),
    IdempotencyInterceptor,
  )
  async uploadCover(
    @CurrentUser() user: JwtPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.users.uploadCover(user.sub, file.buffer);
    return { data: { coverUrl: url } };
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMe(@CurrentUser() user: JwtPayload) {
    await this.users.deleteAccount(user.sub);
  }

  @Get('me/export')
  async exportMe(@CurrentUser() user: JwtPayload) {
    return { data: await this.users.exportAccountData(user.sub) };
  }

  @Get('me/notifications-prefs')
  async getNotifPrefs(@CurrentUser() user: JwtPayload) {
    return { data: await this.users.getNotifPrefs(user.sub) };
  }

  @Patch('me/notifications-prefs')
  @UseInterceptors(IdempotencyInterceptor)
  async updateNotifPrefs(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateNotifPrefsDto,
  ) {
    return { data: await this.users.updateNotifPrefs(user.sub, dto) };
  }

  @Get('me/follow-requests')
  async listFollowRequests(
    @CurrentUser() user: JwtPayload,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.followService.listFollowRequests(
      user.sub,
      cursor,
      limit ? parseInt(limit, 10) : undefined,
    );
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }

  @Patch('me/follow-requests/:id')
  async respondFollowRequest(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateFollowRequestStatusDto,
  ) {
    return {
      data: await this.followService.respondToFollowRequest(
        user.sub,
        id,
        dto.status,
      ),
    };
  }

  @Public()
  @Get('search')
  @UseGuards(OptionalJwtAuthGuard)
  async searchUsers(
    @Query() query: SearchUsersQueryDto,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const result = await this.users.searchUsers(
      query.q,
      query.cursor,
      query.limit,
      req.user?.sub,
    );
    if (req.user) {
      await this.searchHistory.recordSearch(req.user.sub, query.q);
    }
    return { data: result.items, meta: { cursor: result.nextCursor } };
  }

  @Public()
  @Get('quick-search')
  @Throttle({ default: { limit: 30, ttl: 60 } })
  @UseGuards(OptionalJwtAuthGuard)
  async quickSearchUsers(
    @Query() query: QuickSearchUsersDto,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    return {
      data: await this.users.quickSearchUsers(query.q, req.user?.sub),
    };
  }

  @Get('search-history')
  async listSearchHistory(@CurrentUser() user: JwtPayload) {
    return { data: await this.searchHistory.listHistory(user.sub) };
  }

  @Delete('search-history/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSearchHistoryItem(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
  ) {
    await this.searchHistory.deleteHistoryItem(user.sub, id);
  }

  @Delete('search-history')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllSearchHistory(@CurrentUser() user: JwtPayload) {
    await this.searchHistory.deleteAllHistory(user.sub);
  }

  @Public()
  @Get('check-handle')
  @UseGuards(OptionalJwtAuthGuard)
  async checkHandle(
    @Query('handle') handle: string,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    return { data: await this.users.checkHandle(handle, req.user?.sub) };
  }

  @Public()
  @Get(':handle')
  @UseGuards(OptionalJwtAuthGuard)
  async getPublicProfile(
    @Param('handle') handle: string,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    return { data: await this.users.getPublicProfile(handle, req.user?.sub) };
  }

  @Public()
  @Get(':handle/followers')
  @UseGuards(OptionalJwtAuthGuard)
  async getFollowers(
    @Param('handle') handle: string,
    @Req() req: Request & { user?: JwtPayload },
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return {
      data: await this.followService.getFollowers(
        handle,
        cursor,
        limit ? parseInt(limit, 10) : undefined,
        req.user?.sub,
      ),
    };
  }

  @Public()
  @Get(':handle/following')
  @UseGuards(OptionalJwtAuthGuard)
  async getFollowing(
    @Param('handle') handle: string,
    @Req() req: Request & { user?: JwtPayload },
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return {
      data: await this.followService.getFollowing(
        handle,
        cursor,
        limit ? parseInt(limit, 10) : undefined,
        req.user?.sub,
      ),
    };
  }

  @Post(':handle/follow')
  async follow(
    @CurrentUser() user: JwtPayload,
    @Param('handle') handle: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.followService.follow(user.sub, handle);
    if (result.status === 'PENDING') {
      res.status(HttpStatus.CREATED);
      return { data: result };
    }
    res.status(HttpStatus.NO_CONTENT);
  }

  @Delete(':handle/follow')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollow(
    @CurrentUser() user: JwtPayload,
    @Param('handle') handle: string,
  ) {
    await this.followService.unfollow(user.sub, handle);
  }
}
