import { type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PgBoss } from 'pg-boss';
export declare class PgBossService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    readonly boss: PgBoss;
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
