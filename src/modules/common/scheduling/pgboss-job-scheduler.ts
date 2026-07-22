import type { OnApplicationBootstrap } from '@nestjs/common';
import type { PgBossService } from '../../../pgboss/pgboss.service.js';

/**
 * Base `OnApplicationBootstrap` para los cron schedulers del proyecto
 * (Catalog/Trending/Recommendations). Cada subclase solo difiere en cola,
 * evento, patrón cron y `key`. `boss.schedule` es idempotente por
 * (cola, key) — re-programar con la misma key solo actualiza, nunca duplica,
 * así que es seguro entre reinicios e instancias.
 *
 * Se corre en `onApplicationBootstrap` (después de todos los `onModuleInit`),
 * cuando `PgBossService` ya ejecutó `boss.start()` y creó las colas.
 */
export abstract class PgBossJobScheduler implements OnApplicationBootstrap {
  constructor(
    private readonly pgBoss: PgBossService,
    private readonly queue: string,
    private readonly event: string,
    private readonly cron: string,
    private readonly key: string,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.pgBoss.boss.schedule(
      this.queue,
      this.cron,
      { event: this.event, payload: {} },
      { key: this.key },
    );
  }
}
