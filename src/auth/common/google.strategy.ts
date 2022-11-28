import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface GoogleStrategyUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('auth.authGoogleClientId'),
      clientSecret: configService.get<string>('auth.authGoogleClientSecret'),
      callbackURL: configService.get<string>('auth.authGoogleCallbackUrl'),
      scope: ['openid', 'email', 'profile'],
      prompt: 'consent',
      accessType: 'offline',
      includeGrantedScopes: true,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    const user: GoogleStrategyUser = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
