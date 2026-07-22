import type { QueueOptions } from 'pg-boss';
export declare const REVIEWS_QUEUE = "reviews";
export declare const SOCIAL_QUEUE = "social";
export declare const NOTIFICATIONS_QUEUE = "notifications";
export declare const TRENDING_QUEUE = "trending";
export declare const RECOMMENDATIONS_QUEUE = "recommendations";
export declare const CATALOG_QUEUE = "catalog";
export declare const ALL_QUEUES: readonly ["reviews", "social", "notifications", "trending", "recommendations", "catalog"];
export declare const PGBOSS_QUEUE_OPTIONS: QueueOptions;
export interface JobEnvelope<T = unknown> {
    event: string;
    payload: T;
}
