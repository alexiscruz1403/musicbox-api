import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { IdempotencyInterceptor } from '../common/interceptors/idempotency.interceptor.js';
import { AuthService } from './auth.service.js';
import { ChangeEmailDto } from './dto/change-email.dto.js';
import { ConfirmChangeEmailDto } from './dto/confirm-change-email.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { GoogleAuthDto } from './dto/google-auth.dto.js';
import { LogoutDto } from './dto/logout.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
import type { JwtPayload } from './strategies/jwt.strategy.js';

@Throttle({ default: { limit: 10, ttl: 900 } })
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('register')
  @UseInterceptors(IdempotencyInterceptor)
  async register(@Body() dto: RegisterDto, @Req() req: Request) {
    const result = await this.auth.register(dto, req);
    return { data: result };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request & { user: JwtPayload }) {
    const result = await this.auth.login(req.user, req);
    return { data: result };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshTokenDto, @Req() req: Request) {
    const result = await this.auth.refresh(dto.refreshToken, req);
    return { data: result };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@CurrentUser() user: JwtPayload, @Body() dto: LogoutDto) {
    await this.auth.logout(user.sub, dto.refreshToken);
  }

  @Public()
  @Post('google')
  @HttpCode(HttpStatus.OK)
  async google(@Body() dto: GoogleAuthDto, @Req() req: Request) {
    const result = await this.auth.googleAuth(dto.idToken, req);
    return { data: result };
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.auth.forgotPassword(dto.email);
    return { data: { message: 'Email enviado si la cuenta existe.' } };
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.auth.resetPassword(dto.userId, dto.token, dto.newPassword);
    return { data: { message: 'Contraseña actualizada correctamente.' } };
  }

  @Post('change-email')
  @HttpCode(HttpStatus.OK)
  async changeEmail(
    @CurrentUser() user: JwtPayload,
    @Body() dto: ChangeEmailDto,
  ) {
    await this.auth.changeEmail(user.sub, dto.newEmail);
    return {
      data: { message: 'Email de confirmación enviado al nuevo correo.' },
    };
  }

  @Public()
  @Post('confirm-change-email')
  @HttpCode(HttpStatus.OK)
  async confirmChangeEmail(@Body() dto: ConfirmChangeEmailDto) {
    await this.auth.confirmChangeEmail(dto.userId, dto.token);
    return { data: { message: 'Email actualizado correctamente.' } };
  }
}
