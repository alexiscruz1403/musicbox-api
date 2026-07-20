import type { PrismaService } from '../../prisma/prisma.service.js';

// Batched isFollowing lookup shared by FollowRepository.getFollowers/
// getFollowing and UserSearchRepository.searchUsers — a single
// Follow.findMany against the page's ids instead of N+1. Exported as a
// plain function (not a class method) so both repositories can reuse it
// without creating a repo-to-repo DI dependency between them.
export async function hydrateIsFollowing<T extends { id: string }>(
  prisma: PrismaService,
  users: T[],
  viewerId?: string,
): Promise<(T & { isFollowing: boolean })[]> {
  const followedIds =
    viewerId && users.length > 0
      ? new Set(
          (
            await prisma.follow.findMany({
              where: {
                followerId: viewerId,
                followeeId: { in: users.map((u) => u.id) },
              },
              select: { followeeId: true },
            })
          ).map((f) => f.followeeId),
        )
      : new Set<string>();

  return users.map((u) => ({ ...u, isFollowing: followedIds.has(u.id) }));
}
