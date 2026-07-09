var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { IdempotencyInterceptor } from '../common/interceptors/idempotency.interceptor.js';
import { CreateReportDto } from './dto/create-report.dto.js';
import { ModerationService } from './moderation.service.js';
let ReportsController = class ReportsController {
    moderation;
    constructor(moderation) {
        this.moderation = moderation;
    }
    async create(user, dto) {
        return { data: await this.moderation.createReport(user.sub, dto) };
    }
};
__decorate([
    Post(),
    Throttle({ default: { limit: 5, ttl: 3600 } }),
    UseInterceptors(IdempotencyInterceptor),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateReportDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "create", null);
ReportsController = __decorate([
    Controller('reports'),
    __metadata("design:paramtypes", [ModerationService])
], ReportsController);
export { ReportsController };
//# sourceMappingURL=reports.controller.js.map