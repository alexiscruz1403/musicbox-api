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
import { Controller, Get, Res } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { INSUFFICIENT_REVIEWS_HEADER, INSUFFICIENT_REVIEWS_STATUS, } from './recommendations.constants.js';
import { RecommendationsService } from './recommendations.service.js';
let RecommendationsController = class RecommendationsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getRecommendations(user, res) {
        const result = await this.service.getRecommendations(user.sub);
        if (!result) {
            res
                .status(204)
                .setHeader(INSUFFICIENT_REVIEWS_HEADER, INSUFFICIENT_REVIEWS_STATUS);
            return;
        }
        return { data: result };
    }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationsController.prototype, "getRecommendations", null);
RecommendationsController = __decorate([
    Controller('recommendations'),
    __metadata("design:paramtypes", [RecommendationsService])
], RecommendationsController);
export { RecommendationsController };
//# sourceMappingURL=recommendations.controller.js.map