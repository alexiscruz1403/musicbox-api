import type { JwtPayload } from '../auth/strategies/jwt.strategy.js';
import { FollowSuggestionsService } from './follow-suggestions.service.js';
export declare class FollowSuggestionsController {
    private readonly service;
    constructor(service: FollowSuggestionsService);
    getSuggestions(user: JwtPayload): Promise<{
        data: {
            id: string;
            handle: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
    }>;
}
