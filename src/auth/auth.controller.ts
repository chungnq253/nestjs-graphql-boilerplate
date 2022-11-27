// import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
// import { Request, Response } from 'express';

// import { UnauthorizedException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { UserService } from '../user/user.service';
// import { GoogleStrategyUser } from './common/google.strategy';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly userService: UserService,
//   ) {}

//   @Get('/google')
//   @UseGuards(AuthGuard('google'))
//   googleAuth() {
//     // TRIGGER OPEN GOOGLE
//   }

//   @Get('/google/redirect')
//   @UseGuards(AuthGuard('google'))
//   async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
//     const authUser = req.user as GoogleStrategyUser;
//     const user = this.userService.findOne(authUser.email);

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     const auth = await this.authService.auth({
//       email: user.email,
//       password: user.password,
//     });

//     if (!auth) {
//       throw new UnauthorizedException();
//     }

//     return res.json(auth);
//   }
// }
