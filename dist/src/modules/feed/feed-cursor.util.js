export { encodeIdCursor as encodeFollowedCursor, decodeIdCursor as decodeFollowedCursor, } from '../common/pagination/id-cursor.util.js';
export const FEED_PHASES = ['S', 'T', 'R'];
const DEFAULT_ALL_CURSOR = { phase: 'S', id: undefined };
export function encodeAllCursor(cursor) {
    return Buffer.from(JSON.stringify(cursor), 'utf8').toString('base64');
}
export function decodeAllCursor(cursor) {
    if (!cursor)
        return DEFAULT_ALL_CURSOR;
    try {
        const parsed = JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));
        if (parsed !== null &&
            typeof parsed === 'object' &&
            FEED_PHASES.includes(parsed.phase)) {
            const { phase, id } = parsed;
            return { phase, id: typeof id === 'string' ? id : undefined };
        }
    }
    catch {
    }
    return DEFAULT_ALL_CURSOR;
}
//# sourceMappingURL=feed-cursor.util.js.map