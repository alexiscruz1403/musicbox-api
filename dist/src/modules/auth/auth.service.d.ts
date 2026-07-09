import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RedisService } from '../../redis/redis.service.js';
import { EmailService } from '../../email/email.service.js';
import type { RegisterDto } from './dto/register.dto.js';
import type { JwtPayload } from './strategies/jwt.strategy.js';
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly redis;
    private readonly email;
    private readonly config;
    private readonly googleClient;
    constructor(prisma: PrismaService, jwt: JwtService, redis: RedisService, email: EmailService, config: ConfigService);
    register(dto: RegisterDto, req: Request): Promise<TokenPair & {
        user: object;
    }>;
    validateLocalUser(email: string, password: string): Promise<JwtPayload | null>;
    login(payload: JwtPayload, req: Request): Promise<TokenPair & {
        user: object;
    }>;
    refresh(rawToken: string, req: Request): Promise<TokenPair>;
    logout(userId: string, rawToken: string): Promise<void>;
    googleAuth(idToken: string, req: Request): Promise<TokenPair & {
        user: object;
    }>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(userId: string, token: string, newPassword: string): Promise<void>;
    changeEmail(userId: string, newEmail: string): Promise<void>;
    confirmChangeEmail(userId: string, token: string): Promise<void>;
    private issueTokens;
    private parseRefreshExpiry;
    private generateUniqueHandle;
}
