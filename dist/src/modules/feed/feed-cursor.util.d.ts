export declare function encodeFollowedCursor(id: string): string;
export declare function decodeFollowedCursor(cursor?: string): string | undefined;
export type FeedPhase = 'S' | 'T' | 'R';
export declare const FEED_PHASES: FeedPhase[];
export interface AllFeedCursor {
    phase: FeedPhase;
    id?: string;
}
export declare function encodeAllCursor(cursor: AllFeedCursor): string;
export declare function decodeAllCursor(cursor?: string): AllFeedCursor;
