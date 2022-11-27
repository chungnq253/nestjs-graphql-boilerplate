import { ObjectType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/entity/base';

@ObjectType()
@Entity()
@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @Field(() => String)
  email: string;

  @Exclude({ toPlainOnly: true })
  @Field({ nullable: true })
  password?: string;
}
