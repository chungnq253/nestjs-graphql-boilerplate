import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  email: string;
}
