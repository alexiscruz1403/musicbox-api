import { PgBossService } from '../../pgboss/pgboss.service.js';
export interface ReviewEventPayload {
    reviewId: string;
    userId: string;
    type: 'TRACK' | 'ALBUM';
    albumId: string | null;
    trackId: string | null;
}
export declare class ReviewEventsProducer {
    private readonly pgBoss;
    constructor(pgBoss: PgBossService);
    emitCreated(payload: ReviewEventPayload): Promise<string | null>;
    emitUpdated(payload: ReviewEventPayload): Promise<string | null>;
    emitDeleted(payload: ReviewEventPayload): Promise<string | null>;
}
