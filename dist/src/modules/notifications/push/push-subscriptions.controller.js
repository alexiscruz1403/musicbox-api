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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, Req, } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { Public } from '../../common/decorators/public.decorator.js';
import { CreatePushSubscriptionDto } from './dto/create-push-subscription.dto.js';
import { PushSubscriptionsService } from './push-subscriptions.service.js';
let PushSubscriptionsController = class PushSubscriptionsController {
    push;
    constructor(push) {
        this.push = push;
    }
    getVapidPublicKey() {
        return { data: { publicKey: this.push.getVapidPublicKey() } };
    }
    async subscribe(user, dto, req) {
        await this.push.subscribe(user.sub, dto, req.headers['user-agent']);
    }
    async unsubscribe(user, endpoint) {
        await this.push.unsubscribe(user.sub, endpoint);
    }
};
__decorate([
    Public(),
    Get('vapid-public-key'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PushSubscriptionsController.prototype, "getVapidPublicKey", null);
__decorate([
    Post('subscriptions'),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreatePushSubscriptionDto, Object]),
    __metadata("design:returntype", Promise)
], PushSubscriptionsController.prototype, "subscribe", null);
__decorate([
    Delete('subscriptions'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Query('endpoint')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PushSubscriptionsController.prototype, "unsubscribe", null);
PushSubscriptionsController = __decorate([
    Controller('push'),
    __metadata("design:paramtypes", [PushSubscriptionsService])
], PushSubscriptionsController);
export { PushSubscriptionsController };
//# sourceMappingURL=push-subscriptions.controller.js.map