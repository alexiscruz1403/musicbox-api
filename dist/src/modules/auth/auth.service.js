var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { OAuth2Client } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';
import sanitizeHtml from 'sanitize-html';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RedisService } from '../../redis/redis.service.js';
import { EmailService } from '../../email/email.service.js';
const ARGON2_OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
};
let AuthService = class AuthService {
    prisma;
    jwt;
    redis;
    email;
    config;
    googleClient;
    constructor(prisma, jwt, redis, email, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.redis = redis;
        this.email = email;
        this.config = config;
        this.googleClient = new OAuth2Client(config.getOrThrow('GOOGLE_CLIENT_ID'));
    }
    async register(dto, req) {
        const existing = await this.prisma.user.findFirst({
            where: { OR: [{ email: dto.email }, { handle: dto.handle }] },
        });
        if (existing?.email === dto.email) {
            throw new ConflictException({
                code: 'EMAIL_TAKEN',
            });
        }
        if (existing?.handle === dto.handle) {
            throw new ConflictException({
                code: 'HANDLE_TAKEN',
            });
        }
        const passwordHash = await argon2.hash(dto.password, ARGON2_OPTIONS);
        const displayName = sanitizeHtml(dto.displayName, {
            allowedTags: [],
            allowedAttributes: {},
        });
        const user = await this.prisma.$transaction(async (tx) => {
            const created = await tx.user.create({
                data: {
                    handle: dto.handle,
                    displayName,
                    email: dto.email,
                    passwordHash,
                    consentedAt: new Date(),
                },
            });
            await tx.notificationPreference.create({ data: { userId: created.id } });
            return created;
        });
        const tokens = await this.issueTokens(user.id, req);
        return {
            ...tokens,
            user: {
                id: user.id,
                handle: user.handle,
                displayName: user.displayName,
                email: user.email,
                status: user.status,
                role: user.role,
            },
        };
    }
    async validateLocalUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash)
            return null;
        const valid = await argon2.verify(user.passwordHash, password);
        if (!valid)
            return null;
        return {
            sub: user.id,
            handle: user.handle,
            email: user.email,
            status: user.status,
            role: user.role,
            language: user.language,
        };
    }
    async login(payload, req) {
        const tokens = await this.issueTokens(payload.sub, req);
        return {
            ...tokens,
            user: {
                id: payload.sub,
                handle: payload.handle,
                email: payload.email,
                status: payload.status,
                role: payload.role,
            },
        };
    }
    async refresh(rawToken, req) {
        const tokens = await this.prisma.refreshToken.findMany({
            where: { revokedAt: null, expiresAt: { gt: new Date() } },
            orderBy: { createdAt: 'desc' },
            take: 20,
            include: { user: { select: { id: true } } },
        });
        let matched = null;
        for (const t of tokens) {
            if (await argon2.verify(t.tokenHash, rawToken)) {
                matched = t;
                break;
            }
        }
        if (!matched)
            throw new UnauthorizedException({
                code: 'INVALID_REFRESH_TOKEN',
            });
        await this.prisma.refreshToken.update({
            where: { id: matched.id },
            data: { revokedAt: new Date() },
        });
        return this.issueTokens(matched.userId, req);
    }
    async logout(userId, rawToken) {
        const tokens = await this.prisma.refreshToken.findMany({
            where: { userId, revokedAt: null },
        });
        for (const t of tokens) {
            if (await argon2.verify(t.tokenHash, rawToken)) {
                await this.prisma.refreshToken.update({
                    where: { id: t.id },
                    data: { revokedAt: new Date() },
                });
                return;
            }
        }
    }
    async googleAuth(idToken, req) {
        let ticket;
        try {
            ticket = await this.googleClient.verifyIdToken({
                idToken,
                audience: this.config.getOrThrow('GOOGLE_CLIENT_ID'),
            });
        }
        catch {
            throw new UnauthorizedException({
                code: 'INVALID_GOOGLE_TOKEN',
            });
        }
        const payload = ticket.getPayload();
        if (!payload?.sub)
            throw new UnauthorizedException({
                code: 'INVALID_GOOGLE_TOKEN',
            });
        const { sub: googleId, email, name } = payload;
        if (!email)
            throw new UnauthorizedException({
                code: 'GOOGLE_NO_EMAIL',
            });
        let user = await this.prisma.user.findUnique({ where: { googleId } });
        if (!user) {
            const byEmail = await this.prisma.user.findUnique({ where: { email } });
            if (byEmail) {
                user = await this.prisma.user.update({
                    where: { id: byEmail.id },
                    data: { googleId },
                });
            }
            else {
                const handle = await this.generateUniqueHandle(email);
                user = await this.prisma.$transaction(async (tx) => {
                    const created = await tx.user.create({
                        data: {
                            handle,
                            displayName: name ?? handle,
                            email,
                            googleId,
                            consentedAt: new Date(),
                        },
                    });
                    await tx.notificationPreference.create({
                        data: { userId: created.id },
                    });
                    return created;
                });
            }
        }
        const tokens = await this.issueTokens(user.id, req);
        return {
            ...tokens,
            user: {
                id: user.id,
                handle: user.handle,
                displayName: user.displayName,
                email: user.email,
                status: user.status,
                role: user.role,
            },
        };
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return;
        if (user.googleId && !user.passwordHash)
            return;
        const token = uuidv4();
        await this.redis.set(`pw-reset:${user.id}`, await argon2.hash(token, ARGON2_OPTIONS), 3600);
        await this.email.sendPasswordResetEmail(user.email, user.id, token, user.language);
    }
    async resetPassword(userId, token, newPassword) {
        const stored = await this.redis.get(`pw-reset:${userId}`);
        if (!stored)
            throw new UnauthorizedException({
                code: 'INVALID_RESET_TOKEN',
            });
        const valid = await argon2.verify(stored, token);
        if (!valid)
            throw new UnauthorizedException({
                code: 'INVALID_RESET_TOKEN',
            });
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user?.googleId && !user?.passwordHash) {
            throw new ForbiddenException({
                code: 'OAUTH_ACCOUNT_NO_PASSWORD',
            });
        }
        const passwordHash = await argon2.hash(newPassword, ARGON2_OPTIONS);
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: { passwordHash },
            }),
            this.prisma.refreshToken.updateMany({
                where: { userId, revokedAt: null },
                data: { revokedAt: new Date() },
            }),
        ]);
        await this.redis.del(`pw-reset:${userId}`);
    }
    async changeEmail(userId, newEmail) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException({
                code: 'USER_NOT_FOUND',
            });
        }
        if (user.googleId && !user.passwordHash) {
            throw new ForbiddenException({
                code: 'OAUTH_ACCOUNT_EMAIL_LOCKED',
            });
        }
        if (newEmail === user.email) {
            throw new BadRequestException({
                code: 'SAME_EMAIL',
            });
        }
        const taken = await this.prisma.user.findUnique({
            where: { email: newEmail },
        });
        if (taken) {
            throw new ConflictException({
                code: 'EMAIL_TAKEN',
            });
        }
        const token = uuidv4();
        await this.redis.set(`change-email:${userId}`, JSON.stringify({
            tokenHash: await argon2.hash(token, ARGON2_OPTIONS),
            newEmail,
        }), 3600);
        await this.email.sendChangeEmailConfirmation(newEmail, userId, token, user.language);
    }
    async confirmChangeEmail(userId, token) {
        const stored = await this.redis.get(`change-email:${userId}`);
        if (!stored)
            throw new UnauthorizedException({
                code: 'INVALID_CHANGE_EMAIL_TOKEN',
            });
        const { tokenHash, newEmail } = JSON.parse(stored);
        const valid = await argon2.verify(tokenHash, token);
        if (!valid)
            throw new UnauthorizedException({
                code: 'INVALID_CHANGE_EMAIL_TOKEN',
            });
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user?.googleId && !user?.passwordHash) {
            throw new ForbiddenException({
                code: 'OAUTH_ACCOUNT_EMAIL_LOCKED',
            });
        }
        const taken = await this.prisma.user.findUnique({
            where: { email: newEmail },
        });
        if (taken && taken.id !== userId) {
            throw new ConflictException({
                code: 'EMAIL_TAKEN',
            });
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { email: newEmail },
        });
        await this.redis.del(`change-email:${userId}`);
    }
    async issueTokens(userId, req) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: {
                id: true,
                handle: true,
                email: true,
                status: true,
                role: true,
                language: true,
            },
        });
        if (user.status === 'SUSPENDED') {
            throw new ForbiddenException({
                code: 'ACCOUNT_SUSPENDED',
            });
        }
        const jwtPayload = {
            sub: user.id,
            handle: user.handle,
            email: user.email,
            status: user.status,
            role: user.role,
            language: user.language,
        };
        const accessToken = this.jwt.sign(jwtPayload);
        const rawToken = uuidv4();
        const tokenHash = await argon2.hash(rawToken, ARGON2_OPTIONS);
        const expiresAt = new Date(Date.now() + this.parseRefreshExpiry());
        await this.prisma.refreshToken.create({
            data: {
                userId,
                tokenHash,
                expiresAt,
                userAgent: req.headers['user-agent'] ?? null,
                ip: req.ip ?? null,
            },
        });
        return { accessToken, refreshToken: rawToken };
    }
    parseRefreshExpiry() {
        const raw = this.config.get('REFRESH_TOKEN_EXPIRES_IN', '7d');
        const match = /^(\d+)([dhm])$/.exec(raw);
        if (!match)
            return 7 * 24 * 60 * 60 * 1000;
        const n = parseInt(match[1], 10);
        const unit = match[2];
        if (unit === 'd')
            return n * 24 * 60 * 60 * 1000;
        if (unit === 'h')
            return n * 60 * 60 * 1000;
        return n * 60 * 1000;
    }
    async generateUniqueHandle(email) {
        const base = email
            .split('@')[0]
            .replace(/[^a-zA-Z0-9_]/g, '_')
            .slice(0, 25);
        let handle = base;
        let suffix = 1;
        while (await this.prisma.user.findUnique({ where: { handle } })) {
            handle = `${base}${suffix++}`;
        }
        return handle;
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService,
        RedisService,
        EmailService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map