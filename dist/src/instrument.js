import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
if (process.env['SENTRY_DSN']) {
    const tracesSampleRate = Number(process.env['SENTRY_TRACES_SAMPLE_RATE'] ?? '0.1');
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
        integrations: [nodeProfilingIntegration(), Sentry.nestIntegration()],
        tracesSampleRate,
        profilesSampleRate: tracesSampleRate,
        environment: process.env['NODE_ENV'] ?? 'development',
        release: process.env['SENTRY_RELEASE'] ?? process.env['RENDER_GIT_COMMIT'],
        sendDefaultPii: false,
        beforeSend(event) {
            const headers = event.request?.headers;
            if (headers) {
                for (const key of Object.keys(headers)) {
                    if (key.toLowerCase() === 'authorization' ||
                        key.toLowerCase() === 'cookie') {
                        headers[key] = '[Filtered]';
                    }
                }
            }
            const data = event.request?.data;
            if (data && typeof data === 'object') {
                const body = data;
                for (const field of SENSITIVE_BODY_FIELDS) {
                    if (field in body)
                        body[field] = '[Filtered]';
                }
            }
            return event;
        },
    });
}
//# sourceMappingURL=instrument.js.map