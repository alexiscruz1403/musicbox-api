import type { Queue } from 'bullmq';
import { BullMqJobScheduler } from '../../common/scheduling/bullmq-job-scheduler.js';
export declare class RecommendationsScheduler extends BullMqJobScheduler {
    constructor(queue: Queue);
}
