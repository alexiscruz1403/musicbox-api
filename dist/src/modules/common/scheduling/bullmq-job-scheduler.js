export class BullMqJobScheduler {
    queue;
    schedulerId;
    jobName;
    repeat;
    constructor(queue, schedulerId, jobName, repeat) {
        this.queue = queue;
        this.schedulerId = schedulerId;
        this.jobName = jobName;
        this.repeat = repeat;
    }
    async onApplicationBootstrap() {
        await this.queue.upsertJobScheduler(this.schedulerId, this.repeat, {
            name: this.jobName,
        });
    }
}
//# sourceMappingURL=bullmq-job-scheduler.js.map