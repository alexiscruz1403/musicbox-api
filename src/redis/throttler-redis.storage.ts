import { ThrottlerStorage } from '@nestjs/throttler';
import type { Redis } from 'ioredis';

interface StoredRecord {
  totalHits: number;
  blockExpiresAt: number;
}

interface ThrottlerStorageRecord {
  totalHits: number;
  timeToExpire: number;
  isBlocked: boolean;
  timeToBlockExpire: number;
}

export class ThrottlerRedisStorage implements ThrottlerStorage {
  constructor(private readonly client: Redis) {}

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    _throttlerName: string,
  ): Promise<ThrottlerStorageRecord> {
    const now = Date.now();
    const raw = await this.client.get(key);

    const stored: StoredRecord = raw
      ? (JSON.parse(raw) as StoredRecord)
      : { totalHits: 0, blockExpiresAt: 0 };

    stored.totalHits += 1;

    const isBlocked = stored.totalHits > limit;
    if (isBlocked && stored.blockExpiresAt === 0) {
      stored.blockExpiresAt = now + blockDuration * 1000;
    }

    const timeToExpire = Math.ceil(ttl);
    await this.client.set(key, JSON.stringify(stored), 'EX', timeToExpire);

    return {
      totalHits: stored.totalHits,
      timeToExpire,
      isBlocked,
      timeToBlockExpire: isBlocked
        ? Math.max(0, Math.ceil((stored.blockExpiresAt - now) / 1000))
        : 0,
    };
  }
}
