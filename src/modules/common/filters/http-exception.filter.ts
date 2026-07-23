import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
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
      // Un pool/pooler saturado o una DB inalcanzable no es un bug de la app:
      // es indisponibilidad temporal, y el cliente puede reintentar. Se degrada
      // a 503 en vez del 500 genérico (se sigue reportando a Sentry abajo,
      // porque es un incidente real de infraestructura).
      if (this.isConnectionFailure(exception)) {
        statusCode = HttpStatus.SERVICE_UNAVAILABLE;
        code = 'SERVICE_UNAVAILABLE';
      }
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}: ${msg}`,
        stack,
      );
      // Solo los errores inesperados (5xx no-HttpException) van a Sentry — los
      // 4xx de negocio (HttpException, arriba) se excluyen para no meter ruido.
      // Inerte si Sentry no fue inicializado (sin SENTRY_DSN).
      Sentry.captureException(exception);
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
      503: 'SERVICE_UNAVAILABLE',
    };
    return map[status] ?? 'UNKNOWN_ERROR';
  }

  // Se detecta por duck-typing en vez de instanceof: el error llega envuelto en
  // un DriverAdapterError de Prisma (tipo interno del adapter, no exportado en
  // el barrel público), con el error real de `pg` colgando de `cause`.
  private isConnectionFailure(exception: unknown): boolean {
    // EMAXCONNSESSION: pooler de Supabase en session mode sin cupos.
    // "too many clients": mensaje nativo de PgBouncer/PostgreSQL.
    // 53300: SQLSTATE too_many_connections.
    const MESSAGE_MARKERS = [
      'EMAXCONNSESSION',
      'too many clients',
      'too many connections',
      'Connection terminated',
      'ECONNREFUSED',
      'ETIMEDOUT',
    ];
    const CODES = ['53300', 'ECONNREFUSED', 'ETIMEDOUT', 'ECONNRESET'];

    for (let err: unknown = exception, depth = 0; err && depth < 5; depth++) {
      const candidate = err as {
        message?: unknown;
        code?: unknown;
        cause?: unknown;
      };
      if (
        typeof candidate.message === 'string' &&
        MESSAGE_MARKERS.some((marker) =>
          (candidate.message as string).includes(marker),
        )
      ) {
        return true;
      }
      if (
        typeof candidate.code === 'string' &&
        CODES.includes(candidate.code)
      ) {
        return true;
      }
      err = candidate.cause;
    }
    return false;
  }
}
