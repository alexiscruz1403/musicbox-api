import type { PrismaService } from '../../prisma/prisma.service.js';
export declare function hydrateIsFollowing<T extends {
    id: string;
}>(prisma: PrismaService, users: T[], viewerId?: string): Promise<(T & {
    isFollowing: boolean;
})[]>;
