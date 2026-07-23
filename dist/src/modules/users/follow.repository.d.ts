import { PrismaService } from '../../prisma/prisma.service.js';
export declare class FollowRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    followExists(followerId: string, followeeId: string): import("../../../generated/prisma/models.js").Prisma__FollowClient<{
        createdAt: Date;
        followerId: string;
        followeeId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    createFollow(followerId: string, followeeId: string): import("../../../generated/prisma/models.js").Prisma__FollowClient<{
        createdAt: Date;
        followerId: string;
        followeeId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    deleteFollow(followerId: string, followeeId: string): import("../../../generated/prisma/models.js").Prisma__FollowClient<{
        createdAt: Date;
        followerId: string;
        followeeId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findFollowRequest(requesterId: string, targetId: string): import("../../../generated/prisma/models.js").Prisma__FollowRequestClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
        createdAt: Date;
        requesterId: string;
        targetId: string;
        respondedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    createOrResetFollowRequest(requesterId: string, targetId: string): import("../../../generated/prisma/models.js").Prisma__FollowRequestClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
        createdAt: Date;
        requesterId: string;
        targetId: string;
        respondedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    deleteFollowRequest(requesterId: string, targetId: string): import("../../../generated/prisma/models.js").Prisma__FollowRequestClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
        createdAt: Date;
        requesterId: string;
        targetId: string;
        respondedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findFollowRequestById(id: string): import("../../../generated/prisma/models.js").Prisma__FollowRequestClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
        createdAt: Date;
        requesterId: string;
        targetId: string;
        respondedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    listIncomingFollowRequests(targetId: string, cursor?: string, limit?: number): Promise<{
        items: ({
            requester: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
            createdAt: Date;
            requesterId: string;
            targetId: string;
            respondedAt: Date | null;
        })[];
        nextCursor: string | null;
    }>;
    acceptFollowRequest(id: string): Promise<{
        id: string;
        status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
        createdAt: Date;
        requesterId: string;
        targetId: string;
        respondedAt: Date | null;
    }>;
    rejectFollowRequest(id: string): import("../../../generated/prisma/models.js").Prisma__FollowRequestClient<{
        id: string;
        status: import("../../../generated/prisma/enums.js").FollowRequestStatus;
        createdAt: Date;
        requesterId: string;
        targetId: string;
        respondedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    acceptAllPendingFollowRequests(targetId: string): Promise<string[]>;
}
