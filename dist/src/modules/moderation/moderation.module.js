var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { EmailModule } from '../../email/email.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { AdminModerationController } from './admin-moderation.controller.js';
import { ModerationRepository } from './moderation.repository.js';
import { ModerationService } from './moderation.service.js';
import { ReportsController } from './reports.controller.js';
let ModerationModule = class ModerationModule {
};
ModerationModule = __decorate([
    Module({
        imports: [NotificationsModule, EmailModule],
        controllers: [ReportsController, AdminModerationController],
        providers: [ModerationService, ModerationRepository],
    })
], ModerationModule);
export { ModerationModule };
//# sourceMappingURL=moderation.module.js.map