import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { Exclude } from 'class-transformer';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IDField(() => ID)
  readonly id!: string;

  @Field(() => GraphQLISODateTime)
  @FilterableField()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @FilterableField()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  @Exclude({ toPlainOnly: true })
  deletedAt?: Date;
}
