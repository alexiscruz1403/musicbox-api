import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RedisService } from '../../../redis/redis.service.js';

const IDEMPOTENCY_TTL = 86400; // 24h

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.headers['idempotency-key'];

    if (!key || typeof key !== 'string') {
      throw new BadRequestException({
        code: 'IDEMPOTENCY_KEY_REQUIRED',
        message: 'Header Idempotency-Key is required for this endpoint.',
      });
    }

    const redisKey = `idempotency:${key}`;
    const cached = await this.redis.get(redisKey);

    if (cached) {
      const response = context.switchToHttp().getResponse<Response>();
      response.setHeader('Idempotent-Replayed', 'true');

      return new Observable((subscriber) => {
        subscriber.next(JSON.parse(cached) as unknown);
        subscriber.complete();
      });
    }

    return next.handle().pipe(
      tap((responseBody: unknown) => {
        void this.redis.set(
          redisKey,
          JSON.stringify(responseBody),
          IDEMPOTENCY_TTL,
        );
      }),
    );
  }
}
