const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function encodeFollowedCursor(id: string): string {
  return Buffer.from(id).toString('base64');
}

/**
 * Validates the decoded string looks like a review id (UUID) before
 * returning it — guards against an ALL-mode JSON cursor being replayed
 * against FOLLOWED mode (e.g. the client switched tabs). base64-decoding
 * never throws, so a shape check is required.
 */
export function decodeFollowedCursor(cursor?: string): string | undefined {
  if (!cursor) return undefined;
  const decoded = Buffer.from(cursor, 'base64').toString('utf8');
  return UUID_RE.test(decoded) ? decoded : undefined;
}

export type FeedPhase = 'S' | 'T' | 'R';
export const FEED_PHASES: FeedPhase[] = ['S', 'T', 'R'];

export interface AllFeedCursor {
  phase: FeedPhase;
  id?: string;
}

const DEFAULT_ALL_CURSOR: AllFeedCursor = { phase: 'S', id: undefined };

export function encodeAllCursor(cursor: AllFeedCursor): string {
  return Buffer.from(JSON.stringify(cursor), 'utf8').toString('base64');
}

/**
 * Never throws: malformed base64/JSON, an unrecognized phase, or a legacy
 * plain base64(id) cursor from FOLLOWED mode (JSON.parse on a raw UUID
 * string throws) all fall back to a fresh start at phase 'S'.
 */
export function decodeAllCursor(cursor?: string): AllFeedCursor {
  if (!cursor) return DEFAULT_ALL_CURSOR;
  try {
    const parsed: unknown = JSON.parse(
      Buffer.from(cursor, 'base64').toString('utf8'),
    );
    if (
      parsed !== null &&
      typeof parsed === 'object' &&
      FEED_PHASES.includes((parsed as { phase?: unknown }).phase as FeedPhase)
    ) {
      const { phase, id } = parsed as { phase: FeedPhase; id?: unknown };
      return { phase, id: typeof id === 'string' ? id : undefined };
    }
  } catch {
    // fall through to fresh start
  }
  return DEFAULT_ALL_CURSOR;
}
