// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';

// import { AuthResolver } from './auth.resolver';
// import { AuthService } from './auth.service';
// import { UserModule } from '../user/user.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtStrategy } from './common/jwt.strategy';
// import { GoogleStrategy } from './common/google.strategy';
// import { AuthController } from './auth.controller';

// @Module({
//   imports: [
//     UserModule,
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('auth.jwtAccessTokenSecret'),
//         signOptions: {
//           expiresIn: configService.get<string>(
//             'auth.jwtAccessTokenExpirationTime',
//           ),
//         },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   providers: [AuthResolver, AuthService, JwtStrategy, GoogleStrategy],
//   controllers: [AuthController],
// })
// export class AuthModule {}
