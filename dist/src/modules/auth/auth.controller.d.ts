import type { Request } from 'express';
import { type I18nContext } from 'nestjs-i18n';
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
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto, req: Request): Promise<{
        data: import("./auth.service.js").TokenPair & {
            user: object;
        };
    }>;
    login(req: Request & {
        user: JwtPayload;
    }): Promise<{
        data: import("./auth.service.js").TokenPair & {
            user: object;
        };
    }>;
    refresh(dto: RefreshTokenDto, req: Request): Promise<{
        data: import("./auth.service.js").TokenPair;
    }>;
    logout(user: JwtPayload, dto: LogoutDto): Promise<void>;
    google(dto: GoogleAuthDto, req: Request): Promise<{
        data: import("./auth.service.js").TokenPair & {
            user: object;
        };
    }>;
    forgotPassword(dto: ForgotPasswordDto, i18n: I18nContext): Promise<{
        data: {
            message: string;
        };
    }>;
    resetPassword(dto: ResetPasswordDto, i18n: I18nContext): Promise<{
        data: {
            message: string;
        };
    }>;
    changeEmail(user: JwtPayload, dto: ChangeEmailDto, i18n: I18nContext): Promise<{
        data: {
            message: string;
        };
    }>;
    confirmChangeEmail(dto: ConfirmChangeEmailDto, i18n: I18nContext): Promise<{
        data: {
            message: string;
        };
    }>;
}
