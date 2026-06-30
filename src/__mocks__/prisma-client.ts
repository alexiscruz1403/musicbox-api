import { vi } from 'vitest';

export class PrismaClient {
  $connect = vi.fn();
  $disconnect = vi.fn();
  $transaction = vi.fn();
  user = {
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  };
  refreshToken = {
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    delete: vi.fn(),
  };
  notificationPreference = {
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
  };
  review = { count: vi.fn() };
  follow = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  };
}

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED',
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
