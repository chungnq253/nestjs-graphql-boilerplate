import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    synchronize: true,
    retryAttempts: Number(process.env.DATABASE_RETRY_ATTEMPTS),

    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    logging: process.env.DATABASE_LOGGING === 'true',
  };
});
