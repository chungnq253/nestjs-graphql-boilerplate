import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';

import { ComplexityPlugin } from './common/ComplexityPlugin';

import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, authConfig],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<ApolloDriverConfig> => {
        const playgroundPlugin = configService.get<boolean>('app.debug')
          ? ApolloServerPluginLandingPageLocalDefault()
          : ApolloServerPluginLandingPageDisabled();

        return {
          autoSchemaFile: 'schema.graphql',
          sortSchema: true,
          playground: false,
          installSubscriptionHandlers: true,
          debug: configService.get<boolean>('app.debug'),
          introspection: configService.get<boolean>('app.debug'),
          context: ({ req, res }) => ({ req, res }),
          cors: {
            origin: true,
            methods: 'GET,POST,DELETE',
            preflightContinue: true,
            optionsSuccessStatus: 200,
            credentials: false,
            allowedHeaders: [
              'Accept',
              'Content-Type',
              'Authorization',
              'token',
            ],
          },
          plugins: [playgroundPlugin],
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('app.throttleTTL'),
        limit: config.get<number>('app.throttleLimit'),
      }),
    }),
    UserModule,
    HealthModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ComplexityPlugin,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class AppModule {}
