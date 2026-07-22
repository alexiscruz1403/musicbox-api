var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PgBossService_1;
import { Injectable, Logger, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PgBoss } from 'pg-boss';
import { ALL_QUEUES, PGBOSS_QUEUE_OPTIONS, } from '../modules/events/events.constants.js';
let PgBossService = PgBossService_1 = class PgBossService {
    logger = new Logger(PgBossService_1.name);
    boss;
    constructor(config) {
        const connectionString = config.get('PGBOSS_DATABASE_URL') ??
            config.get('DIRECT_URL') ??
            config.getOrThrow('DATABASE_URL');
        this.boss = new PgBoss({
            connectionString,
            schema: 'pgboss',
            max: 5,
            application_name: 'musicbox-pgboss',
        });
        this.boss.on('error', (err) => this.logger.error('pg-boss error', err.stack ?? err.message));
    }
    async onModuleInit() {
        await this.boss.start();
        for (const queue of ALL_QUEUES) {
            await this.boss.createQueue(queue, PGBOSS_QUEUE_OPTIONS);
        }
        this.logger.log(`pg-boss iniciado — ${ALL_QUEUES.length} colas listas`);
    }
    async onModuleDestroy() {
        await this.boss.stop();
    }
};
PgBossService = PgBossService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], PgBossService);
export { PgBossService };
//# sourceMappingURL=pgboss.service.js.map