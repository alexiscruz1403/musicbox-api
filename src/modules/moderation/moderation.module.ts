import { Module } from '@nestjs/common';
import { EmailModule } from '../../email/email.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { AdminModerationController } from './admin-moderation.controller.js';
import { ModerationRepository } from './moderation.repository.js';
import { ModerationService } from './moderation.service.js';
import { ReportsController } from './reports.controller.js';

@Module({
  imports: [NotificationsModule, EmailModule],
  controllers: [ReportsController, AdminModerationController],
  providers: [ModerationService, ModerationRepository],
})
export class ModerationModule {}
