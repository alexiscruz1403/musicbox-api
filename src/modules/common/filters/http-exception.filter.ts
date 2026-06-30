import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    statusCode: number;
  };
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const res = exceptionResponse as Record<string, unknown>;
        message =
          typeof res['message'] === 'string'
            ? res['message']
            : exception.message;
        code =
          typeof res['code'] === 'string'
            ? res['code']
            : this.statusToCode(statusCode);
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
