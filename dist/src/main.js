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
        origin: config.getOrThrow('FRONTEND_URL'),
        credentials: true,
    });
    app.useGlobalPipes(new I18nValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new I18nValidationExceptionFilter({
        responseBodyFormatter: (_host, _exc, formattedErrors) => {
            const messages = formattedErrors;
            return {
                error: {
                    code: 'VALIDATION_ERROR',
                    message: messages[0] ?? 'Validation failed.',
                    statusCode: 400,
                    details: messages,
                },
            };
        },
    }), new HttpExceptionFilter());
    if (config.get('SWAGGER_ENABLED')) {
        const swaggerConfig = new DocumentBuilder()
            .setTitle('Vinlyst API')
            .setDescription('API REST de Vinlyst (musicbox-api)')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'bearer')
            .build();
        const document = SwaggerModule.createDocument(app, swaggerConfig);
        document.security = [{ bearer: [] }];
        SwaggerModule.setup('v1/docs', app, document);
    }
    await app.listen(config.getOrThrow('PORT'), '0.0.0.0');
}
void bootstrap();
//# sourceMappingURL=main.js.map