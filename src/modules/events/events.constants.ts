import type { QueueOptions } from 'pg-boss';

export const REVIEWS_QUEUE = 'reviews';
export const SOCIAL_QUEUE = 'social';
export const NOTIFICATIONS_QUEUE = 'notifications';
export const TRENDING_QUEUE = 'trending';
export const RECOMMENDATIONS_QUEUE = 'recommendations';
export const CATALOG_QUEUE = 'catalog';

// Todas las colas pg-boss del proyecto — `PgBossService` las crea (idempotente)
// al arrancar, antes de cualquier send/work/schedule.
export const ALL_QUEUES = [
  REVIEWS_QUEUE,
  SOCIAL_QUEUE,
  NOTIFICATIONS_QUEUE,
  TRENDING_QUEUE,
  RECOMMENDATIONS_QUEUE,
  CATALOG_QUEUE,
] as const;

// Política de reintentos por cola (heredada por cada job). Equivale al
// `DEFAULT_JOB_OPTIONS` de BullMQ: `attempts: 3` → 1 intento + 2 reintentos;
// backoff exponencial con base 2s. La retención la maneja pg-boss por tiempo
// (`deleteAfterSeconds`, default 7 días), no por conteo como BullMQ.
export const PGBOSS_QUEUE_OPTIONS: QueueOptions = {
  retryLimit: 2,
  retryBackoff: true,
  retryDelay: 2,
};

// Envelope uniforme de todo job pg-boss. `job.name` en pg-boss es el nombre de
// la cola, así que el discriminador de evento (antes el `job.name` de BullMQ)
// viaja en `event`, y el payload tipado en `payload`.
export interface JobEnvelope<T = unknown> {
  event: string;
  payload: T;
}
