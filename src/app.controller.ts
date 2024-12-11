import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200) // Set HTTP status for successful login
  async login(@Request() req) {
    Logger.debug('User object:', req.user);
    console.log('Logged in User:', req.user); // Log the user object
    // Pass the validated user to AuthService for token generation
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  @HttpCode(200)
  async logout(@Request() req, @Res() res: Response) {
    // Logout implementation
    req.logout((err) => {
      if (err) {
        return res.status(500).send({ message: 'Logout failed', error: err });
      }
      res.clearCookie('access_token'); // Clear token or session cookie
      return res.status(200).send({ message: 'Logout successful' });
    });
  }
}
