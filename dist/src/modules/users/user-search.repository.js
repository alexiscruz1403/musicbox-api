var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { decodeIdCursor, paginate, } from '../common/pagination/id-cursor.util.js';
import { hydrateIsFollowing } from './follow-hydration.util.js';
let UserSearchRepository = class UserSearchRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchUsers(query, cursor, limit = 10, viewerId) {
        const take = Math.min(limit, 50);
        const cursorId = decodeIdCursor(cursor);
        const users = await this.prisma.user.findMany({
            where: {
                status: 'ACTIVE',
                OR: [
                    { handle: { contains: query, mode: 'insensitive' } },
                    { displayName: { contains: query, mode: 'insensitive' } },
                ],
            },
            orderBy: [{ handle: 'asc' }, { id: 'asc' }],
            take: take + 1,
            ...(cursorId && { cursor: { id: cursorId }, skip: 1 }),
            select: { id: true, handle: true, displayName: true, avatarUrl: true },
        });
        const { items: rows, nextCursor } = paginate(users, take);
        const items = await hydrateIsFollowing(this.prisma, rows, viewerId);
        return { items, nextCursor };
    }
    async quickSearchUsers(query, limit, viewerId) {
        const rows = await this.prisma.user.findMany({
            where: {
                status: 'ACTIVE',
                OR: [
                    { handle: { contains: query, mode: 'insensitive' } },
                    { displayName: { contains: query, mode: 'insensitive' } },
                ],
            },
            orderBy: [{ handle: 'asc' }],
            take: limit,
            select: {
                id: true,
                handle: true,
                displayName: true,
                avatarUrl: true,
                isPrivate: true,
            },
        });
        const hydrated = await hydrateIsFollowing(this.prisma, rows, viewerId);
        return hydrated.map(({ id: _id, ...rest }) => rest);
    }
};
UserSearchRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UserSearchRepository);
export { UserSearchRepository };
//# sourceMappingURL=user-search.repository.js.map