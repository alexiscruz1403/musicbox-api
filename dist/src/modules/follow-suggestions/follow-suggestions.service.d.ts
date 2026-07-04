import { FollowSuggestionsRepository } from './follow-suggestions.repository.js';
export declare class FollowSuggestionsService {
    private readonly repo;
    constructor(repo: FollowSuggestionsRepository);
    getSuggestions(userId: string): Promise<{
        handle: string;
        displayName: string;
        id: string;
        avatarUrl: string | null;
    }[]>;
    recompute(userId: string): Promise<{
        userId: string;
        payload: import("@prisma/client/runtime/client").JsonValue;
        generatedAt: Date;
    }>;
    private gatherSignals;
    private scoreCandidates;
}
