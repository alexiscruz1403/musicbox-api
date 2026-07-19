import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { I18nContext } from 'nestjs-i18n';

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    statusCode: number;
  };
}

// Cada excepción de negocio lanza { code, args? } — el texto final se resuelve
// acá, en el idioma del request (I18nContext.current()), contra
// src/i18n/{en,es}/errors.json usando `code` como clave (docs/fase-9-features.md).
// Los `throw` a lo largo del código ya no llevan un `message` literal.
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const i18n = I18nContext.current(host);

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_ERROR';
    let args: Record<string, unknown> | undefined;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        code = this.statusToCode(statusCode);
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const res = exceptionResponse as Record<string, unknown>;
        code =
          typeof res['code'] === 'string'
            ? res['code']
            : this.statusToCode(statusCode);
        args = res['args'] as Record<string, unknown> | undefined;
      }
    } else {
      const msg =
        exception instanceof Error ? exception.message : String(exception);
      const stack = exception instanceof Error ? exception.stack : undefined;
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}: ${msg}`,
        stack,
      );
    }

    const message =
      i18n?.translate(`errors.${code}`, { args, defaultValue: code }) ?? code;

    const body: ErrorResponse = {
      error: { code, message, statusCode },
    };

    response.status(statusCode).json(body);
  }

  private statusToCode(status: number): string {
    const map: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_ERROR',
    };
    return map[status] ?? 'UNKNOWN_ERROR';
  }
}
