import type { OnApplicationBootstrap } from '@nestjs/common';
import type { Queue } from 'bullmq';
export type BullMqRepeat = {
    every: number;
} | {
    pattern: string;
};
export declare abstract class BullMqJobScheduler implements OnApplicationBootstrap {
    private readonly queue;
    private readonly schedulerId;
    private readonly jobName;
    private readonly repeat;
    constructor(queue: Queue, schedulerId: string, jobName: string, repeat: BullMqRepeat);
    onApplicationBootstrap(): Promise<void>;
}
