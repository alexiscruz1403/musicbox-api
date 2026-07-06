import { Test, TestingModule } from '@nestjs/testing';
import type { Job } from 'bullmq';
import { NotificationsService } from '../notifications.service.js';
import { NotificationsQueueProcessor } from './notifications-queue.processor.js';

const mockService = {
  createFromEvent: vi.fn(),
};

describe('NotificationsQueueProcessor', () => {
  let processor: NotificationsQueueProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsQueueProcessor,
        { provide: NotificationsService, useValue: mockService },
      ],
    }).compile();

    processor = module.get(NotificationsQueueProcessor);
    vi.clearAllMocks();
  });

  it('delegates every job to NotificationsService.createFromEvent with name and data', async () => {
    const job = {
      name: 'reaction.added',
      data: { foo: 'bar' },
    } as unknown as Job;

    await processor.process(job);

    expect(mockService.createFromEvent).toHaveBeenCalledWith('reaction.added', {
      foo: 'bar',
    });
  });
});
