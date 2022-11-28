import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([User])],
      services: [UserService],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: User, ServiceClass: UserService }],
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
