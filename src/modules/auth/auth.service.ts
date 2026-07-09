import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { OAuth2Client, LoginTicket } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';
import type { Request } from 'express';
import sanitizeHtml from 'sanitize-html';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RedisService } from '../../redis/redis.service.js';
import { EmailService } from '../../email/email.service.js';
import type { RegisterDto } from './dto/register.dto.js';
import type { JwtPayload } from './strategies/jwt.strategy.js';

const ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
};

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
    private readonly email: EmailService,
    private readonly config: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(
      config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async register(
    dto: RegisterDto,
    req: Request,
  ): Promise<TokenPair & { user: object }> {
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { handle: dto.handle }] },
    });
    if (existing?.email === dto.email) {
      throw new ConflictException({
        code: 'EMAIL_TAKEN',
        message: 'El email ya está en uso.',
      });
    }
    if (existing?.handle === dto.handle) {
      throw new ConflictException({
        code: 'HANDLE_TAKEN',
        message: 'El handle ya está en uso.',
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

  async validateLocalUser(
    email: string,
    password: string,
  ): Promise<JwtPayload | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user?.passwordHash) return null;
    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) return null;
    return {
      sub: user.id,
      handle: user.handle,
      email: user.email,
      status: user.status,
      role: user.role,
    };
  }

  async login(
    payload: JwtPayload,
    req: Request,
  ): Promise<TokenPair & { user: object }> {
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

  async refresh(rawToken: string, req: Request): Promise<TokenPair> {
    const tokens = await this.prisma.refreshToken.findMany({
      where: { revokedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { user: { select: { id: true } } },
    });

    let matched: (typeof tokens)[number] | null = null;
    for (const t of tokens) {
      if (await argon2.verify(t.tokenHash, rawToken)) {
        matched = t;
        break;
      }
    }

    if (!matched)
      throw new UnauthorizedException({
        code: 'INVALID_REFRESH_TOKEN',
        message: 'Refresh token inválido o expirado.',
      });

    await this.prisma.refreshToken.update({
      where: { id: matched.id },
      data: { revokedAt: new Date() },
    });
    return this.issueTokens(matched.userId, req);
  }

  async logout(userId: string, rawToken: string): Promise<void> {
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

  async googleAuth(
    idToken: string,
    req: Request,
  ): Promise<TokenPair & { user: object }> {
    let ticket: LoginTicket;
    try {
      ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      });
    } catch {
      throw new UnauthorizedException({
        code: 'INVALID_GOOGLE_TOKEN',
        message: 'Token de Google inválido o expirado.',
      });
    }
    const payload = ticket.getPayload();
    if (!payload?.sub)
      throw new UnauthorizedException({
        code: 'INVALID_GOOGLE_TOKEN',
        message: 'Token de Google inválido.',
      });

    const { sub: googleId, email, name } = payload;
    if (!email)
      throw new UnauthorizedException({
        code: 'GOOGLE_NO_EMAIL',
        message: 'La cuenta de Google no tiene email.',
      });

    let user = await this.prisma.user.findUnique({ where: { googleId } });

    if (!user) {
      const byEmail = await this.prisma.user.findUnique({ where: { email } });
      if (byEmail) {
        user = await this.prisma.user.update({
          where: { id: byEmail.id },
          data: { googleId },
        });
      } else {
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

  async forgotPassword(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return;
    // Google-only accounts have no passwordHash to reset; stay silent to
    // avoid leaking account existence/provider via this endpoint.
    if (user.googleId && !user.passwordHash) return;

    const token = uuidv4();
    await this.redis.set(
      `pw-reset:${user.id}`,
      await argon2.hash(token, ARGON2_OPTIONS),
      3600,
    );
    await this.email.sendPasswordResetEmail(user.email, user.id, token);
  }

  async resetPassword(
    userId: string,
    token: string,
    newPassword: string,
  ): Promise<void> {
    const stored = await this.redis.get(`pw-reset:${userId}`);
    if (!stored)
      throw new UnauthorizedException({
        code: 'INVALID_RESET_TOKEN',
        message: 'Token de reset inválido o expirado.',
      });

    const valid = await argon2.verify(stored, token);
    if (!valid)
      throw new UnauthorizedException({
        code: 'INVALID_RESET_TOKEN',
        message: 'Token de reset inválido o expirado.',
      });

    // Defense in depth: forgotPassword never issues tokens for Google-only
    // accounts, but reject here too in case a token exists via another path.
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user?.googleId && !user?.passwordHash) {
      throw new ForbiddenException({
        code: 'OAUTH_ACCOUNT_NO_PASSWORD',
        message:
          'Esta cuenta usa Google Sign-In y no tiene contraseña que restablecer.',
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

  async changeEmail(userId: string, newEmail: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado.',
      });
    }
    if (user.googleId && !user.passwordHash) {
      throw new ForbiddenException({
        code: 'OAUTH_ACCOUNT_EMAIL_LOCKED',
        message:
          'Esta cuenta usa Google Sign-In y no puede cambiar su email desde aquí.',
      });
    }
    if (newEmail === user.email) {
      throw new BadRequestException({
        code: 'SAME_EMAIL',
        message: 'El nuevo email debe ser diferente al actual.',
      });
    }
    const taken = await this.prisma.user.findUnique({
      where: { email: newEmail },
    });
    if (taken) {
      throw new ConflictException({
        code: 'EMAIL_TAKEN',
        message: 'El email ya está en uso.',
      });
    }

    const token = uuidv4();
    await this.redis.set(
      `change-email:${userId}`,
      JSON.stringify({
        tokenHash: await argon2.hash(token, ARGON2_OPTIONS),
        newEmail,
      }),
      3600,
    );
    await this.email.sendChangeEmailConfirmation(newEmail, userId, token);
  }

  async confirmChangeEmail(userId: string, token: string): Promise<void> {
    const stored = await this.redis.get(`change-email:${userId}`);
    if (!stored)
      throw new UnauthorizedException({
        code: 'INVALID_CHANGE_EMAIL_TOKEN',
        message: 'Token inválido o expirado.',
      });

    const { tokenHash, newEmail } = JSON.parse(stored) as {
      tokenHash: string;
      newEmail: string;
    };
    const valid = await argon2.verify(tokenHash, token);
    if (!valid)
      throw new UnauthorizedException({
        code: 'INVALID_CHANGE_EMAIL_TOKEN',
        message: 'Token inválido o expirado.',
      });

    // Defense in depth, mismo patrón que resetPassword.
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user?.googleId && !user?.passwordHash) {
      throw new ForbiddenException({
        code: 'OAUTH_ACCOUNT_EMAIL_LOCKED',
        message:
          'Esta cuenta usa Google Sign-In y no puede cambiar su email desde aquí.',
      });
    }
    // Re-chequeo por si el email fue tomado entre el request y el confirm.
    const taken = await this.prisma.user.findUnique({
      where: { email: newEmail },
    });
    if (taken && taken.id !== userId) {
      throw new ConflictException({
        code: 'EMAIL_TAKEN',
        message: 'El email ya está en uso.',
      });
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });
    await this.redis.del(`change-email:${userId}`);
  }

  private async issueTokens(userId: string, req: Request): Promise<TokenPair> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        handle: true,
        email: true,
        status: true,
        role: true,
      },
    });

    if (user.status === 'SUSPENDED') {
      throw new ForbiddenException({
        code: 'ACCOUNT_SUSPENDED',
        message: 'Tu cuenta está suspendida.',
      });
    }

    const jwtPayload: JwtPayload = {
      sub: user.id,
      handle: user.handle,
      email: user.email,
      status: user.status,
      role: user.role,
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

  private parseRefreshExpiry(): number {
    const raw = this.config.get<string>('REFRESH_TOKEN_EXPIRES_IN', '7d');
    const match = /^(\d+)([dhm])$/.exec(raw);
    if (!match) return 7 * 24 * 60 * 60 * 1000;
    const n = parseInt(match[1], 10);
    const unit = match[2];
    if (unit === 'd') return n * 24 * 60 * 60 * 1000;
    if (unit === 'h') return n * 60 * 60 * 1000;
    return n * 60 * 1000;
  }

  private async generateUniqueHandle(email: string): Promise<string> {
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
}
