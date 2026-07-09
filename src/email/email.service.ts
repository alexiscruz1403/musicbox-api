import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;
  private readonly frontendUrl: string;

  constructor(private readonly config: ConfigService) {
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

  async sendVerificationEmail(
    to: string,
    userId: string,
    token: string,
  ): Promise<void> {
    const link = `${this.frontendUrl}/verify-email?userId=${userId}&token=${token}`;
    try {
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject: 'Verifica tu cuenta en MusicBox',
        html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p><p><a href="${link}">${link}</a></p><p>El enlace expira en 24 horas.</p>`,
      });
    } catch (err) {
      this.logger.error(`Failed to send verification email to ${to}`, err);
    }
  }

  async sendPasswordResetEmail(
    to: string,
    userId: string,
    token: string,
  ): Promise<void> {
    const link = `${this.frontendUrl}/reset-password?userId=${userId}&token=${token}`;
    try {
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject: 'Restablecer contraseña en MusicBox',
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${link}">${link}</a></p><p>El enlace expira en 1 hora.</p>`,
      });
    } catch (err) {
      this.logger.error(`Failed to send password reset email to ${to}`, err);
    }
  }

  async sendAccountSuspendedEmail(to: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject: 'Tu cuenta de MusicBox fue suspendida',
        html: `<p>Tu cuenta fue suspendida por incumplir reiteradamente las normas de la comunidad (reportes validados por nuestro equipo de moderación).</p>`,
      });
    } catch (err) {
      this.logger.error(`Failed to send suspension email to ${to}`, err);
    }
  }
}
