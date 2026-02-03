import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, RequestMethod, UnprocessableEntityException, ValidationError, ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    logger: new ConsoleLogger({
      colors: true,
      timestamp: true,
      logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
    })
  })

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({ origin: true, credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,

      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException({
          message: 'Validation failed',
          errors: errors.map(error => ({
            field: error.property,
            errors: Object.values(error.constraints ?? {}),
          })),
        })
      },
    })
  );

  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'auth/google', method: RequestMethod.GET },
      { path: 'auth/google/redirect', method: RequestMethod.GET },
      { path: 'auth/google/callback', method: RequestMethod.GET },
    ],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(helmet());
  app.use(cookieParser());

  await app.listen(3000)
}
bootstrap()

