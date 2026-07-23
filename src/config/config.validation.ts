import Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3001),

  DATABASE_URL: Joi.string().required(),
  // Tamaño del pool de Prisma (PrismaService). El presupuesto total de
  // conexiones debe caber en el `pool_size` del pooler de Supabase:
  // DATABASE_POOL_MAX + el `max: 5` de PgBossService. Default conservador para
  // dejar margen a Prisma Studio / migrate / una segunda instancia.
  DATABASE_POOL_MAX: Joi.number().min(1).default(8),
  DIRECT_URL: Joi.string().optional(),
  // Conexión de pg-boss (bus de jobs). DEBE ser session-mode/direct para
  // soportar el schema propio de pg-boss — NO el transaction pooler de
  // Supabase. Si no se setea, PgBossService cae a DIRECT_URL y luego a
  // DATABASE_URL.
  PGBOSS_DATABASE_URL: Joi.string().optional(),

  REDIS_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('7d'),

  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),

  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),

  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().default(587),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
  EMAIL_FROM: Joi.string().email().required(),

  FRONTEND_URL: Joi.string().uri().required(),

  DEEZER_BASE_URL: Joi.string().uri().default('https://api.deezer.com'),
  LASTFM_BASE_URL: Joi.string()
    .uri()
    .default('http://ws.audioscrobbler.com/2.0'),
  LASTFM_API_KEY: Joi.string().optional(),
  MUSICBRAINZ_CONTACT_EMAIL: Joi.string().email().optional(),

  SENTRY_DSN: Joi.string().optional().allow(''),
  // Muestreo de trazas de performance de Sentry (0–1). Bajo por defecto en
  // prod para no gastar cuota; los errores igual se capturan al 100%.
  SENTRY_TRACES_SAMPLE_RATE: Joi.number().min(0).max(1).default(0.1),
  // Release para atribuir issues a una versión (SHA de git). Opcional — Render
  // expone RENDER_GIT_COMMIT, que instrument.ts usa como fallback.
  SENTRY_RELEASE: Joi.string().optional().allow(''),

  // Expone la doc OpenAPI en GET /v1/docs. Off por defecto (no exponer la
  // superficie de API en prod salvo intención explícita).
  SWAGGER_ENABLED: Joi.boolean().default(false),

  VAPID_PUBLIC_KEY: Joi.string().required(),
  VAPID_PRIVATE_KEY: Joi.string().required(),
  VAPID_SUBJECT: Joi.string().required(),
  IDEMPOTENCY_TTL_SECONDS: Joi.number().default(259200),
});
