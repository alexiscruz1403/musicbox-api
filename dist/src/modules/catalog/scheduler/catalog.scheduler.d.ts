import type { Queue } from 'bullmq';
import { BullMqJobScheduler } from '../../common/scheduling/bullmq-job-scheduler.js';
export declare class CatalogScheduler extends BullMqJobScheduler {
    constructor(queue: Queue);
}
