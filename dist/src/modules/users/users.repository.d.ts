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
        emailVerifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
        emailVerifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
        emailVerifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
        emailVerifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, import("../../../generated/prisma/internal/prismaNamespace.js").BatchPayload]>;
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
        emailVerifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
