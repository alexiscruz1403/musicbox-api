import { UserSearchHistoryRepository } from './user-search-history.repository.js';
export declare class UserSearchHistoryService {
    private readonly repo;
    private readonly logger;
    constructor(repo: UserSearchHistoryRepository);
    recordSearch(searcherId: string, query: string): Promise<void>;
    listHistory(searcherId: string): Promise<{
        id: string;
        query: string;
        searchedAt: Date;
        searcherId: string;
    }[]>;
    deleteHistoryItem(searcherId: string, id: string): Promise<void>;
    deleteAllHistory(searcherId: string): Promise<void>;
}
