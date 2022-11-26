import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

import { AuthPayload } from './auth.payload';
import { AuthInput } from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async auth({ email, password }: AuthInput): Promise<AuthPayload> {
    const user = await this.userService.findOne(email);

    if (!user) return null;
    if (user.password !== password) return null;

    const token = await this.accessToken(user);

    return {
      user,
      token,
    };
  }

  async accessToken(user: User) {
    return this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });
  }
}
