import { ConfigService } from '@nestjs/config';
import type { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersRepository } from './users.repository.js';
export declare class UsersService {
    private readonly repo;
    private readonly config;
    constructor(repo: UsersRepository, config: ConfigService);
    getMe(userId: string): Promise<{
        user: {
            id: string;
            handle: string;
            email: string;
            googleId: string | null;
            displayName: string;
            passwordHash: string | null;
            avatarUrl: string | null;
            bio: string | null;
            notifEnabled: boolean;
            status: import("../../../generated/prisma/enums.js").UserStatus;
            emailVerifiedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        stats: {
            reviewCount: number;
            followersCount: number;
            followingCount: number;
        };
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        id: string;
        handle: string;
        email: string;
        googleId: string | null;
        displayName: string;
        passwordHash: string | null;
        avatarUrl: string | null;
        bio: string | null;
        notifEnabled: boolean;
        status: import("../../../generated/prisma/enums.js").UserStatus;
        emailVerifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    uploadAvatar(userId: string, buffer: Buffer): Promise<string>;
    deleteAccount(userId: string): Promise<void>;
    getNotifPrefs(userId: string): Promise<{
        userId: string;
        likesEnabled: boolean;
        dislikesEnabled: boolean;
        commentsEnabled: boolean;
        followsEnabled: boolean;
    }>;
    updateNotifPrefs(userId: string, dto: UpdateNotifPrefsDto): Promise<{
        userId: string;
        likesEnabled: boolean;
        dislikesEnabled: boolean;
        commentsEnabled: boolean;
        followsEnabled: boolean;
    }>;
    checkHandle(handle: string, currentUserId?: string): Promise<{
        available: boolean;
    }>;
    getPublicProfile(handle: string, viewerId?: string): Promise<{
        user: {
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
            bio: string | null;
            notifEnabled: boolean;
            status: import("../../../generated/prisma/enums.js").UserStatus;
            emailVerifiedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        stats: {
            reviewCount: number;
            followersCount: number;
            followingCount: number;
        };
        isFollowing: boolean;
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
    follow(followerId: string, handle: string): Promise<void>;
    unfollow(followerId: string, handle: string): Promise<void>;
}
