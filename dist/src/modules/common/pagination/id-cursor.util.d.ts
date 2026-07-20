export declare function encodeIdCursor(id: string): string;
export declare function decodeIdCursor(cursor?: string | null): string | undefined;
export declare function paginate<T extends {
    id: string;
}>(rows: T[], take: number): {
    items: T[];
    nextCursor: string | null;
};
