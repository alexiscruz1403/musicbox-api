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
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { SocialService } from './social.service.js';
let CommentsController = class CommentsController {
    social;
    constructor(social) {
        this.social = social;
    }
    async update(user, id, dto) {
        return { data: await this.social.updateComment(user.sub, id, dto) };
    }
    async remove(user, id) {
        await this.social.removeComment(user.sub, id);
    }
};
__decorate([
    Patch(':id'),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "remove", null);
CommentsController = __decorate([
    Controller('comments'),
    __metadata("design:paramtypes", [SocialService])
], CommentsController);
export { CommentsController };
//# sourceMappingURL=comments.controller.js.map