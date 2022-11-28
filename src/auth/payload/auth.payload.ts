import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('AuthUser')
class AuthUser {
  @Field()
  email: string;
}

@ObjectType()
export class AuthPayload {
  @Field(() => AuthUser, { nullable: true })
  user?: AuthUser;

  @Field({ nullable: true })
  error?: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;
}
