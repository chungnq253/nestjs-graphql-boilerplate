import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
      forbidUnknownValues: true,
    }),
  );

  const configService = app.get(ConfigService);

  const port: number = configService.get<number>('app.port');

  await app.listen(port);

  // eslint-disable-next-line no-console
  console.log(
    `\n 🚀 🚀 🚀 GraphQL Server is now running on http://localhost:${port}/graphql`,
  );
}
bootstrap();
