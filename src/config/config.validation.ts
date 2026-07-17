import Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3001),

  DATABASE_URL: Joi.string().required(),
  DIRECT_URL: Joi.string().optional(),

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

  VAPID_PUBLIC_KEY: Joi.string().required(),
  VAPID_PRIVATE_KEY: Joi.string().required(),
  VAPID_SUBJECT: Joi.string().required(),
  IDEMPOTENCY_TTL_SECONDS: Joi.number().default(259200),
});
