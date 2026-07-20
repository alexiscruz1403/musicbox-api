// FOLLOWED-mode cursors are plain id-cursors — see
// src/modules/common/pagination/id-cursor.util.ts (encodeIdCursor/
// decodeIdCursor). Re-exported here under the old names so existing imports
// (and the "legacy FOLLOWED cursor replayed against ALL mode" fallback test
// below) keep reading naturally in this file's own vocabulary.
export {
  encodeIdCursor as encodeFollowedCursor,
  decodeIdCursor as decodeFollowedCursor,
} from '../common/pagination/id-cursor.util.js';

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
