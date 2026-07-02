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
};
class MockPrismaClientKnownRequestError extends Error {
    code;
    meta;
    clientVersion;
    constructor(message, opts) {
        super(message);
        this.code = opts.code;
        this.meta = opts.meta;
        this.clientVersion = opts.clientVersion ?? 'test';
    }
}
class MockDecimal {
    value;
    constructor(value) {
        this.value = String(value);
    }
    toString() {
        return this.value;
    }
    toNumber() {
        return Number(this.value);
    }
}
export const Prisma = {
    PrismaClientKnownRequestError: MockPrismaClientKnownRequestError,
    Decimal: MockDecimal,
};
//# sourceMappingURL=prisma-client.js.map