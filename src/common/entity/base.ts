import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@nestjs-query/query-graphql';

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IDField(() => ID)
  readonly id!: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => GraphQLISODateTime)
  @DeleteDateColumn()
  deletedAt?: Date;
}
