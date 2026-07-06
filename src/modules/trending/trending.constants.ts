export const TRENDING_WINDOW_DAYS = 7;
export const TRENDING_TOP_N = 20;

// Recalculo cada 1h (desviación acordada con el usuario respecto a las 4h de
// docs/musicbox.md §13) — el TTL de cache queda alineado a esa cadencia.
export const TRENDING_RECALC_INTERVAL_MS = 60 * 60 * 1000;
export const TRENDING_CACHE_TTL_SECONDS = 60 * 60 + 300;

export const TRENDING_JOB_NAME = 'recalculate-trending';
export const TRENDING_SCHEDULER_ID = 'trending-recalculate-scheduler';

export const TRENDING_ALBUMS_CACHE_KEY = 'trending:albums';
export const TRENDING_TRACKS_CACHE_KEY = 'trending:tracks';
