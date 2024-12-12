import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SetMetadata('isPublic', true) // Mark this route as public
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async login(@Request() req) {
    Logger.debug('User object:', req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    Logger.debug('User profile:', req.user);
    return {
      message: 'User profile fetched successfully',
      user: req.user,
    };
  }
  @SetMetadata('isPublic', true) // Mark this route as public
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response) {
    res.clearCookie('access_token'); // Clear any potential cookies (if used)
    return res
      .status(HttpStatus.OK)
      .send({ message: 'Logged out successfully' });
  }
}
