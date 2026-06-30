import type { Request } from 'express';
import { AuthService } from './auth.service.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { GoogleAuthDto } from './dto/google-auth.dto.js';
import { LogoutDto } from './dto/logout.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
import { VerifyEmailDto } from './dto/verify-email.dto.js';
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
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        data: {
            message: string;
        };
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        data: {
            message: string;
        };
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<{
        data: {
            message: string;
        };
    }>;
    resendVerification(user: JwtPayload): Promise<{
        data: {
            message: string;
        };
    }>;
}
