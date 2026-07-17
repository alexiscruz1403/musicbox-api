import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { RedisService } from '../../../redis/redis.service.js';
export declare class IdempotencyInterceptor implements NestInterceptor {
    private readonly redis;
    private readonly config;
    constructor(redis: RedisService, config: ConfigService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>>;
}
