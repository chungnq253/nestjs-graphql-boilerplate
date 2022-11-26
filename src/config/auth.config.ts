import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  jwtAccessTokenSecret: string;
  jwtAccessTokenExpirationTime: string;

  jwtRefreshTokenSecret: string;
  jwtRefreshTokenExpirationTime: string;

  authGoogleClientId: string;
  authGoogleClientSecret: string;
  authGoogleCallbackUrl: string;
}

export default registerAs('auth', (): AuthConfig => {
  return {
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || '',
    jwtAccessTokenExpirationTime:
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || '',

    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    jwtRefreshTokenExpirationTime:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '',

    authGoogleClientId: process.env.AUTH_GOOGLE_CLIENT_ID || '',
    authGoogleClientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET || '',
    authGoogleCallbackUrl: process.env.AUTH_GOOGLE_CALLBACK_URL || '',
  };
});
