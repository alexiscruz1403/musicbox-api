export declare class PrismaClient {
    $connect: import("vitest").Mock<import("@vitest/spy").Procedure>;
    $disconnect: import("vitest").Mock<import("@vitest/spy").Procedure>;
    $transaction: import("vitest").Mock<import("@vitest/spy").Procedure>;
    user: {
        findFirst: import("vitest").Mock<import("@vitest/spy").Procedure>;
        findUnique: import("vitest").Mock<import("@vitest/spy").Procedure>;
        findUniqueOrThrow: import("vitest").Mock<import("@vitest/spy").Procedure>;
        create: import("vitest").Mock<import("@vitest/spy").Procedure>;
        update: import("vitest").Mock<import("@vitest/spy").Procedure>;
        updateMany: import("vitest").Mock<import("@vitest/spy").Procedure>;
        delete: import("vitest").Mock<import("@vitest/spy").Procedure>;
        count: import("vitest").Mock<import("@vitest/spy").Procedure>;
    };
    refreshToken: {
        findMany: import("vitest").Mock<import("@vitest/spy").Procedure>;
        create: import("vitest").Mock<import("@vitest/spy").Procedure>;
        update: import("vitest").Mock<import("@vitest/spy").Procedure>;
        updateMany: import("vitest").Mock<import("@vitest/spy").Procedure>;
        delete: import("vitest").Mock<import("@vitest/spy").Procedure>;
    };
    notificationPreference: {
        create: import("vitest").Mock<import("@vitest/spy").Procedure>;
        findUnique: import("vitest").Mock<import("@vitest/spy").Procedure>;
        update: import("vitest").Mock<import("@vitest/spy").Procedure>;
    };
    review: {
        count: import("vitest").Mock<import("@vitest/spy").Procedure>;
    };
    follow: {
        findMany: import("vitest").Mock<import("@vitest/spy").Procedure>;
        findUnique: import("vitest").Mock<import("@vitest/spy").Procedure>;
        create: import("vitest").Mock<import("@vitest/spy").Procedure>;
        delete: import("vitest").Mock<import("@vitest/spy").Procedure>;
        count: import("vitest").Mock<import("@vitest/spy").Procedure>;
    };
}
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly DELETED: "DELETED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
declare class MockPrismaClientKnownRequestError extends Error {
    code: string;
    meta?: Record<string, unknown>;
    clientVersion: string;
    constructor(message: string, opts: {
        code: string;
        clientVersion?: string;
        meta?: Record<string, unknown>;
    });
}
declare class MockDecimal {
    private readonly value;
    constructor(value: string | number);
    toString(): string;
    toNumber(): number;
}
export declare const Prisma: {
    PrismaClientKnownRequestError: typeof MockPrismaClientKnownRequestError;
    Decimal: typeof MockDecimal;
};
export {};
