import { defineConfig } from 'vitest/config';

// Minimal e2e config — boots the real AppModule (real Prisma/Redis clients,
// no mocks), unlike vitest.config.ts which aliases the Prisma client to
// src/__mocks__/prisma-client.ts for unit tests. Requires a reachable
// DATABASE_URL/REDIS_URL (same .env used by `npm run start:dev`).
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.e2e-spec.ts'],
  },
});
