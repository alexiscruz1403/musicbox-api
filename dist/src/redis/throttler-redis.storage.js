export class ThrottlerRedisStorage {
    client;
    constructor(client) {
        this.client = client;
    }
    async increment(key, ttl, limit, blockDuration, _throttlerName) {
        const now = Date.now();
        const raw = await this.client.get(key);
        const stored = raw
            ? JSON.parse(raw)
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
//# sourceMappingURL=throttler-redis.storage.js.map