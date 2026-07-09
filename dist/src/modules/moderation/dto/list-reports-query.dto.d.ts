export declare class ListReportsQueryDto {
    status?: 'PENDING' | 'REVIEWED' | 'DISMISSED';
    targetType?: 'REVIEW' | 'COMMENT' | 'USER';
    cursor?: string;
    limit: number;
}
