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
export interface FollowRequestEventPayload {
    requesterId: string;
    targetId: string;
}
export interface FollowRequestAcceptedEventPayload {
    requesterId: string;
    accepterId: string;
}
export declare class SocialEventsProducer {
    private readonly queue;
    constructor(queue: Queue);
    emitReactionAdded(payload: ReactionEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitReactionChanged(payload: ReactionEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitCommentCreated(payload: CommentEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitFollowCreated(payload: FollowEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitFollowRequested(payload: FollowRequestEventPayload): Promise<import("bullmq").Job<any, any, string>>;
    emitFollowRequestAccepted(payload: FollowRequestAcceptedEventPayload): Promise<import("bullmq").Job<any, any, string>>;
}
