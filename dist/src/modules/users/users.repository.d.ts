import { PrismaService } from '../../prisma/prisma.service.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        handle: string;
        displayName: string;
        email: string;
        id: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        bio: string | null;
        notifEnabled: boolean;
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
        handle: string;
        displayName: string;
        email: string;
        id: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        bio: string | null;
        notifEnabled: boolean;
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
        handle: string;
        displayName: string;
        email: string;
        id: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        bio: string | null;
        notifEnabled: boolean;
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
    anonimize(userId: string): Promise<[{
        handle: string;
        displayName: string;
        email: string;
        id: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        bio: string | null;
        notifEnabled: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        consentedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        acceptedReportsCount: number;
        penaltyLevel: number;
        penalizedUntil: Date | null;
    }, import("../../../generated/prisma/internal/prismaNamespace.js").BatchPayload]>;
    getExportData(userId: string): Promise<{
        reviews: ({
            trackReviewItems: {
                id: string;
                reviewId: string;
                trackId: string;
                description: string | null;
                rating: number;
                position: number;
            }[];
        } & {
            type: import("../../../generated/prisma/enums.js").ReviewType;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            albumId: string | null;
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
            content: string;
            reviewId: string;
        }[];
        reactions: {
            type: import("../../../generated/prisma/enums.js").ReactionType;
            id: string;
            createdAt: Date;
            userId: string;
            reviewId: string;
        }[];
        followers: ({
            follower: {
                handle: string;
                displayName: string;
                id: string;
            };
        } & {
            createdAt: Date;
            followeeId: string;
            followerId: string;
        })[];
        following: ({
            followee: {
                handle: string;
                displayName: string;
                id: string;
            };
        } & {
            createdAt: Date;
            followeeId: string;
            followerId: string;
        })[];
        notifPrefs: {
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
        } | null;
    }>;
    updateAvatarUrl(userId: string, avatarUrl: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        handle: string;
        displayName: string;
        email: string;
        id: string;
        passwordHash: string | null;
        googleId: string | null;
        avatarUrl: string | null;
        bio: string | null;
        notifEnabled: boolean;
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    updateNotifPrefs(userId: string, data: UpdateNotifPrefsDto): import("../../../generated/prisma/models.js").Prisma__NotificationPreferenceClient<{
        userId: string;
        likesEnabled: boolean;
        dislikesEnabled: boolean;
        commentsEnabled: boolean;
        followsEnabled: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    getFollowers(handle: string, cursor?: string, limit?: number): Promise<{
        items: {
            handle: string;
            displayName: string;
            id: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    getFollowing(handle: string, cursor?: string, limit?: number): Promise<{
        items: {
            handle: string;
            displayName: string;
            id: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    searchUsers(query: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
        items: {
            isFollowing: boolean;
            handle: string;
            displayName: string;
            id: string;
            avatarUrl: string | null;
        }[];
        nextCursor: string | null;
    }>;
    followExists(followerId: string, followeeId: string): import("../../../generated/prisma/models.js").Prisma__FollowClient<{
        createdAt: Date;
        followeeId: string;
        followerId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    createFollow(followerId: string, followeeId: string): import("../../../generated/prisma/models.js").Prisma__FollowClient<{
        createdAt: Date;
        followeeId: string;
        followerId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    deleteFollow(followerId: string, followeeId: string): import("../../../generated/prisma/models.js").Prisma__FollowClient<{
        createdAt: Date;
        followeeId: string;
        followerId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
