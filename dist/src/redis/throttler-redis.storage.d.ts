import { ThrottlerStorage } from '@nestjs/throttler';
import type { Redis } from 'ioredis';
interface ThrottlerStorageRecord {
    totalHits: number;
    timeToExpire: number;
    isBlocked: boolean;
    timeToBlockExpire: number;
}
export declare class ThrottlerRedisStorage implements ThrottlerStorage {
    private readonly client;
    constructor(client: Redis);
    increment(key: string, ttl: number, limit: number, blockDuration: number, _throttlerName: string): Promise<ThrottlerStorageRecord>;
}
export {};
