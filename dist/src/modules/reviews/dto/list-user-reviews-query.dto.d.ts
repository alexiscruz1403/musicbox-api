export type UserReviewSortMode = 'recent' | 'oldest' | 'best' | 'worst';
export declare class ListUserReviewsQueryDto {
    cursor?: string;
    limit: number;
    sort: UserReviewSortMode;
    q?: string;
}
