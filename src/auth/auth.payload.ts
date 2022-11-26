import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';

@ObjectType()
export class AuthPayload {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  error?: string;

  @Field({ nullable: true })
  token?: string;
}
