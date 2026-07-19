export const MIN_REVIEWS_FOR_RECOMMENDATIONS = 3;
export const MIN_FAVORITE_ARTIST_RATING = 7;
export const MAX_FAVORITE_ARTISTS = 5; // caps Last.fm/Deezer calls per recompute
export const SIMILAR_ARTISTS_PER_FAVORITE = 5;
export const MAX_PER_ARTIST = 2; // diversity cap
export const RECOMMENDATIONS_TOP_N = 20;

export const RECOMMENDATIONS_JOB_NAME = 'generate-recommendations';
export const RECOMMENDATIONS_SCHEDULER_ID =
  'recommendations-generate-scheduler';
export const RECOMMENDATIONS_CRON_PATTERN = '0 3 * * *'; // daily 3am, docs/musicbox.md §7/§12

export const INSUFFICIENT_REVIEWS_HEADER = 'X-Recommendation-Status';
export const INSUFFICIENT_REVIEWS_STATUS = 'INSUFFICIENT_REVIEWS';

export type RecommendationReason = 'SIMILAR_ARTIST' | 'GENRE_MATCH';

// Datos crudos para armar `reasonLabel` en el idioma del request en vez de un
// string pre-formateado — el snapshot persiste esto, no el texto ya traducido
// (docs/fase-9-features.md).
export type RecommendationReasonParams =
  { artistName: string } | { genreLabel: string };

export interface RecommendationItem {
  deezerId: string;
  type: 'album';
  title: string;
  artistName: string;
  coverUrl: string | null;
  reason: RecommendationReason;
  reasonParams: RecommendationReasonParams;
}
