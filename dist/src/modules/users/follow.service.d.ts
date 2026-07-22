import { SocialEventsProducer } from '../events/social-events.producer.js';
import { FollowRepository } from './follow.repository.js';
import { UsersRepository } from './users.repository.js';
export declare class FollowService {
    private readonly repo;
    private readonly usersRepo;
    private readonly events;
    constructor(repo: FollowRepository, usersRepo: UsersRepository, events: SocialEventsProducer);
    getFollowers(handle: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
        items: ({
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
            isPrivate: boolean;
        } & {
            isFollowing: boolean;
        })[];
        nextCursor: string | null;
    }>;
    getFollowing(handle: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
        items: ({
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
            isPrivate: boolean;
        } & {
            isFollowing: boolean;
        })[];
        nextCursor: string | null;
    }>;
    getFollowStatus(viewerId: string | undefined, targetId: string): Promise<{
        isFollowing: boolean;
        followRequestPending: boolean;
    }>;
    follow(followerId: string, handle: string): Promise<{
        status: 'FOLLOWING';
    } | {
        status: 'PENDING';
        followRequestId: string;
    }>;
    unfollow(followerId: string, handle: string): Promise<void>;
    listFollowRequests(userId: string, cursor?: string, limit?: number): Promise<{
        items: {
            id: string;
            createdAt: Date;
            requester: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        }[];
        nextCursor: string | null;
    }>;
    respondToFollowRequest(userId: string, requestId: string, status: 'ACCEPTED' | 'REJECTED'): Promise<{
        status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
        id: string;
        createdAt: Date;
        requesterId: string;
        targetId: string;
        respondedAt: Date | null;
    }>;
    acceptAllPendingFollowRequests(targetId: string): Promise<void>;
}
