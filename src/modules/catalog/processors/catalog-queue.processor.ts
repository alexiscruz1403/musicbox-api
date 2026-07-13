import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { CATALOG_QUEUE } from '../../events/events.constants.js';
import { CatalogSyncService } from '../catalog-sync.service.js';
import { CATALOG_SYNC_JOB_NAME } from '../catalog.constants.js';

@Injectable()
@Processor(CATALOG_QUEUE)
export class CatalogQueueProcessor extends WorkerHost {
  constructor(private readonly catalogSyncService: CatalogSyncService) {
    super();
  }

  async process(job: Job): Promise<void> {
    if (job.name !== CATALOG_SYNC_JOB_NAME) return;
    await this.catalogSyncService.syncStaleArtists();
  }
}
