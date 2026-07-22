import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RedisService } from '../../redis/redis.service.js';

export interface HealthResult {
  status: 'ok' | 'error';
  checks: {
    database: 'up' | 'down';
    redis: 'up' | 'down';
  };
}

// Health check liviano para el probe de la plataforma (Render healthCheckPath
// = /v1/health). Verifica las dos dependencias con estado: PostgreSQL (Prisma)
// y Redis. pg-boss corre sobre el mismo Postgres, así que el check de DB lo
// cubre indirectamente. Se evita @nestjs/terminus para no sumar dependencia.
@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<HealthResult> {
    const [database, redis] = await Promise.all([
      this.checkDatabase(),
      this.checkRedis(),
    ]);
    const status = database && redis ? 'ok' : 'error';
    return {
      status,
      checks: {
        database: database ? 'up' : 'down',
        redis: redis ? 'up' : 'down',
      },
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  private async checkRedis(): Promise<boolean> {
    try {
      const pong = await this.redis.client.ping();
      return pong === 'PONG';
    } catch {
      return false;
    }
  }
}
