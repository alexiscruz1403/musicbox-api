import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import type { Response } from 'express';
import { Public } from '../common/decorators/public.decorator.js';
import { HealthService } from './health.service.js';

// GET /v1/health (prefijo global 'v1'). @Public para que el probe no requiera
// JWT; @SkipThrottle para que los chequeos periódicos de Render no consuman el
// rate limit. Se setea el status a mano vía @Res passthrough (mismo patrón que
// el endpoint SSE) para devolver 200/503 con el cuerpo de checks intacto, sin
// pasar por el HttpExceptionFilter.
@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Public()
  @SkipThrottle()
  @Get()
  async check(@Res({ passthrough: true }) res: Response) {
    const result = await this.health.check();
    res.status(
      result.status === 'ok' ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE,
    );
    return result;
  }
}
