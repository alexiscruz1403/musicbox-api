import type { ConfigService } from '@nestjs/config';
import { ALL_QUEUES } from '../modules/events/events.constants.js';

// Mock del paquete pg-boss (no toca una DB real). vi.hoisted permite
// referenciar los mocks dentro del factory de vi.mock pese al hoisting.
const { start, createQueue, stop, PgBossMock } = vi.hoisted(() => {
  const start = vi.fn();
  const createQueue = vi.fn();
  const stop = vi.fn();
  const on = vi.fn();
  // Función regular (no arrow): debe ser invocable con `new` porque
  // PgBossService hace `new PgBoss(...)`. Devolver un objeto desde el
  // constructor hace que `new` retorne ese objeto.
  const PgBossMock = vi.fn(function () {
    return { start, createQueue, stop, on };
  });
  return { start, createQueue, stop, PgBossMock };
});

vi.mock('pg-boss', () => ({ PgBoss: PgBossMock }));

// Import tras el mock (vitest hoista vi.mock por encima de los imports).
const { PgBossService } = await import('./pgboss.service.js');

const get = vi.fn().mockReturnValue(undefined);
const getOrThrow = vi
  .fn()
  .mockReturnValue('postgresql://localhost:5432/musicbox');
const config = { get, getOrThrow } as unknown as ConfigService;

describe('PgBossService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('arranca pg-boss y crea todas las colas (idempotente) en onModuleInit', async () => {
    const service = new PgBossService(config);
    await service.onModuleInit();

    expect(start).toHaveBeenCalledTimes(1);
    expect(createQueue).toHaveBeenCalledTimes(ALL_QUEUES.length);
    for (const queue of ALL_QUEUES) {
      expect(createQueue).toHaveBeenCalledWith(queue, expect.any(Object));
    }
  });

  it('detiene pg-boss en onModuleDestroy', async () => {
    const service = new PgBossService(config);
    await service.onModuleDestroy();
    expect(stop).toHaveBeenCalledTimes(1);
  });

  it('cae a DIRECT_URL/DATABASE_URL si no hay PGBOSS_DATABASE_URL', () => {
    new PgBossService(config);
    // get() devuelve undefined para PGBOSS_DATABASE_URL y DIRECT_URL →
    // getOrThrow('DATABASE_URL') provee la connection string.
    expect(getOrThrow).toHaveBeenCalledWith('DATABASE_URL');
  });
});
