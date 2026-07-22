import './instrument.js';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('v1');
  app.use(helmet());
  app.enableCors({
    origin: config.getOrThrow<string>('FRONTEND_URL'),
    credentials: true,
  });
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // I18nValidationExceptionFilter (específico de I18nValidationException) va
  // antes del catch-all HttpExceptionFilter — Nest usa el primer filtro cuya
  // lista de tipos matchea, en orden de registro (docs/fase-9-features.md).
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      responseBodyFormatter: (_host, _exc, formattedErrors) => {
        const messages = formattedErrors as string[];
        return {
          error: {
            code: 'VALIDATION_ERROR',
            message: messages[0] ?? 'Validation failed.',
            statusCode: 400,
            details: messages,
          },
        };
      },
    }),
    new HttpExceptionFilter(),
  );
  // Doc OpenAPI en /v1/docs, gateada por SWAGGER_ENABLED (off en prod salvo
  // intención explícita). La ruta la registra SwaggerModule en el adapter HTTP,
  // así que no la bloquea el JwtAuthGuard global — el gate por env es la
  // protección real. Los schemas de DTOs los genera el plugin @nestjs/swagger
  // (nest-cli.json) desde los tipos, sin @ApiProperty manual.
  if (config.get<boolean>('SWAGGER_ENABLED')) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Vinlyst API')
      .setDescription('API REST de Vinlyst (musicbox-api)')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'bearer',
      )
      .build();
    // autoTagControllers (default) agrupa los endpoints por controller sin
    // @ApiTags manual. Se aplica el esquema bearer globalmente porque el
    // JwtAuthGuard es global (los @Public() son la excepción), así el token del
    // botón Authorize se envía en "try it out".
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    document.security = [{ bearer: [] }];
    SwaggerModule.setup('v1/docs', app, document);
  }
  // Bind a 0.0.0.0 para que Render (y cualquier contenedor) exponga el puerto.
  await app.listen(config.getOrThrow<number>('PORT'), '0.0.0.0');
}

void bootstrap();
