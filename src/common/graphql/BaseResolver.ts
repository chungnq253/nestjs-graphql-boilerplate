import {
  UpdateManyResponse,
  Filter,
  DeepPartial,
  QueryService,
} from '@nestjs-query/core';
import {
  CRUDResolver,
  FilterType,
  UpdateManyResponseType,
} from '@nestjs-query/query-graphql';
import { Resolver, Args, Mutation, ID } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { UserDTO } from 'src/user/dto/user.dto';

// export abstract class BaseResolver<DTO> extends CRUDResolver(DTO) {
//   constructor(readonly service: UserService) {
//     super(service);
//   }

//   // restore one mutation will update the `deletedAt` column to null.
//   @Mutation(() => UserDTO)
//   restoreOneTodoItem(
//     @Args('input', { type: () => ID }) id: string,
//   ): Promise<UserDTO> {
//     return this.service.restoreOne(id);
//   }

//   // restore many mutation will update the `deletedAt` column to null for all todo items that
//   // match the filter.
//   @Mutation(() => UpdateManyResponseType())
//   restoreManyTodoItems(
//     @Args('input', { type: () => FilterType(UserDTO) })
//     filter: Filter<UserDTO>,
//   ): Promise<UpdateManyResponse> {
//     return this.service.restoreMany(filter);
//   }
// }

export function BaseResolver<DTOType>(DTO: Type<DTOType>): any {
  @Resolver(() => DTO)
  abstract class BaseResolverType extends CRUDResolver(DTO) {
    constructor(readonly service) {
      super(service);
    }

    // restore one mutation will update the `deletedAt` column to null.
    @Mutation(() => DTO)
    restoreOneTodoItem(
      @Args('input', { type: () => ID }) id: string,
    ): Promise<DTOType> {
      return this.service.restoreOne(id);
    }

    // restore many mutation will update the `deletedAt` column to null for all todo items that
    // match the filter.
    @Mutation(() => UpdateManyResponseType())
    restoreManyTodoItems(
      @Args('input', { type: () => FilterType(UserDTO) })
      filter: Filter<UserDTO>,
    ): Promise<UpdateManyResponse> {
      return this.service.restoreMany(filter);
    }
  }

  return BaseResolverType;
}
