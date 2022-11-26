import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './auth.entity';
import { AuthPayload } from './auth.payload';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: AuthInput): Promise<AuthPayload> {
    const auth = await this.authService.auth(input);

    if (!auth) {
      throw new UnauthorizedException();
    }

    return auth;
  }
}
