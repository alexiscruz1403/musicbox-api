import { PrismaService } from '../../prisma/prisma.service.js';
import { RedisService } from '../../redis/redis.service.js';
export interface HealthResult {
    status: 'ok' | 'error';
    checks: {
        database: 'up' | 'down';
        redis: 'up' | 'down';
    };
}
export declare class HealthService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    check(): Promise<HealthResult>;
    private checkDatabase;
    private checkRedis;
}
