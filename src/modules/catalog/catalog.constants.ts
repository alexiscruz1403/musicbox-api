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

// Las URLs de preview de Deezer están firmadas y son de corta duración:
// confirmado en vivo (3 llamadas independientes, tanto /track/{id} como
// anidado en /album/{id}) que el claim `exp` del query param `hdnea` siempre
// vence exactamente 900s después de que Deezer emite la URL. Se usa una
// constante fija y conservadora, bien por debajo de esa ventana — no se
// parsea el token interno de Deezer en runtime, porque su formato no está
// documentado/versionado (si Deezer lo cambia, un parser rompe en silencio;
// una constante fija solo degrada a algunas llamadas extra a Deezer, nunca a
// audio inválido). La ganancia de parsear dinámicamente el `exp` está acotada
// a ~300s extra de vida de caché — no vale la fragilidad (docs/fase-2-features.md).
export const PREVIEW_URL_CACHE_TTL_SECONDS = 600; // 10 min, seguro bajo los 900s

// Deezer a veces genuinamente no tiene preview para una pista (`preview` es
// un string NO opcional en el payload crudo — "sin preview" en la práctica
// es "" , no null/undefined). Es un hecho estable sobre la pista, no un
// token, así que se cachea tan largo como el resto de los metadatos en vez
// de re-consultarse contra Deezer cada ~10 minutos para siempre.
export const PREVIEW_URL_MISSING_CACHE_TTL_SECONDS = 86_400; // espeja CatalogService.CACHE_TTL
