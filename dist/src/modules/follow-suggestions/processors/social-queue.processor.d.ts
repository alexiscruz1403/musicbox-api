import { type OnApplicationBootstrap } from '@nestjs/common';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import { FollowSuggestionsService } from '../follow-suggestions.service.js';
export declare class SocialQueueProcessor implements OnApplicationBootstrap {
    private readonly followSuggestions;
    private readonly pgBoss;
    constructor(followSuggestions: FollowSuggestionsService, pgBoss: PgBossService);
    onApplicationBootstrap(): Promise<void>;
    private handleBatch;
    private relayToNotifications;
    private recomputeFollowSuggestions;
}
