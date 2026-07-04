export type FeedMode = 'FOLLOWED' | 'ALL';
export declare class ListFeedQueryDto {
    type: FeedMode;
    cursor?: string;
    limit: number;
}
