var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CloudinaryService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
let CloudinaryService = CloudinaryService_1 = class CloudinaryService {
    logger = new Logger(CloudinaryService_1.name);
    constructor(config) {
        cloudinary.config({
            cloud_name: config.getOrThrow('CLOUDINARY_CLOUD_NAME'),
            api_key: config.getOrThrow('CLOUDINARY_API_KEY'),
            api_secret: config.getOrThrow('CLOUDINARY_API_SECRET'),
        });
    }
    upload(buffer, folder) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
                if (error || !result)
                    return reject(new Error(error?.message ?? 'Upload failed'));
                resolve({ secureUrl: result.secure_url, publicId: result.public_id });
            });
            stream.end(buffer);
        });
    }
    async destroy(publicId) {
        if (!publicId)
            return;
        try {
            await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
        }
        catch (err) {
            this.logger.warn(`Failed to destroy Cloudinary asset ${publicId}`, err);
        }
    }
};
CloudinaryService = CloudinaryService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], CloudinaryService);
export { CloudinaryService };
//# sourceMappingURL=cloudinary.service.js.map