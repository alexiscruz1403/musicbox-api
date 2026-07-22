import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PgBoss } from 'pg-boss';
import {
  ALL_QUEUES,
  PGBOSS_QUEUE_OPTIONS,
} from '../modules/events/events.constants.js';

// pg-boss reemplaza a BullMQ como bus de jobs (Fase 10) — corre sobre el mismo
// PostgreSQL (Supabase), eliminando el costo por-comando del Redis serverless
// (Upstash) que BullMQ consumía con su polling. Redis queda solo para caché de
// catálogo + rate limiting.
//
// Conexión: pg-boss necesita una conexión session-mode/direct, NO el
// transaction pooler de Supabase (`DATABASE_URL`, puerto 6543). Usa
// `PGBOSS_DATABASE_URL` (o el `DIRECT_URL` de Prisma Migrate como fallback);
// `max` chico porque los cupos de conexión directa del free tier de Supabase
// se comparten con Prisma.
@Injectable()
export class PgBossService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PgBossService.name);
  readonly boss: PgBoss;

  constructor(config: ConfigService) {
    const connectionString =
      config.get<string>('PGBOSS_DATABASE_URL') ??
      config.get<string>('DIRECT_URL') ??
      config.getOrThrow<string>('DATABASE_URL');

    this.boss = new PgBoss({
      connectionString,
      schema: 'pgboss',
      max: 5,
      application_name: 'musicbox-pgboss',
    });

    // pg-boss emite 'error' ante fallos de conexión/mantenimiento; sin un
    // listener, un EventEmitter tumba el proceso. Se loguea vía Pino.
    this.boss.on('error', (err) =>
      this.logger.error('pg-boss error', err.stack ?? err.message),
    );
  }

  async onModuleInit(): Promise<void> {
    await this.boss.start();
    // `createQueue` es idempotente y requerido en pg-boss v10+ antes de
    // send/work/schedule. Las opciones de reintento se heredan por cada job.
    for (const queue of ALL_QUEUES) {
      await this.boss.createQueue(queue, PGBOSS_QUEUE_OPTIONS);
    }
    this.logger.log(`pg-boss iniciado — ${ALL_QUEUES.length} colas listas`);
  }

  async onModuleDestroy(): Promise<void> {
    await this.boss.stop();
  }
}
