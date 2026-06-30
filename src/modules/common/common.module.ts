import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { OptionalJwtAuthGuard } from './guards/optional-jwt-auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';
import { IdempotencyInterceptor } from './interceptors/idempotency.interceptor.js';

@Module({
  providers: [
    JwtAuthGuard,
    OptionalJwtAuthGuard,
    RolesGuard,
    IdempotencyInterceptor,
  ],
  exports: [
    JwtAuthGuard,
    OptionalJwtAuthGuard,
    RolesGuard,
    IdempotencyInterceptor,
  ],
})
export class CommonModule {}
