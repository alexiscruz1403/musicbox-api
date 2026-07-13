const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function encodeCatalogCursor(id: string): string {
  return Buffer.from(id).toString('base64');
}

/**
 * Validates the decoded string looks like a track id (UUID) before
 * returning it — base64-decoding never throws, so a shape check is required
 * to reject garbage cursors instead of passing them straight to Prisma.
 */
export function decodeCatalogCursor(
  cursor?: string | null,
): string | undefined {
  if (!cursor) return undefined;
  const decoded = Buffer.from(cursor, 'base64').toString('utf8');
  return UUID_RE.test(decoded) ? decoded : undefined;
}
