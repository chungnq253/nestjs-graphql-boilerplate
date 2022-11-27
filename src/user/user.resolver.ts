import { UpdateManyResponse, Filter } from '@nestjs-query/core';
import {
  CRUDResolver,
  FilterType,
  UpdateManyResponseType,
} from '@nestjs-query/query-graphql';
import { Resolver, Args, Mutation, ID, Query } from '@nestjs/graphql';
import { BaseResolver } from '../common/graphql/BaseResolver';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

export class UserResolver extends BaseResolver(UserDTO) {
  constructor(readonly service: UserService) {
    super(service);
  }
}
