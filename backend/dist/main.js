"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const class_validator_1 = require("class-validator");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new common_1.ConsoleLogger({
            colors: true,
            timestamp: true,
            logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
        })
    });
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.enableCors({ origin: true, credentials: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
            return new common_1.UnprocessableEntityException({
                message: 'Validation failed',
                errors: errors.map(error => ({
                    field: error.property,
                    errors: Object.values(error.constraints ?? {}),
                })),
            });
        },
    }));
    app.setGlobalPrefix('api', {
        exclude: [
            { path: 'auth/google', method: common_1.RequestMethod.GET },
            { path: 'auth/google/redirect', method: common_1.RequestMethod.GET },
            { path: 'auth/google/callback', method: common_1.RequestMethod.GET },
        ],
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map