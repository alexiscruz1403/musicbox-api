var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, tap } from 'rxjs';
import { RedisService } from '../../../redis/redis.service.js';
const DEFAULT_IDEMPOTENCY_TTL_SECONDS = 259200;
const EMPTY_BODY_SENTINEL = '__IDEMPOTENT_EMPTY_BODY__';
let IdempotencyInterceptor = class IdempotencyInterceptor {
    redis;
    config;
    constructor(redis, config) {
        this.redis = redis;
        this.config = config;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const key = request.headers['idempotency-key'];
        if (!key || typeof key !== 'string') {
            throw new BadRequestException({
                code: 'IDEMPOTENCY_KEY_REQUIRED',
            });
        }
        const redisKey = `idempotency:${key}`;
        const cached = await this.redis.get(redisKey);
        if (cached) {
            const response = context.switchToHttp().getResponse();
            response.setHeader('Idempotent-Replayed', 'true');
            return new Observable((subscriber) => {
                subscriber.next(cached === EMPTY_BODY_SENTINEL
                    ? undefined
                    : JSON.parse(cached));
                subscriber.complete();
            });
        }
        const ttl = this.config.get('IDEMPOTENCY_TTL_SECONDS', DEFAULT_IDEMPOTENCY_TTL_SECONDS);
        return next.handle().pipe(tap((responseBody) => {
            const value = responseBody === undefined
                ? EMPTY_BODY_SENTINEL
                : JSON.stringify(responseBody);
            void this.redis.set(redisKey, value, ttl);
        }));
    }
};
IdempotencyInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RedisService,
        ConfigService])
], IdempotencyInterceptor);
export { IdempotencyInterceptor };
//# sourceMappingURL=idempotency.interceptor.js.map