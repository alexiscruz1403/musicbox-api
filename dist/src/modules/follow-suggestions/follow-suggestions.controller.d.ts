import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { FollowSuggestionsService } from './follow-suggestions.service.js';
export declare class FollowSuggestionsController {
    private readonly service;
    constructor(service: FollowSuggestionsService);
    getSuggestions(user: JwtPayload): Promise<{
        data: {
            handle: string;
            displayName: string;
            id: string;
            avatarUrl: string | null;
        }[];
    }>;
}
