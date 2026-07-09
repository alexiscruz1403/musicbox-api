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
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, UseInterceptors, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { IdempotencyInterceptor } from '../common/interceptors/idempotency.interceptor.js';
import { AuthService } from './auth.service.js';
import { ChangeEmailDto } from './dto/change-email.dto.js';
import { ConfirmChangeEmailDto } from './dto/confirm-change-email.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { GoogleAuthDto } from './dto/google-auth.dto.js';
import { LogoutDto } from './dto/logout.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
let AuthController = class AuthController {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    async register(dto, req) {
        const result = await this.auth.register(dto, req);
        return { data: result };
    }
    async login(req) {
        const result = await this.auth.login(req.user, req);
        return { data: result };
    }
    async refresh(dto, req) {
        const result = await this.auth.refresh(dto.refreshToken, req);
        return { data: result };
    }
    async logout(user, dto) {
        await this.auth.logout(user.sub, dto.refreshToken);
    }
    async google(dto, req) {
        const result = await this.auth.googleAuth(dto.idToken, req);
        return { data: result };
    }
    async forgotPassword(dto) {
        await this.auth.forgotPassword(dto.email);
        return { data: { message: 'Email enviado si la cuenta existe.' } };
    }
    async resetPassword(dto) {
        await this.auth.resetPassword(dto.userId, dto.token, dto.newPassword);
        return { data: { message: 'Contraseña actualizada correctamente.' } };
    }
    async changeEmail(user, dto) {
        await this.auth.changeEmail(user.sub, dto.newEmail);
        return {
            data: { message: 'Email de confirmación enviado al nuevo correo.' },
        };
    }
    async confirmChangeEmail(dto) {
        await this.auth.confirmChangeEmail(dto.userId, dto.token);
        return { data: { message: 'Email actualizado correctamente.' } };
    }
};
__decorate([
    Public(),
    Post('register'),
    UseInterceptors(IdempotencyInterceptor),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Public(),
    Post('login'),
    HttpCode(HttpStatus.OK),
    UseGuards(AuthGuard('local')),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Public(),
    Post('refresh'),
    HttpCode(HttpStatus.OK),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RefreshTokenDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    Post('logout'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, LogoutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    Public(),
    Post('google'),
    HttpCode(HttpStatus.OK),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GoogleAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "google", null);
__decorate([
    Public(),
    Post('forgot-password'),
    HttpCode(HttpStatus.OK),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    Public(),
    Post('reset-password'),
    HttpCode(HttpStatus.OK),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    Post('change-email'),
    HttpCode(HttpStatus.OK),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ChangeEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changeEmail", null);
__decorate([
    Public(),
    Post('confirm-change-email'),
    HttpCode(HttpStatus.OK),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ConfirmChangeEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmChangeEmail", null);
AuthController = __decorate([
    Throttle({ default: { limit: 10, ttl: 900 } }),
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map