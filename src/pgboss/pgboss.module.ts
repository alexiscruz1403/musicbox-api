import { Global, Module } from '@nestjs/common';
import { PgBossService } from './pgboss.service.js';

// @Global (mismo patrón que RedisModule/PrismaModule): el bus de jobs pg-boss
// está disponible en toda la app sin re-importar en cada módulo.
@Global()
@Module({
  providers: [PgBossService],
  exports: [PgBossService],
})
export class PgBossModule {}
