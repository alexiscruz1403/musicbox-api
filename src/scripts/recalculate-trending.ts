// Ejecuta manualmente el mismo cómputo que corre cada hora vía BullMQ
// (TrendingQueueProcessor -> TrendingService.recalculate()) — útil para
// forzar un recálculo sin esperar al job scheduler, o para poblar
// TrendingSnapshot/Redis en un ambiente recién levantado.
//
// Uso: npm run trending:recalculate (hace build + node dist/src/scripts/recalculate-trending.js)
//
// Arranca un NestFactory.createApplicationContext(AppModule) — mismo grafo de
// DI que la app real (Prisma/Redis/BullMQ ya configurados), sin levantar el
// servidor HTTP. Nota: esto también dispara los hooks onApplicationBootstrap
// de otros módulos (p. ej. TrendingScheduler/CatalogScheduler registrando su
// job scheduler) — es inofensivo, son idempotentes por diseño (mismo
// jobSchedulerId no crea duplicados).
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module.js';
import { TrendingService } from '../modules/trending/trending.service.js';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  try {
    const trending = app.get(TrendingService);
    const { albums, tracks } = await trending.recalculate();
    console.log(
      `Trending recalculado: ${albums.length} álbumes, ${tracks.length} tracks. ` +
        'Redis (trending:albums/trending:tracks) y TrendingSnapshot actualizados.',
    );
  } finally {
    await app.close();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err: unknown) => {
    console.error('Error al recalcular trending:', err);
    process.exit(1);
  });
