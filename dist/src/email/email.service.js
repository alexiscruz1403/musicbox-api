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
import { I18nService } from 'nestjs-i18n';
let EmailService = EmailService_1 = class EmailService {
    config;
    i18n;
    logger = new Logger(EmailService_1.name);
    transporter;
    from;
    frontendUrl;
    constructor(config, i18n) {
        this.config = config;
        this.i18n = i18n;
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
    async sendPasswordResetEmail(to, userId, token, language) {
        const link = `${this.frontendUrl}/reset-password?userId=${userId}&token=${token}`;
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: this.i18n.translate('email.PASSWORD_RESET.subject', {
                    lang: language,
                }),
                html: this.i18n.translate('email.PASSWORD_RESET.body', {
                    lang: language,
                    args: { link },
                }),
            });
        }
        catch (err) {
            this.logger.error(`Failed to send password reset email to ${to}`, err);
        }
    }
    async sendChangeEmailConfirmation(to, userId, token, language) {
        const link = `${this.frontendUrl}/confirm-change-email?userId=${userId}&token=${token}`;
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: this.i18n.translate('email.CHANGE_EMAIL_CONFIRMATION.subject', { lang: language }),
                html: this.i18n.translate('email.CHANGE_EMAIL_CONFIRMATION.body', {
                    lang: language,
                    args: { link },
                }),
            });
        }
        catch (err) {
            this.logger.error(`Failed to send change-email confirmation to ${to}`, err);
        }
    }
    async sendAccountSuspendedEmail(to, language) {
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: this.i18n.translate('email.ACCOUNT_SUSPENDED.subject', {
                    lang: language,
                }),
                html: this.i18n.translate('email.ACCOUNT_SUSPENDED.body', {
                    lang: language,
                }),
            });
        }
        catch (err) {
            this.logger.error(`Failed to send suspension email to ${to}`, err);
        }
    }
};
EmailService = EmailService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService,
        I18nService])
], EmailService);
export { EmailService };
//# sourceMappingURL=email.service.js.map