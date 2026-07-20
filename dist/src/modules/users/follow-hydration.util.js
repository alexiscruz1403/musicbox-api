export async function hydrateIsFollowing(prisma, users, viewerId) {
    const followedIds = viewerId && users.length > 0
        ? new Set((await prisma.follow.findMany({
            where: {
                followerId: viewerId,
                followeeId: { in: users.map((u) => u.id) },
            },
            select: { followeeId: true },
        })).map((f) => f.followeeId))
        : new Set();
    return users.map((u) => ({ ...u, isFollowing: followedIds.has(u.id) }));
}
//# sourceMappingURL=follow-hydration.util.js.map