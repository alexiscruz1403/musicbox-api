import type { Server } from 'node:http';
import type { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';

// Smoke e2e: levanta el AppModule real (Prisma/Redis/pg-boss reales, sin
// mocks) y verifica que el health endpoint responde y que sus dependencias con
// estado (PostgreSQL + Redis) están arriba. Requiere DATABASE_URL/REDIS_URL
// (y PGBOSS_DATABASE_URL) alcanzables — se corre con `npm run test:e2e`.
// Los E2E de navegador (flujos de UI con Playwright) viven en musicbox-web.
describe('Health (e2e)', () => {
  let app: INestApplication<Server>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Mismo prefijo global que main.ts, para que el path sea /v1/health.
    app.setGlobalPrefix('v1');
    await app.init();
  });

  afterEach(async () => {
    // Cierra conexiones (pg-boss.stop, prisma.$disconnect, redis.quit).
    await app.close();
  });

  it('GET /v1/health reports the app and its dependencies are up', async () => {
    const res = await request(app.getHttpServer()).get('/v1/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: 'ok',
      checks: { database: 'up', redis: 'up' },
    });
  });
});
