import type { Queue } from 'bullmq';
export interface ReviewEventPayload {
    reviewId: string;
    userId: string;
    type: 'TRACK' | 'ALBUM';
    albumId: string | null;
    trackId: string | null;
}
export declare class ReviewEventsProducer {
    private readonly queue;
    constructor(queue: Queue);
    emitCreated(payload: ReviewEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitUpdated(payload: ReviewEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitDeleted(payload: ReviewEventPayload): Promise<import("bullmq").Job<any, any, string>>;
}
