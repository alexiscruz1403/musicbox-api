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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Request } from 'express';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  async getMe(@CurrentUser() user: JwtPayload) {
    return { data: await this.users.getMe(user.sub) };
  }

  @Patch('me')
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
  )
  async uploadAvatar(
    @CurrentUser() user: JwtPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.users.uploadAvatar(user.sub, file.buffer);
    return { data: { avatarUrl: url } };
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMe(@CurrentUser() user: JwtPayload) {
    await this.users.deleteAccount(user.sub);
  }

  @Get('me/notifications-prefs')
  async getNotifPrefs(@CurrentUser() user: JwtPayload) {
    return { data: await this.users.getNotifPrefs(user.sub) };
  }

  @Patch('me/notifications-prefs')
  async updateNotifPrefs(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateNotifPrefsDto,
  ) {
    return { data: await this.users.updateNotifPrefs(user.sub, dto) };
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
  async getFollowers(
    @Param('handle') handle: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return {
      data: await this.users.getFollowers(
        handle,
        cursor,
        limit ? parseInt(limit, 10) : undefined,
      ),
    };
  }

  @Public()
  @Get(':handle/following')
  async getFollowing(
    @Param('handle') handle: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return {
      data: await this.users.getFollowing(
        handle,
        cursor,
        limit ? parseInt(limit, 10) : undefined,
      ),
    };
  }

  @Public()
  @Get(':handle/reviews')
  getReviews() {
    return { data: [] };
  }

  @Post(':handle/follow')
  @HttpCode(HttpStatus.NO_CONTENT)
  async follow(
    @CurrentUser() user: JwtPayload,
    @Param('handle') handle: string,
  ) {
    await this.users.follow(user.sub, handle);
  }

  @Delete(':handle/follow')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollow(
    @CurrentUser() user: JwtPayload,
    @Param('handle') handle: string,
  ) {
    await this.users.unfollow(user.sub, handle);
  }
}
