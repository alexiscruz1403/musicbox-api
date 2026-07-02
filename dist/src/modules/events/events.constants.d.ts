export declare const REVIEWS_QUEUE = "reviews";
export declare const SOCIAL_QUEUE = "social";
export declare const NOTIFICATIONS_QUEUE = "notifications";
export declare const TRENDING_QUEUE = "trending";
export declare const RECOMMENDATIONS_QUEUE = "recommendations";
export declare const DEFAULT_JOB_OPTIONS: {
    attempts: number;
    backoff: {
        type: "exponential";
        delay: number;
    };
    removeOnComplete: {
        count: number;
    };
    removeOnFail: {
        count: number;
    };
};
