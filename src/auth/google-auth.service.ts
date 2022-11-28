import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthenticationService {
  private oauthClient: OAuth2Client;
  private clientID: string;
  private clientSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.clientID = this.configService.get<string>('auth.authGoogleClientId');
    this.clientSecret = this.configService.get<string>(
      'auth.authGoogleClientSecret',
    );

    this.oauthClient = new OAuth2Client(this.clientID, this.clientSecret);
  }

  async authenticate(token: string) {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: token,
      audience: this.clientID,
    });

    const payload = ticket.getPayload();

    return payload;
  }
}
