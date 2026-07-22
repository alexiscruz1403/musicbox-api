export const REVIEWS_QUEUE = 'reviews';
export const SOCIAL_QUEUE = 'social';
export const NOTIFICATIONS_QUEUE = 'notifications';
export const TRENDING_QUEUE = 'trending';
export const RECOMMENDATIONS_QUEUE = 'recommendations';
export const CATALOG_QUEUE = 'catalog';
export const ALL_QUEUES = [
    REVIEWS_QUEUE,
    SOCIAL_QUEUE,
    NOTIFICATIONS_QUEUE,
    TRENDING_QUEUE,
    RECOMMENDATIONS_QUEUE,
    CATALOG_QUEUE,
];
export const PGBOSS_QUEUE_OPTIONS = {
    retryLimit: 2,
    retryBackoff: true,
    retryDelay: 2,
};
//# sourceMappingURL=events.constants.js.map