import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Exclude()
  @Field({ nullable: true })
  password?: string;
}
