import { Module } from '@nestjs/common';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

// PrismaModule y RedisModule son @Global, así que no hace falta importarlos.
@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
