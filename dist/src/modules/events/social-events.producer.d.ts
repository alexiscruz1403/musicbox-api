import type { Queue } from 'bullmq';
export interface ReactionEventPayload {
    reactionId: string;
    reviewId: string;
    reviewOwnerId: string;
    userId: string;
    type: 'LIKE' | 'DISLIKE';
}
export interface CommentEventPayload {
    commentId: string;
    reviewId: string;
    reviewOwnerId: string;
    userId: string;
}
export interface FollowEventPayload {
    followerId: string;
    followeeId: string;
}
export declare class SocialEventsProducer {
    private readonly queue;
    constructor(queue: Queue);
    emitReactionAdded(payload: ReactionEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitReactionChanged(payload: ReactionEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitCommentCreated(payload: CommentEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitFollowCreated(payload: FollowEventPayload): Promise<import("bullmq").Job<any, any, string>>;
}
