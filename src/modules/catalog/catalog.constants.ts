export const CATALOG_SYNC_JOB_NAME = 'sync-stale-catalog';
export const CATALOG_SYNC_SCHEDULER_ID = 'catalog-sync-scheduler';
// Diario 4am, después del job de recommendations a las 3am (mismo estilo que RECOMMENDATIONS_CRON_PATTERN)
export const CATALOG_SYNC_CRON_PATTERN = '0 4 * * *';
export const CATALOG_STALENESS_DAYS = 7;
// Tope de artistas procesados por corrida, para acotar duración/carga contra Deezer
// si hay muchos artistas stale a la vez (p.ej. la primera corrida tras desplegar esta feature)
export const CATALOG_SYNC_BATCH_SIZE = 50;

export const ARTIST_DETAIL_TOP_N = 5;
// Más corto que el TTL general de 24h porque embebe datos de trending que
// cambian con más frecuencia (misma cadencia que TRENDING_CACHE_TTL_SECONDS).
export const ARTIST_DETAIL_CACHE_TTL_SECONDS = 60 * 60;
