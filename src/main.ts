import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { serverConfig } from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(serverConfig.port, serverConfig.host);
}

bootstrap().then(() => {
  const logger = new Logger('Polinerdy Assembly API');
  logger.log(
    `Server is running on ${process.env.APP_HOST || '0.0.0.0'}:${process.env.APP_PORT || 3000}`,
  );
});
