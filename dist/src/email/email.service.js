var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
let EmailService = EmailService_1 = class EmailService {
    config;
    logger = new Logger(EmailService_1.name);
    transporter;
    from;
    frontendUrl;
    constructor(config) {
        this.config = config;
        this.from = config.getOrThrow('EMAIL_FROM');
        this.frontendUrl = config.getOrThrow('FRONTEND_URL');
        this.transporter = nodemailer.createTransport({
            host: config.getOrThrow('SMTP_HOST'),
            port: config.getOrThrow('SMTP_PORT'),
            secure: false,
            auth: {
                user: config.getOrThrow('SMTP_USER'),
                pass: config.getOrThrow('SMTP_PASS'),
            },
        });
    }
    async sendPasswordResetEmail(to, userId, token) {
        const link = `${this.frontendUrl}/reset-password?userId=${userId}&token=${token}`;
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: 'Restablecer contraseña en Vinlyst',
                html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${link}">${link}</a></p><p>El enlace expira en 1 hora.</p>`,
            });
        }
        catch (err) {
            this.logger.error(`Failed to send password reset email to ${to}`, err);
        }
    }
    async sendChangeEmailConfirmation(to, userId, token) {
        const link = `${this.frontendUrl}/confirm-change-email?userId=${userId}&token=${token}`;
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: 'Confirma tu nuevo email en Vinlyst',
                html: `<p>Haz clic en el siguiente enlace para confirmar tu nuevo email:</p><p><a href="${link}">${link}</a></p><p>El enlace expira en 1 hora.</p>`,
            });
        }
        catch (err) {
            this.logger.error(`Failed to send change-email confirmation to ${to}`, err);
        }
    }
    async sendAccountSuspendedEmail(to) {
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: 'Tu cuenta de Vinlyst fue suspendida',
                html: `<p>Tu cuenta fue suspendida por incumplir reiteradamente las normas de la comunidad (reportes validados por nuestro equipo de moderación).</p>`,
            });
        }
        catch (err) {
            this.logger.error(`Failed to send suspension email to ${to}`, err);
        }
    }
};
EmailService = EmailService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], EmailService);
export { EmailService };
//# sourceMappingURL=email.service.js.map