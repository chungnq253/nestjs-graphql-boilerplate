import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);

  const port: number = configService.get<number>('app.port');

  await app.listen(port);

  // eslint-disable-next-line no-console
  console.log(
    `\n 🚀 🚀 🚀 GraphQL Server is now running on http://localhost:${port}/graphql`,
  );
}
bootstrap();
