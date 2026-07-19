import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RedisService } from '../../../redis/redis.service.js';

const DEFAULT_IDEMPOTENCY_TTL_SECONDS = 259200; // 72h

// Sentinel for void/204 responses (e.g. DELETE handlers returning undefined)
// — JSON.stringify(undefined) is the value `undefined`, not a string, which
// can't be written to Redis. Distinguishes "cached empty body" from "no
// cache entry yet" on replay.
const EMPTY_BODY_SENTINEL = '__IDEMPOTENT_EMPTY_BODY__';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.headers['idempotency-key'];

    if (!key || typeof key !== 'string') {
      throw new BadRequestException({
        code: 'IDEMPOTENCY_KEY_REQUIRED',
      });
    }

    const redisKey = `idempotency:${key}`;
    const cached = await this.redis.get(redisKey);

    if (cached) {
      const response = context.switchToHttp().getResponse<Response>();
      response.setHeader('Idempotent-Replayed', 'true');

      return new Observable((subscriber) => {
        subscriber.next(
          cached === EMPTY_BODY_SENTINEL
            ? undefined
            : (JSON.parse(cached) as unknown),
        );
        subscriber.complete();
      });
    }

    const ttl = this.config.get<number>(
      'IDEMPOTENCY_TTL_SECONDS',
      DEFAULT_IDEMPOTENCY_TTL_SECONDS,
    );

    return next.handle().pipe(
      tap((responseBody: unknown) => {
        const value =
          responseBody === undefined
            ? EMPTY_BODY_SENTINEL
            : JSON.stringify(responseBody);
        void this.redis.set(redisKey, value, ttl);
      }),
    );
  }
}
