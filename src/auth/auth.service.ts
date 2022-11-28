import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

import { AuthPayload } from './payload/auth.payload';
import { AuthInput } from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async auth({ email, password }: AuthInput): Promise<AuthPayload> {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    const verifed = await argon2.verify(user.password, password);
    if (!verifed) return null;

    const { accessToken, refreshToken } = await this.genarateAuthToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async register({ email, password }: AuthInput): Promise<AuthPayload> {
    const userExisted = await this.userService.findByEmail(email);

    if (userExisted) {
      throw new BadRequestException('User existed!');
    }

    const user = await this.userService.createOne({ email, password });

    const { accessToken, refreshToken } = await this.genarateAuthToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async genarateAuthToken(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessToken = await this.genarateAccessToken(user);
    const refreshToken = this.genarateRefreshToken();

    return {
      accessToken,
      refreshToken,
    };
  }

  async genarateAccessToken(user: User): Promise<string> {
    return this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });
  }

  genarateRefreshToken(): string {
    return '';
  }
}
