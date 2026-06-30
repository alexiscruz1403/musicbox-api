var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { OptionalJwtAuthGuard } from './guards/optional-jwt-auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';
import { IdempotencyInterceptor } from './interceptors/idempotency.interceptor.js';
let CommonModule = class CommonModule {
};
CommonModule = __decorate([
    Module({
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
], CommonModule);
export { CommonModule };
//# sourceMappingURL=common.module.js.map