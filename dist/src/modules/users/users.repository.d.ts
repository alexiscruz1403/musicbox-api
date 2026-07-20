import { PrismaService } from '../../prisma/prisma.service.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        createdAt: Date;
        id: string;
        handle: string;
        email: string;
        googleId: string | null;
        displayName: string;
        passwordHash: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        language: import("../../../generated/prisma/enums.js").Language;
        consentedAt: Date | null;
        updatedAt: Date;
        deletedAt: Date | null;
        acceptedReportsCount: number;
        penaltyLevel: number;
        penalizedUntil: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findByHandle(handle: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        createdAt: Date;
        id: string;
        handle: string;
        email: string;
        googleId: string | null;
        displayName: string;
        passwordHash: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        language: import("../../../generated/prisma/enums.js").Language;
        consentedAt: Date | null;
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
        createdAt: Date;
        id: string;
        handle: string;
        email: string;
        googleId: string | null;
        displayName: string;
        passwordHash: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        language: import("../../../generated/prisma/enums.js").Language;
        consentedAt: Date | null;
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
                rating: import("@prisma/client-runtime-utils").Decimal;
                reviewId: string;
                position: number;
            }[];
        } & {
            createdAt: Date;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            type: import("../../../generated/prisma/enums.js").ReviewType;
            trackId: string | null;
            albumId: string | null;
            description: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal;
            externalTitle: string;
            externalArtistName: string;
            externalCoverUrl: string | null;
        })[];
        comments: {
            createdAt: Date;
            id: string;
            status: import("../../../generated/prisma/enums.js").ContentStatus;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            reviewId: string;
            content: string;
        }[];
        reactions: {
            createdAt: Date;
            id: string;
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
            followerId: string;
            followeeId: string;
            createdAt: Date;
        })[];
        following: ({
            followee: {
                id: string;
                handle: string;
                displayName: string;
            };
        } & {
            followerId: string;
            followeeId: string;
            createdAt: Date;
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
        createdAt: Date;
        id: string;
        handle: string;
        email: string;
        googleId: string | null;
        displayName: string;
        passwordHash: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        language: import("../../../generated/prisma/enums.js").Language;
        consentedAt: Date | null;
        updatedAt: Date;
        deletedAt: Date | null;
        acceptedReportsCount: number;
        penaltyLevel: number;
        penalizedUntil: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    updateCover(userId: string, coverUrl: string, coverPublicId: string): import("../../../generated/prisma/models.js").Prisma__UserClient<{
        createdAt: Date;
        id: string;
        handle: string;
        email: string;
        googleId: string | null;
        displayName: string;
        passwordHash: string | null;
        avatarUrl: string | null;
        avatarPublicId: string | null;
        coverUrl: string | null;
        coverPublicId: string | null;
        bio: string | null;
        notifEnabled: boolean;
        isPrivate: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        role: import("../../../generated/prisma/enums.js").UserRole;
        language: import("../../../generated/prisma/enums.js").Language;
        consentedAt: Date | null;
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
}
