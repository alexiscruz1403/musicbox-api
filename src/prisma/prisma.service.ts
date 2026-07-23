import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';

// El pool se dimensiona explícitamente (nunca con el default 10 de `pg-pool`):
// el pooler de Supabase impone un `pool_size` por proyecto y ese cupo se
// reparte entre ESTE pool y el `max: 5` de PgBossService. Sin un `max` propio,
// 10 + 5 daba exactamente el techo del session pooler y cualquier cliente extra
// (Prisma Studio, `prisma migrate`, una segunda instancia) hacía fallar los
// requests con `EMAXCONNSESSION`. Ver DATABASE_POOL_MAX en config.validation.ts.
//
// `application_name` etiqueta las conexiones para poder auditarlas con
// `select application_name, count(*) from pg_stat_activity group by 1`.
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    super({
      adapter: new PrismaPg({
        connectionString: config.getOrThrow<string>('DATABASE_URL'),
        max: config.get<number>('DATABASE_POOL_MAX'),
        application_name: 'musicbox-api',
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
