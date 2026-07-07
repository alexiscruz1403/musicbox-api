export declare const MIN_REVIEWS_FOR_RECOMMENDATIONS = 3;
export declare const MIN_FAVORITE_ARTIST_RATING = 7;
export declare const MAX_FAVORITE_ARTISTS = 5;
export declare const SIMILAR_ARTISTS_PER_FAVORITE = 5;
export declare const MAX_PER_ARTIST = 2;
export declare const RECOMMENDATIONS_TOP_N = 20;
export declare const RECOMMENDATIONS_JOB_NAME = "generate-recommendations";
export declare const RECOMMENDATIONS_SCHEDULER_ID = "recommendations-generate-scheduler";
export declare const RECOMMENDATIONS_CRON_PATTERN = "0 3 * * *";
export declare const INSUFFICIENT_REVIEWS_HEADER = "X-Recommendation-Status";
export declare const INSUFFICIENT_REVIEWS_STATUS = "INSUFFICIENT_REVIEWS";
export type RecommendationReason = 'SIMILAR_ARTIST' | 'GENRE_MATCH';
export interface RecommendationItem {
    deezerId: string;
    type: 'album';
    title: string;
    artistName: string;
    coverUrl: string | null;
    reason: RecommendationReason;
    reasonLabel: string;
}
