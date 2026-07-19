import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import type { Language } from '../../generated/prisma/client.js';
export declare class EmailService {
    private readonly config;
    private readonly i18n;
    private readonly logger;
    private readonly transporter;
    private readonly from;
    private readonly frontendUrl;
    constructor(config: ConfigService, i18n: I18nService);
    sendPasswordResetEmail(to: string, userId: string, token: string, language: Language): Promise<void>;
    sendChangeEmailConfirmation(to: string, userId: string, token: string, language: Language): Promise<void>;
    sendAccountSuspendedEmail(to: string, language: Language): Promise<void>;
}
