import type { Request } from 'express';
import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { UpdateNotifPrefsDto } from './dto/update-notif-prefs.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UsersService } from './users.service.js';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    getMe(user: JwtPayload): Promise<{
        data: {
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
        };
    }>;
    updateMe(user: JwtPayload, dto: UpdateProfileDto): Promise<{
        data: {
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
    }>;
    uploadAvatar(user: JwtPayload, file: Express.Multer.File): Promise<{
        data: {
            avatarUrl: string;
        };
    }>;
    deleteMe(user: JwtPayload): Promise<void>;
    getNotifPrefs(user: JwtPayload): Promise<{
        data: {
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
        };
    }>;
    updateNotifPrefs(user: JwtPayload, dto: UpdateNotifPrefsDto): Promise<{
        data: {
            userId: string;
            likesEnabled: boolean;
            dislikesEnabled: boolean;
            commentsEnabled: boolean;
            followsEnabled: boolean;
        };
    }>;
    checkHandle(handle: string, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
            available: boolean;
        };
    }>;
    getPublicProfile(handle: string, req: Request & {
        user?: JwtPayload;
    }): Promise<{
        data: {
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
        };
    }>;
    getFollowers(handle: string, cursor?: string, limit?: string): Promise<{
        data: {
            items: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            }[];
            nextCursor: string | null;
        };
    }>;
    getFollowing(handle: string, cursor?: string, limit?: string): Promise<{
        data: {
            items: {
                id: string;
                handle: string;
                displayName: string;
                avatarUrl: string | null;
            }[];
            nextCursor: string | null;
        };
    }>;
    getReviews(): {
        data: never[];
    };
    follow(user: JwtPayload, handle: string): Promise<void>;
    unfollow(user: JwtPayload, handle: string): Promise<void>;
}
