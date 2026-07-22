import { Test, type TestingModule } from '@nestjs/testing';
import { PgBossService } from '../../../pgboss/pgboss.service.js';
import {
  NOTIFICATIONS_QUEUE,
  type JobEnvelope,
} from '../../events/events.constants.js';
import { NotificationsService } from '../notifications.service.js';
import { NotificationsQueueProcessor } from './notifications-queue.processor.js';

const mockService = {
  createFromEvent: vi.fn(),
};

const mockBoss = {
  send: vi.fn(),
  work: vi.fn(),
};
const mockPgBoss = { boss: mockBoss };

type WorkHandler = (jobs: { data: JobEnvelope }[]) => Promise<void>;

describe('NotificationsQueueProcessor', () => {
  let handle: WorkHandler;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsQueueProcessor,
        { provide: NotificationsService, useValue: mockService },
        { provide: PgBossService, useValue: mockPgBoss },
      ],
    }).compile();

    const processor = module.get(NotificationsQueueProcessor);
    await processor.onApplicationBootstrap();
    handle = mockBoss.work.mock.calls[0][1] as WorkHandler;
  });

  it('registers a worker on the notifications queue', () => {
    expect(mockBoss.work).toHaveBeenCalledWith(
      NOTIFICATIONS_QUEUE,
      expect.any(Function),
    );
  });

  it('delegates every job to NotificationsService.createFromEvent with event and payload', async () => {
    await handle([
      { data: { event: 'reaction.added', payload: { foo: 'bar' } } },
    ]);

    expect(mockService.createFromEvent).toHaveBeenCalledWith('reaction.added', {
      foo: 'bar',
    });
  });
});
