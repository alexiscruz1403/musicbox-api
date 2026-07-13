import { ConfigService } from '@nestjs/config';
export interface CloudinaryUploadResult {
    secureUrl: string;
    publicId: string;
}
export declare class CloudinaryService {
    private readonly logger;
    constructor(config: ConfigService);
    upload(buffer: Buffer, folder: string): Promise<CloudinaryUploadResult>;
    destroy(publicId: string | null | undefined): Promise<void>;
}
