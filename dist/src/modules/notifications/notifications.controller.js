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
import { Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Sse, } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { ListNotificationsQueryDto } from './dto/list-notifications-query.dto.js';
import { NotificationsSseService } from './notifications-sse.service.js';
import { NotificationsService } from './notifications.service.js';
let NotificationsController = class NotificationsController {
    service;
    sse;
    constructor(service, sse) {
        this.service = service;
        this.sse = sse;
    }
    async list(user, query) {
        const result = await this.service.list(user.sub, query);
        return { data: result.items, meta: { cursor: result.nextCursor } };
    }
    async markRead(user, id) {
        return { data: await this.service.markRead(user.sub, id) };
    }
    async markAllRead(user) {
        await this.service.markAllRead(user.sub);
    }
    stream(user) {
        return this.sse.subscribe(user.sub);
    }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ListNotificationsQueryDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "list", null);
__decorate([
    Patch(':id/read'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markRead", null);
__decorate([
    Post('read-all'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAllRead", null);
__decorate([
    Sse('stream'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Function)
], NotificationsController.prototype, "stream", null);
NotificationsController = __decorate([
    Controller('notifications'),
    __metadata("design:paramtypes", [NotificationsService,
        NotificationsSseService])
], NotificationsController);
export { NotificationsController };
//# sourceMappingURL=notifications.controller.js.map