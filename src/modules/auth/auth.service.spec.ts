import {
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { EmailService } from '../../email/email.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RedisService } from '../../redis/redis.service.js';
import { AuthService } from './auth.service.js';

vi.mock('argon2');
vi.mock('uuid', () => ({ v4: vi.fn().mockReturnValue('test-uuid') }));
vi.mock('google-auth-library', () => ({
  OAuth2Client: class {
    verifyIdToken() {
      return Promise.resolve({
        getPayload: () => ({
          sub: 'google-123',
          email: 'google@test.com',
          name: 'Google User',
        }),
      });
    }
  },
}));

const mockPrisma = {
  user: {
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  refreshToken: {
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
  },
  notificationPreference: { create: vi.fn() },
  $transaction: vi.fn(),
};

const mockJwt = { sign: vi.fn().mockReturnValue('access_token') };
const mockRedis = { get: vi.fn(), set: vi.fn(), del: vi.fn() };
const mockEmail = {
  sendVerificationEmail: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
};
const mockConfig = {
  getOrThrow: vi.fn((key: string) => {
    const vals: Record<string, string> = {
      GOOGLE_CLIENT_ID: 'google-id',
      JWT_SECRET: 'secret',
    };
    return vals[key] ?? key;
  }),
  get: vi.fn((_key: string, def: string) => def),
};

const mockReq = {
  headers: { 'user-agent': 'vitest' },
  ip: '127.0.0.1',
} as never;

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
        { provide: RedisService, useValue: mockRedis },
        { provide: EmailService, useValue: mockEmail },
        { provide: ConfigService, useValue: mockConfig },
      ],
    }).compile();

    service = module.get(AuthService);
    vi.clearAllMocks();
    vi.mocked(argon2.hash).mockResolvedValue('hashed_value');
    vi.mocked(argon2.verify).mockResolvedValue(true);
    mockJwt.sign.mockReturnValue('access_token');
  });

  describe('register', () => {
    it('throws 409 if email already taken', async () => {
      mockPrisma.user.findFirst.mockResolvedValue({
        email: 'a@a.com',
        handle: 'other',
      });
      await expect(
        service.register(
          {
            email: 'a@a.com',
            handle: 'new',
            displayName: 'Name',
            password: 'pass',
            consent: true,
          },
          mockReq,
        ),
      ).rejects.toThrow(ConflictException);
    });

    it('throws 409 if handle already taken', async () => {
      mockPrisma.user.findFirst.mockResolvedValue({
        email: 'other@b.com',
        handle: 'taken',
      });
      await expect(
        service.register(
          {
            email: 'new@b.com',
            handle: 'taken',
            displayName: 'Name',
            password: 'pass',
            consent: true,
          },
          mockReq,
        ),
      ).rejects.toThrow(ConflictException);
    });

    it('creates user, sends verification email, and returns tokens on success', async () => {
      mockPrisma.user.findFirst.mockResolvedValue(null);
      const createdUser = {
        id: 'user-1',
        handle: 'newuser',
        displayName: 'Name',
        email: 'new@b.com',
        status: 'ACTIVE',
        role: 'USER',
      };
      const createUser = vi.fn().mockResolvedValue(createdUser);
      mockPrisma.$transaction.mockImplementation(
        (fn: (tx: unknown) => unknown) =>
          fn({
            user: { create: createUser },
            notificationPreference: { create: vi.fn() },
          }),
      );
      mockPrisma.user.findUniqueOrThrow.mockResolvedValue(createdUser);
      mockPrisma.refreshToken.create.mockResolvedValue({});

      const result = await service.register(
        {
          email: 'new@b.com',
          handle: 'newuser',
          displayName: 'Name',
          password: 'pass12345',
          consent: true,
        },
        mockReq,
      );

      expect(mockEmail.sendVerificationEmail).toHaveBeenCalledWith(
        'new@b.com',
        'user-1',
        'test-uuid',
      );
      expect(result).toMatchObject({
        accessToken: 'access_token',
        refreshToken: 'test-uuid',
      });
      expect(createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            consentedAt: expect.any(Date) as Date,
          }),
        }),
      );
    });
  });

  describe('validateLocalUser', () => {
    it('returns null if user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      expect(await service.validateLocalUser('a@a.com', 'pass')).toBeNull();
    });

    it('returns null if password does not match', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        handle: 'h',
        email: 'a@a.com',
        status: 'ACTIVE',
        role: 'USER',
        passwordHash: 'hash',
      });
      vi.mocked(argon2.verify).mockResolvedValue(false);
      expect(await service.validateLocalUser('a@a.com', 'wrong')).toBeNull();
    });

    it('returns jwt payload on valid credentials', async () => {
      const user = {
        id: '1',
        handle: 'h',
        email: 'a@a.com',
        status: 'ACTIVE',
        role: 'USER',
        passwordHash: 'hash',
      };
      mockPrisma.user.findUnique.mockResolvedValue(user);
      const result = await service.validateLocalUser('a@a.com', 'correct');
      expect(result).toEqual({
        sub: '1',
        handle: 'h',
        email: 'a@a.com',
        status: 'ACTIVE',
        role: 'USER',
      });
    });
  });

  describe('login', () => {
    it('issues tokens and returns user shape from jwt payload', async () => {
      const payload = {
        sub: 'u1',
        handle: 'h',
        email: 'e@e.com',
        status: 'ACTIVE' as const,
        role: 'USER' as const,
      };
      mockPrisma.user.findUniqueOrThrow.mockResolvedValue({
        id: 'u1',
        handle: 'h',
        email: 'e@e.com',
        status: 'ACTIVE',
        role: 'USER',
      });
      mockPrisma.refreshToken.create.mockResolvedValue({});

      const result = await service.login(payload, mockReq);

      expect(result).toMatchObject({
        accessToken: 'access_token',
        refreshToken: 'test-uuid',
      });
      expect(result.user).toMatchObject({
        id: 'u1',
        handle: 'h',
        email: 'e@e.com',
      });
    });
  });

  describe('refresh', () => {
    it('throws if no matching token found', async () => {
      mockPrisma.refreshToken.findMany.mockResolvedValue([
        { id: 't1', tokenHash: 'hash', userId: 'u1' },
      ]);
      vi.mocked(argon2.verify).mockResolvedValue(false);
      await expect(service.refresh('bad-token', mockReq)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('rotates tokens on valid refresh', async () => {
      const token = {
        id: 't1',
        tokenHash: 'hash',
        userId: 'u1',
        revokedAt: null,
      };
      mockPrisma.refreshToken.findMany.mockResolvedValue([token]);
      vi.mocked(argon2.verify).mockResolvedValue(true);
      mockPrisma.refreshToken.update.mockResolvedValue({});
      mockPrisma.user.findUniqueOrThrow.mockResolvedValue({
        id: 'u1',
        handle: 'h',
        email: 'e@e.com',
        status: 'ACTIVE',
        role: 'USER',
      });
      mockPrisma.refreshToken.create.mockResolvedValue({});

      const result = await service.refresh('valid-token', mockReq);

      expect(result).toMatchObject({
        accessToken: 'access_token',
        refreshToken: 'test-uuid',
      });
      expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { revokedAt: expect.any(Date) as Date },
        }),
      );
    });

    it('rejects issuing tokens for a suspended user', async () => {
      const token = {
        id: 't1',
        tokenHash: 'hash',
        userId: 'u1',
        revokedAt: null,
      };
      mockPrisma.refreshToken.findMany.mockResolvedValue([token]);
      vi.mocked(argon2.verify).mockResolvedValue(true);
      mockPrisma.refreshToken.update.mockResolvedValue({});
      mockPrisma.user.findUniqueOrThrow.mockResolvedValue({
        id: 'u1',
        handle: 'h',
        email: 'e@e.com',
        status: 'SUSPENDED',
        role: 'USER',
      });

      await expect(service.refresh('valid-token', mockReq)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('logout', () => {
    it('revokes the matching refresh token', async () => {
      const tokens = [
        { id: 't1', tokenHash: 'hash1', userId: 'u1' },
        { id: 't2', tokenHash: 'hash2', userId: 'u1' },
      ];
      mockPrisma.refreshToken.findMany.mockResolvedValue(tokens);
      vi.mocked(argon2.verify)
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true);
      mockPrisma.refreshToken.update.mockResolvedValue({});

      await service.logout('u1', 'valid-token');

      expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 't2' },
          data: { revokedAt: expect.any(Date) as Date },
        }),
      );
    });
  });

  describe('forgotPassword', () => {
    it('does not throw and sends no email when user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(
        service.forgotPassword('nonexistent@a.com'),
      ).resolves.toBeUndefined();
      expect(mockEmail.sendPasswordResetEmail).not.toHaveBeenCalled();
    });

    it('stores hashed token in Redis and sends reset email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'a@a.com',
      });
      await service.forgotPassword('a@a.com');
      expect(mockRedis.set).toHaveBeenCalledWith(
        'pw-reset:u1',
        'hashed_value',
        3600,
      );
      expect(mockEmail.sendPasswordResetEmail).toHaveBeenCalledWith(
        'a@a.com',
        'u1',
        'test-uuid',
      );
    });
  });

  describe('resetPassword', () => {
    it('throws if no token in Redis', async () => {
      mockRedis.get.mockResolvedValue(null);
      await expect(
        service.resetPassword('u1', 'token', 'newpass'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('throws if token hash does not match', async () => {
      mockRedis.get.mockResolvedValue('stored-hash');
      vi.mocked(argon2.verify).mockResolvedValue(false);
      await expect(
        service.resetPassword('u1', 'wrong-token', 'newpass'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('updates password, revokes all tokens, and deletes Redis key on success', async () => {
      mockRedis.get.mockResolvedValue('stored-hash');
      vi.mocked(argon2.verify).mockResolvedValue(true);
      mockPrisma.$transaction.mockResolvedValue([{}, {}]);

      await service.resetPassword('u1', 'valid-token', 'newpass123');

      expect(mockPrisma.$transaction).toHaveBeenCalled();
      expect(mockRedis.del).toHaveBeenCalledWith('pw-reset:u1');
    });
  });

  describe('verifyEmail', () => {
    it('throws if token not in Redis', async () => {
      mockRedis.get.mockResolvedValue(null);
      await expect(service.verifyEmail('u1', 'token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('marks email as verified and deletes Redis key on success', async () => {
      mockRedis.get.mockResolvedValue('stored-hash');
      vi.mocked(argon2.verify).mockResolvedValue(true);
      mockPrisma.user.update.mockResolvedValue({});

      await service.verifyEmail('u1', 'valid-token');

      expect(mockPrisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { emailVerifiedAt: expect.any(Date) as Date },
        }),
      );
      expect(mockRedis.del).toHaveBeenCalledWith('email-verify:u1');
    });
  });

  describe('resendVerification', () => {
    it('does nothing if user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await service.resendVerification('u1', 'e@e.com');
      expect(mockEmail.sendVerificationEmail).not.toHaveBeenCalled();
    });

    it('does nothing if email already verified', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        emailVerifiedAt: new Date(),
      });
      await service.resendVerification('u1', 'e@e.com');
      expect(mockEmail.sendVerificationEmail).not.toHaveBeenCalled();
    });

    it('stores new token in Redis and sends verification email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        emailVerifiedAt: null,
      });
      await service.resendVerification('u1', 'e@e.com');
      expect(mockRedis.set).toHaveBeenCalledWith(
        'email-verify:u1',
        'hashed_value',
        86400,
      );
      expect(mockEmail.sendVerificationEmail).toHaveBeenCalledWith(
        'e@e.com',
        'u1',
        'test-uuid',
      );
    });
  });

  describe('googleAuth', () => {
    it('returns tokens for existing Google account', async () => {
      const existingUser = {
        id: 'u1',
        handle: 'existing',
        displayName: 'Existing User',
        email: 'google@test.com',
        status: 'ACTIVE',
        role: 'USER',
      };
      mockPrisma.user.findUnique.mockResolvedValue(existingUser);
      mockPrisma.user.findUniqueOrThrow.mockResolvedValue(existingUser);
      mockPrisma.refreshToken.create.mockResolvedValue({});

      const result = await service.googleAuth('valid-id-token', mockReq);

      expect(result).toMatchObject({
        accessToken: 'access_token',
        refreshToken: 'test-uuid',
      });
      expect(result.user).toMatchObject({ id: 'u1', handle: 'existing' });
    });

    it('creates new user and returns tokens for unknown Google account', async () => {
      const newUser = {
        id: 'u-new',
        handle: 'google_test',
        displayName: 'Google User',
        email: 'google@test.com',
        status: 'ACTIVE',
        role: 'USER',
      };
      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      mockPrisma.$transaction.mockImplementation(
        (fn: (tx: unknown) => unknown) =>
          fn({
            user: { create: vi.fn().mockResolvedValue(newUser) },
            notificationPreference: { create: vi.fn() },
          }),
      );
      mockPrisma.user.findUniqueOrThrow.mockResolvedValue(newUser);
      mockPrisma.refreshToken.create.mockResolvedValue({});

      const result = await service.googleAuth('valid-id-token', mockReq);

      expect(result).toMatchObject({ accessToken: 'access_token' });
      expect(result.user).toMatchObject({ email: 'google@test.com' });
    });
  });
});
