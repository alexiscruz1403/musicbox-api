import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { of } from 'rxjs';
import { IdempotencyInterceptor } from './idempotency.interceptor.js';

const mockRedis = {
  get: vi.fn(),
  set: vi.fn(),
};

const mockConfig = {
  get: vi.fn(),
};

function buildContext(headers: Record<string, string> = {}) {
  const response = { setHeader: vi.fn() };
  const request = { headers };
  return {
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => response,
    }),
  } as unknown as ExecutionContext;
}

function buildHandler(result: unknown): CallHandler {
  return { handle: () => of(result) };
}

describe('IdempotencyInterceptor', () => {
  let interceptor: IdempotencyInterceptor;

  beforeEach(() => {
    vi.clearAllMocks();
    mockConfig.get.mockReturnValue(259200);
    interceptor = new IdempotencyInterceptor(
      mockRedis as never,
      mockConfig as never,
    );
  });

  it('rejects requests missing the Idempotency-Key header', async () => {
    await expect(
      interceptor.intercept(buildContext(), buildHandler({ ok: true })),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('caches a JSON response body on first execution', async () => {
    mockRedis.get.mockResolvedValue(null);
    const context = buildContext({ 'idempotency-key': 'key-1' });

    const obs = await interceptor.intercept(
      context,
      buildHandler({ data: { id: 1 } }),
    );
    await new Promise<void>((resolve) => obs.subscribe({ complete: resolve }));

    expect(mockRedis.set).toHaveBeenCalledWith(
      'idempotency:key-1',
      JSON.stringify({ data: { id: 1 } }),
      259200,
    );
  });

  it('replays a cached JSON response without calling the handler again', async () => {
    mockRedis.get.mockResolvedValue(JSON.stringify({ data: { id: 1 } }));
    const context = buildContext({ 'idempotency-key': 'key-1' });
    const handler = buildHandler({ data: { id: 2 } });
    const handleSpy = vi.spyOn(handler, 'handle');

    const obs = await interceptor.intercept(context, handler);
    const emitted = await new Promise((resolve) => {
      obs.subscribe({ next: resolve });
    });

    expect(emitted).toEqual({ data: { id: 1 } });
    expect(handleSpy).not.toHaveBeenCalled();
  });

  it('stores a sentinel (not JSON.stringify(undefined)) for a void/204 response body', async () => {
    mockRedis.get.mockResolvedValue(null);
    const context = buildContext({ 'idempotency-key': 'key-2' });

    const obs = await interceptor.intercept(context, buildHandler(undefined));
    await new Promise<void>((resolve) => obs.subscribe({ complete: resolve }));

    const [, storedValue] = mockRedis.set.mock.calls[0] as [string, string];
    expect(typeof storedValue).toBe('string');
  });

  it('replays a cached void/204 response as undefined, not a parsed sentinel string', async () => {
    mockRedis.get.mockResolvedValue(null);
    const writeContext = buildContext({ 'idempotency-key': 'key-3' });
    const writeObs = await interceptor.intercept(
      writeContext,
      buildHandler(undefined),
    );
    await new Promise<void>((resolve) =>
      writeObs.subscribe({ complete: resolve }),
    );
    const [, sentinel] = mockRedis.set.mock.calls[0] as [string, string];

    mockRedis.get.mockResolvedValue(sentinel);
    const replayContext = buildContext({ 'idempotency-key': 'key-3' });
    const replayObs = await interceptor.intercept(
      replayContext,
      buildHandler({ shouldNotBeCalled: true }),
    );
    const emitted = await new Promise((resolve) => {
      replayObs.subscribe({ next: resolve });
    });

    expect(emitted).toBeUndefined();
  });
});
