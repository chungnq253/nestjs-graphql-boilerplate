import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { AuthPayload } from './payload/auth.payload';
import { GoogleTokenVerificationDto } from './dto/google-token-verification.dto';
import { GoogleAuthenticationService } from './google-auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post('/google')
  async googleAuth(@Body() tokenData: GoogleTokenVerificationDto) {
    const { email: gEmail } =
      await this.googleAuthenticationService.authenticate(tokenData.token);

    const user = await this.userService.findByEmail(gEmail);
    let auth: AuthPayload | null = null;

    if (user) {
      const { accessToken, refreshToken } =
        await this.authService.genarateAuthToken(user);
      auth = {
        user,
        accessToken,
        refreshToken,
      };
    } else {
      auth = await this.authService.register({
        email: gEmail,
        password: randomStringGenerator(),
      });
    }

    if (!auth) {
      throw new UnauthorizedException();
    }

    auth.user = instanceToPlain(auth.user) as User;

    return auth;
  }
}
