import { PgBossService } from '../../pgboss/pgboss.service.js';
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
    private readonly pgBoss;
    constructor(pgBoss: PgBossService);
    emitReactionAdded(payload: ReactionEventPayload): Promise<string | null>;
    emitReactionChanged(payload: ReactionEventPayload): Promise<string | null>;
    emitCommentCreated(payload: CommentEventPayload): Promise<string | null>;
    emitFollowCreated(payload: FollowEventPayload): Promise<string | null>;
    emitFollowRequested(payload: FollowRequestEventPayload): Promise<string | null>;
    emitFollowRequestAccepted(payload: FollowRequestAcceptedEventPayload): Promise<string | null>;
}
