export const REVIEWS_QUEUE = 'reviews';
export const SOCIAL_QUEUE = 'social';
export const NOTIFICATIONS_QUEUE = 'notifications';
export const TRENDING_QUEUE = 'trending';
export const RECOMMENDATIONS_QUEUE = 'recommendations';

export const DEFAULT_JOB_OPTIONS = {
  attempts: 3,
  backoff: { type: 'exponential' as const, delay: 2000 },
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 50 },
};
