import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entity/base';

@ObjectType('User')
export class UserDTO extends BaseEntity {
  @FilterableField()
  email!: string;
}
