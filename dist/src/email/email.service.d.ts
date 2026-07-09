import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly config;
    private readonly logger;
    private readonly transporter;
    private readonly from;
    private readonly frontendUrl;
    constructor(config: ConfigService);
    sendPasswordResetEmail(to: string, userId: string, token: string): Promise<void>;
    sendChangeEmailConfirmation(to: string, userId: string, token: string): Promise<void>;
    sendAccountSuspendedEmail(to: string): Promise<void>;
}
