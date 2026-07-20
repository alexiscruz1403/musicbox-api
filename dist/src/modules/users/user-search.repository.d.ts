import { PrismaService } from '../../prisma/prisma.service.js';
export declare class UserSearchRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    searchUsers(query: string, cursor?: string, limit?: number, viewerId?: string): Promise<{
        items: ({
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        } & {
            isFollowing: boolean;
        })[];
        nextCursor: string | null;
    }>;
    quickSearchUsers(query: string, limit: number, viewerId?: string): Promise<{
        handle: string;
        displayName: string;
        avatarUrl: string | null;
        isPrivate: boolean;
        isFollowing: boolean;
    }[]>;
}
