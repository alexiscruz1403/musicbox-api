const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function encodeIdCursor(id: string): string {
  return Buffer.from(id).toString('base64');
}

/**
 * Validates the decoded string looks like a UUID before returning it —
 * base64-decoding never throws, so a shape check is required to reject
 * garbage cursors instead of passing them straight to Prisma.
 */
export function decodeIdCursor(cursor?: string | null): string | undefined {
  if (!cursor) return undefined;
  const decoded = Buffer.from(cursor, 'base64').toString('utf8');
  return UUID_RE.test(decoded) ? decoded : undefined;
}

/**
 * Shared cursor-pagination shape used by every id-ordered listing in the
 * project: fetch `take + 1` rows, and if the extra row came back, the last
 * *requested* row's id becomes the next cursor.
 */
export function paginate<T extends { id: string }>(
  rows: T[],
  take: number,
): { items: T[]; nextCursor: string | null } {
  const hasMore = rows.length > take;
  const items = hasMore ? rows.slice(0, take) : rows;
  const nextCursor = hasMore
    ? encodeIdCursor(items[items.length - 1].id)
    : null;
  return { items, nextCursor };
}
