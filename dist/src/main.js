import './instrument.js';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    app.useLogger(app.get(Logger));
    app.setGlobalPrefix('v1');
    app.use(helmet());
    app.enableCors({ origin: process.env['FRONTEND_URL'], credentials: true });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(process.env['PORT'] ?? 3001);
}
void bootstrap();
//# sourceMappingURL=main.js.map