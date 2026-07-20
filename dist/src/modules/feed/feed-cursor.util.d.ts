export { encodeIdCursor as encodeFollowedCursor, decodeIdCursor as decodeFollowedCursor, } from '../common/pagination/id-cursor.util.js';
export type FeedPhase = 'S' | 'T' | 'R';
export declare const FEED_PHASES: FeedPhase[];
export interface AllFeedCursor {
    phase: FeedPhase;
    id?: string;
}
export declare function encodeAllCursor(cursor: AllFeedCursor): string;
export declare function decodeAllCursor(cursor?: string): AllFeedCursor;
