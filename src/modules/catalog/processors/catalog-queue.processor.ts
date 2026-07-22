import { Injectable, type OnApplicationBootstrap } from '@nestjs/common';
import type { Job } from 'pg-boss';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  CATALOG_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import { CatalogSyncService } from '../catalog-sync.service.js';
import { CATALOG_SYNC_JOB_NAME } from '../catalog.constants.js';

@Injectable()
export class CatalogQueueProcessor implements OnApplicationBootstrap {
  constructor(
    private readonly catalogSyncService: CatalogSyncService,
    private readonly pgBoss: PgBossService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.pgBoss.boss.work<JobEnvelope>(CATALOG_QUEUE, (jobs) =>
      this.handleBatch(jobs),
    );
  }

  private async handleBatch(jobs: Job<JobEnvelope>[]): Promise<void> {
    for (const { data } of jobs) {
      if (data.event !== CATALOG_SYNC_JOB_NAME) continue;
      await this.catalogSyncService.syncStaleArtists();
    }
  }
}
