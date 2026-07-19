import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { I18nService } from 'nestjs-i18n';
import type { Language } from '../../generated/prisma/client.js';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;
  private readonly frontendUrl: string;

  constructor(
    private readonly config: ConfigService,
    private readonly i18n: I18nService,
  ) {
    this.from = config.getOrThrow<string>('EMAIL_FROM');
    this.frontendUrl = config.getOrThrow<string>('FRONTEND_URL');
    this.transporter = nodemailer.createTransport({
      host: config.getOrThrow<string>('SMTP_HOST'),
      port: config.getOrThrow<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: config.getOrThrow<string>('SMTP_USER'),
        pass: config.getOrThrow<string>('SMTP_PASS'),
      },
    });
  }

  async sendPasswordResetEmail(
    to: string,
    userId: string,
    token: string,
    language: Language,
  ): Promise<void> {
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
    } catch (err) {
      this.logger.error(`Failed to send password reset email to ${to}`, err);
    }
  }

  async sendChangeEmailConfirmation(
    to: string,
    userId: string,
    token: string,
    language: Language,
  ): Promise<void> {
    const link = `${this.frontendUrl}/confirm-change-email?userId=${userId}&token=${token}`;
    try {
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject: this.i18n.translate(
          'email.CHANGE_EMAIL_CONFIRMATION.subject',
          { lang: language },
        ),
        html: this.i18n.translate('email.CHANGE_EMAIL_CONFIRMATION.body', {
          lang: language,
          args: { link },
        }),
      });
    } catch (err) {
      this.logger.error(
        `Failed to send change-email confirmation to ${to}`,
        err,
      );
    }
  }

  async sendAccountSuspendedEmail(
    to: string,
    language: Language,
  ): Promise<void> {
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
    } catch (err) {
      this.logger.error(`Failed to send suspension email to ${to}`, err);
    }
  }
}
