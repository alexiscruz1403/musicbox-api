import type { ExecutionContext } from '@nestjs/common';
import { JwtLanguageResolver } from './jwt-language.resolver.js';

const mockJwt = {
  decode: vi.fn(),
};

function buildContext(headers: Record<string, string> = {}) {
  const request = { headers };
  return {
    switchToHttp: () => ({
      getRequest: () => request,
    }),
  } as unknown as ExecutionContext;
}

describe('JwtLanguageResolver', () => {
  let resolver: JwtLanguageResolver;

  beforeEach(() => {
    vi.clearAllMocks();
    resolver = new JwtLanguageResolver(mockJwt as never);
  });

  it('returns undefined when there is no Authorization header', () => {
    expect(resolver.resolve(buildContext())).toBeUndefined();
    expect(mockJwt.decode).not.toHaveBeenCalled();
  });

  it('returns undefined when the Authorization header is not a Bearer token', () => {
    expect(
      resolver.resolve(buildContext({ authorization: 'Basic abc123' })),
    ).toBeUndefined();
    expect(mockJwt.decode).not.toHaveBeenCalled();
  });

  it("decodes the Bearer token's language claim without verifying it", () => {
    mockJwt.decode.mockReturnValue({ sub: 'u1', language: 'ES' });

    const result = resolver.resolve(
      buildContext({ authorization: 'Bearer sometoken' }),
    );

    expect(mockJwt.decode).toHaveBeenCalledWith('sometoken');
    expect(result).toBe('ES');
  });

  it('returns undefined when the payload has no language claim', () => {
    mockJwt.decode.mockReturnValue({ sub: 'u1' });

    const result = resolver.resolve(
      buildContext({ authorization: 'Bearer sometoken' }),
    );

    expect(result).toBeUndefined();
  });

  it('returns undefined instead of throwing when decoding fails', () => {
    mockJwt.decode.mockImplementation(() => {
      throw new Error('malformed token');
    });

    const result = resolver.resolve(
      buildContext({ authorization: 'Bearer garbage' }),
    );

    expect(result).toBeUndefined();
  });
});
