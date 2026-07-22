import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

// Se importa como primera línea de main.ts, antes de que Nest arranque, para
// que la auto-instrumentación de Sentry se aplique. Corre sobre process.env
// crudo (ConfigService aún no existe). Inerte si no hay SENTRY_DSN.
if (process.env['SENTRY_DSN']) {
  // Muestreo de trazas de performance (APM). Errores se capturan al 100%; las
  // trazas se muestrean para no gastar cuota — bajo por defecto en prod.
  const tracesSampleRate = Number(
    process.env['SENTRY_TRACES_SAMPLE_RATE'] ?? '0.1',
  );

  // Campos sensibles a scrubbear del body antes de enviar el evento (Ley
  // 25.326 §14: no filtrar PII/credenciales a un tercero).
  const SENSITIVE_BODY_FIELDS = [
    'password',
    'currentPassword',
    'newPassword',
    'token',
    'accessToken',
    'refreshToken',
  ];

  Sentry.init({
    dsn: process.env['SENTRY_DSN'],
    // nestIntegration: instrumenta NestJS para trazas (spans de controllers,
    // etc.). nodeProfilingIntegration: profiling de CPU.
    integrations: [nodeProfilingIntegration(), Sentry.nestIntegration()],
    tracesSampleRate,
    profilesSampleRate: tracesSampleRate,
    environment: process.env['NODE_ENV'] ?? 'development',
    // Release = SHA de git (Render lo expone en RENDER_GIT_COMMIT) para poder
    // atribuir cada issue a una versión del código.
    release: process.env['SENTRY_RELEASE'] ?? process.env['RENDER_GIT_COMMIT'],
    // No enviar PII por defecto (IP, headers de auth). Sumado al beforeSend.
    sendDefaultPii: false,
    beforeSend(event) {
      const headers = event.request?.headers;
      if (headers) {
        for (const key of Object.keys(headers)) {
          if (
            key.toLowerCase() === 'authorization' ||
            key.toLowerCase() === 'cookie'
          ) {
            headers[key] = '[Filtered]';
          }
        }
      }
      const data = event.request?.data;
      if (data && typeof data === 'object') {
        const body = data as Record<string, unknown>;
        for (const field of SENSITIVE_BODY_FIELDS) {
          if (field in body) body[field] = '[Filtered]';
        }
      }
      return event;
    },
  });
}
