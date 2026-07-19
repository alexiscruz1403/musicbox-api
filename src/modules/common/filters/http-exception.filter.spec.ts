import type { ArgumentsHost } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { HttpExceptionFilter } from './http-exception.filter.js';

interface ErrorResponseBody {
  error: { code: string; message: string; statusCode: number };
}

// Minimal in-memory catalog mimicking src/i18n/{en,es}/errors.json, just
// enough to exercise lang resolution + {placeholder} interpolation without
// booting the real I18nModule.
const CATALOGS: Record<string, Record<string, string>> = {
  en: {
    'errors.USER_NOT_FOUND': 'User not found.',
    'errors.TRACK_NOT_IN_ALBUM':
      "Track {deezerId} doesn't belong to this album.",
  },
  es: {
    'errors.USER_NOT_FOUND': 'Usuario no encontrado.',
    'errors.TRACK_NOT_IN_ALBUM':
      'El track {deezerId} no pertenece a este álbum.',
  },
};

const mockI18nService = {
  translate: vi.fn(
    (
      key: string,
      options?: {
        lang?: string;
        args?: Record<string, unknown>;
        defaultValue?: string;
      },
    ) => {
      const lang = options?.lang ?? 'en';
      const catalog = CATALOGS[lang] ?? CATALOGS['en'];
      let text = catalog?.[key] ?? options?.defaultValue ?? key;
      for (const [k, v] of Object.entries(options?.args ?? {})) {
        text = text.replaceAll(`{${k}}`, String(v));
      }
      return text;
    },
  ),
};

function buildHost() {
  const jsonSpy = vi.fn<(body: ErrorResponseBody) => void>();
  const response = { status: vi.fn().mockReturnValue({ json: jsonSpy }) };
  const request = { method: 'GET', url: '/v1/test' };
  const host = {
    getType: () => 'http',
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => response,
    }),
  } as unknown as ArgumentsHost;
  return { host, response, jsonSpy };
}

function withLang<T>(lang: string, fn: () => T): T {
  const ctx = new I18nContext(
    lang,
    mockI18nService as never,
    {
      enabled: false,
    } as never,
  );
  let result!: T;
  I18nContext.create(ctx, () => {
    result = fn();
  });
  return result;
}

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    vi.clearAllMocks();
    filter = new HttpExceptionFilter();
  });

  it('translates the same code to English or Spanish depending on the resolved I18nContext lang', () => {
    const exception = new NotFoundException({ code: 'USER_NOT_FOUND' });

    const enResult = withLang('en', () => {
      const { host, jsonSpy } = buildHost();
      filter.catch(exception, host);
      return jsonSpy.mock.calls[0][0];
    });
    const esResult = withLang('es', () => {
      const { host, jsonSpy } = buildHost();
      filter.catch(exception, host);
      return jsonSpy.mock.calls[0][0];
    });

    expect(enResult).toEqual({
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found.',
        statusCode: 404,
      },
    });
    expect(esResult).toEqual({
      error: {
        code: 'USER_NOT_FOUND',
        message: 'Usuario no encontrado.',
        statusCode: 404,
      },
    });
  });

  it('interpolates args from the exception into the translated message', () => {
    const exception = new BadRequestException({
      code: 'TRACK_NOT_IN_ALBUM',
      args: { deezerId: '12345' },
    });

    const result = withLang('es', () => {
      const { host, jsonSpy } = buildHost();
      filter.catch(exception, host);
      return jsonSpy.mock.calls[0][0];
    });

    expect(result).toEqual({
      error: {
        code: 'TRACK_NOT_IN_ALBUM',
        message: 'El track 12345 no pertenece a este álbum.',
        statusCode: 400,
      },
    });
  });

  it('falls back to the raw code when there is no resolved I18nContext', () => {
    const exception = new NotFoundException({ code: 'USER_NOT_FOUND' });
    const { host, jsonSpy } = buildHost();

    filter.catch(exception, host);

    expect(jsonSpy).toHaveBeenCalledWith({
      error: {
        code: 'USER_NOT_FOUND',
        message: 'USER_NOT_FOUND',
        statusCode: 404,
      },
    });
  });

  it('falls back to INTERNAL_ERROR for an unhandled non-HTTP exception', () => {
    const { host, jsonSpy, response } = buildHost();

    filter.catch(new Error('boom'), host);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(jsonSpy).toHaveBeenCalledWith({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'INTERNAL_ERROR',
        statusCode: 500,
      },
    });
  });
});
