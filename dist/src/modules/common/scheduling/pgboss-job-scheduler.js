export class PgBossJobScheduler {
    pgBoss;
    queue;
    event;
    cron;
    key;
    constructor(pgBoss, queue, event, cron, key) {
        this.pgBoss = pgBoss;
        this.queue = queue;
        this.event = event;
        this.cron = cron;
        this.key = key;
    }
    async onApplicationBootstrap() {
        await this.pgBoss.boss.schedule(this.queue, this.cron, { event: this.event, payload: {} }, { key: this.key });
    }
}
//# sourceMappingURL=pgboss-job-scheduler.js.map