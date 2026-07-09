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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Query, UseGuards, } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { ListReportsQueryDto } from './dto/list-reports-query.dto.js';
import { UpdateReportStatusDto } from './dto/update-report-status.dto.js';
import { ModerationService } from './moderation.service.js';
let AdminModerationController = class AdminModerationController {
    moderation;
    constructor(moderation) {
        this.moderation = moderation;
    }
    async list(query) {
        const result = await this.moderation.listReports(query);
        return { data: result.items, meta: { cursor: result.nextCursor } };
    }
    async updateStatus(admin, id, dto) {
        return { data: await this.moderation.updateReportStatus(admin.sub, id, dto) };
    }
    async hideContent(type, id) {
        await this.moderation.hideContent(type, id);
    }
    async suspendUser(id) {
        await this.moderation.suspendUser(id);
    }
};
__decorate([
    Get('reports'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListReportsQueryDto]),
    __metadata("design:returntype", Promise)
], AdminModerationController.prototype, "list", null);
__decorate([
    Patch('reports/:id'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateReportStatusDto]),
    __metadata("design:returntype", Promise)
], AdminModerationController.prototype, "updateStatus", null);
__decorate([
    Patch('content/:type/:id/hide'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, Param('type')),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminModerationController.prototype, "hideContent", null);
__decorate([
    Patch('users/:id/suspend'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminModerationController.prototype, "suspendUser", null);
AdminModerationController = __decorate([
    Controller('admin'),
    UseGuards(RolesGuard),
    Roles('ADMIN'),
    __metadata("design:paramtypes", [ModerationService])
], AdminModerationController);
export { AdminModerationController };
//# sourceMappingURL=admin-moderation.controller.js.map