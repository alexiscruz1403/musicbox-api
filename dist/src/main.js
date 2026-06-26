"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./instrument");
const core_1 = require("@nestjs/core");
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.setGlobalPrefix('v1');
    await app.listen(process.env['PORT'] ?? 3001);
}
void bootstrap();
//# sourceMappingURL=main.js.map