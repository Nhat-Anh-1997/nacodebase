import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import {
  isProduction,
  serverName,
  serverPort,
  serverVersion,
} from './common/constants/server';
import { swaggerConfiguration } from './common/constants/swagger';

const logger = new Logger(`${serverName}@${serverVersion}`);

const bootstrapApplication = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProduction,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (!isProduction) {
    app.enableCors({
      methods: '*',
      allowedHeaders: '*',
      origin: '*',
    });
  } else {
    app.enableCors({
      methods: '*',
      allowedHeaders: '*',
      origin: '*',
    });
  }

  app.use(helmet());

  app.use('/health', (req, res) => {
    res.json({ ready: true });
  });

  const document = SwaggerModule.createDocument(app, swaggerConfiguration);
  SwaggerModule.setup('/swagger', app, document);

  await app.listenAsync(serverPort);
  logger.log(
    `HTTP server is up & running on http://localhost:${serverPort}/swagger`,
  );

  return app;
};

export default bootstrapApplication().catch((error) => {
  console.error(error);
  process.exit(1);
});
