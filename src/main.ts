import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { LoaderEnv } from './config/loader';
import { Logger, PinoLogger } from 'nestjs-pino';
import { CustomValidationPipe } from './utils/custom-validation';
import tracer from './utils/tracer';

const logger = new PinoLogger({});

async function bootstrap() {
  // await tracer.start();

  // @ts-ignore
  const app = await NestFactory.create(AppModule, { logger: true });
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new CustomValidationPipe());

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle(LoaderEnv.envs.SWAGGER_API_TITLE)
    .setDescription(LoaderEnv.envs.SWAGGER_API_DESC)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  logger.info(`Swagger docs build to /docs/`);

  await app.listen(LoaderEnv.envs.APP_PORT);
  logger.info(`Listen APP on PORT :: ${LoaderEnv.envs.APP_PORT}`);
}

bootstrap();
