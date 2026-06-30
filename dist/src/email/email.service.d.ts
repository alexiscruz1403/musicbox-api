import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly config;
    private readonly logger;
    private readonly transporter;
    private readonly from;
    private readonly frontendUrl;
    constructor(config: ConfigService);
    sendVerificationEmail(to: string, userId: string, token: string): Promise<void>;
    sendPasswordResetEmail(to: string, userId: string, token: string): Promise<void>;
}
