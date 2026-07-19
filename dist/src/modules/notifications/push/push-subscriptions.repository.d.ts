import { PrismaService } from '../../../prisma/prisma.service.js';
export interface UpsertPushSubscriptionData {
    userId: string;
    endpoint: string;
    p256dh: string;
    auth: string;
    userAgent?: string;
}
export declare class PushSubscriptionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsert(data: UpsertPushSubscriptionData): import("../../../../generated/prisma/models.js").Prisma__PushSubscriptionClient<{
        id: string;
        createdAt: Date;
        userId: string;
        userAgent: string | null;
        endpoint: string;
        p256dh: string;
        auth: string;
        lastSeenAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    deleteByEndpoint(userId: string, endpoint: string): Promise<void>;
    deleteById(id: string): Promise<void>;
    listByUserId(userId: string): import("../../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        createdAt: Date;
        userId: string;
        userAgent: string | null;
        endpoint: string;
        p256dh: string;
        auth: string;
        lastSeenAt: Date;
    }[]>;
}
