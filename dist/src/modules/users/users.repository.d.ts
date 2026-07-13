import { PrismaService } from '../../prisma/prisma.service.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        id: string;
        handle: string;
        displayName: string;
        email: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        consentedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        acceptedReportsCount: number;
        penaltyLevel: number;
        penalizedUntil: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findByHandle(handle: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        id: string;
        handle: string;
        displayName: string;
        email: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        consentedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        acceptedReportsCount: number;
        penaltyLevel: number;
        penalizedUntil: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getStats(userId: string): Promise<[number, number, number]>;
    updateProfile(userId: string, data: UpdateProfileDto): Promise<{
        id: string;
        handle: string;
        displayName: string;
        email: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        consentedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        acceptedReportsCount: number;
        penaltyLevel: number;
        penalizedUntil: Date | null;
    }>;
    anonimize(userId: string): Promise<{
        avatarPublicId: string | null;
        coverPublicId: string | null;
    } | null>;
    getExportData(userId: string): Promise<{
        reviews: ({
            trackReviewItems: {
                id: string;
                trackId: string;
                description: string | null;
                rating: number;
                reviewId: string;
                position: number;
            }[];
        } & {
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            description: string;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        })[];
        comments: {
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            reviewId: string;
            content: string;
        }[];
        reactions: {
            id: string;
            createdAt: Date;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReactionType;
            reviewId: string;
        }[];
        followers: ({
            follower: {
                id: string;
                handle: string;
                displayName: string;
            };
        } & {
            createdAt: Date;
            followerId: string;
            followeeId: string;
        })[];
        following: ({
            followee: {
                id: string;
                handle: string;
                displayName: string;
            };
        } & {
            createdAt: Date;
            followerId: string;
            followeeId: string;
        })[];
        notifPrefs: {
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
            followRequestsEnabled: boolean;
        } | null;
    }>;
    updateAvatar(userId: string, avatarUrl: string, avatarPublicId: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        id: string;
        handle: string;
        displayName: string;
        email: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        consentedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        acceptedReportsCount: number;
        penaltyLevel: number;
        penalizedUntil: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    updateCover(userId: string, coverUrl: string, coverPublicId: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        id: string;
        handle: string;
        displayName: string;
        email: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        consentedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        acceptedReportsCount: number;
        penaltyLevel: number;
        penalizedUntil: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getNotifPrefs(userId: string): import("../../../generated/prisma/models.js").Prisma__NotificationPreferenceClient<{
        userId: string;
        likesEnabled: boolean;
        dislikesEnabled: boolean;
        commentsEnabled: boolean;
        followsEnabled: boolean;
        followRequestsEnabled: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    updateNotifPrefs(userId: string, data: UpdateNotifPrefsDto): import("../../../generated/prisma/models.js").Prisma__NotificationPreferenceClient<{
        userId: string;
        likesEnabled: boolean;
        dislikesEnabled: boolean;
        commentsEnabled: boolean;
        followsEnabled: boolean;
        followRequestsEnabled: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getFollowers(handle: string, cursor?: string, limit?: number): Promise<{
        items: {
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    getFollowing(handle: string, cursor?: string, limit?: number): Promise<{
        items: {
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    searchUsers(query: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
        items: {
            isFollowing: boolean;
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
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
