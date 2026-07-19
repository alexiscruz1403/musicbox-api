import './instrument.js';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    app.useLogger(app.get(Logger));
    app.setGlobalPrefix('v1');
    app.use(helmet());
    app.enableCors({ origin: process.env['FRONTEND_URL'], credentials: true });
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
    await app.listen(process.env['PORT'] ?? 3001);
}
void bootstrap();
//# sourceMappingURL=main.js.map