import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.spec.ts',
        'src/__mocks__/**',
        'src/main.ts',
        'src/instrument.ts',
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: /.*[/\\]generated[/\\]prisma[/\\]client(\.js)?$/,
        replacement: fileURLToPath(
          new URL('./src/__mocks__/prisma-client.ts', import.meta.url),
        ),
      },
    ],
  },
});
