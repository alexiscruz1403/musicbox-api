import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  decodeIdCursor,
  paginate,
} from '../common/pagination/id-cursor.util.js';
import { hydrateIsFollowing } from './follow-hydration.util.js';

@Injectable()
export class UserSearchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async searchUsers(
    query: string,
    cursor?: string,
    limit = 10,
    viewerId?: string,
  ) {
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

  async quickSearchUsers(query: string, limit: number, viewerId?: string) {
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
}
