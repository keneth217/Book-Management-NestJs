import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Request,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { GoogleDto } from '../users/dto/google-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login route (JWT-based)
  @SetMetadata('isPublic', true) // Mark this route as public
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async login(@Request() req) {
    Logger.debug('User object:', req.user);
    return this.authService.login(req.user); // Generate JWT token
  }

  // Profile route (JWT authentication required)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    Logger.debug('User profile:', req.user);
    return {
      message: 'User profile fetched successfully',
      user: req.user, // User details fetched from JWT
    };
  }

  // Logout route (Clear cookies or session)
  @SetMetadata('isPublic', true) // Mark this route as public
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response) {
    res.clearCookie('access_token'); // Clear any JWT token stored in cookies
    return res
      .status(HttpStatus.OK)
      .send({ message: 'Logged out successfully' });
  }

  // Google OAuth Login initiation route
  @SetMetadata('isPublic', true)
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async authGoogleLogin() {
    // This route initiates Google OAuth flow by redirecting the user to Google
  }

  // Google OAuth redirect (handles Google OAuth callback)
  @UseGuards(GoogleAuthGuard)
  @SetMetadata('isPublic', true)
  @Get('google/redirect')
  async authGoogleRedirect(@Req() req, @Res() res: Response) {
    if (!req.user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'User not authenticated',
      });
    }

    // You can map the req.user to GoogleDto if needed
    const userDetails: GoogleDto = {
      name: req.user.name,
      email: req.user.email,
      userName: req.user.userName,
      picture: req.user.picture, // or whatever field you are storing
    };
    console.log(userDetails);
    Logger.debug('User object:', req.user);
    return res.status(HttpStatus.OK).json({
      message: 'User authenticated user profile fetched successfully',
      user: userDetails,
    });
  }

  // Google status check (returns user details after OAuth)
  @UseGuards(GoogleAuthGuard)
  @SetMetadata('isPublic', true)
  @Get('google/status')
  async userDetails(@Req() req, @Res() res: Response) {
    if (!req.user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'User not authenticated',
      });
    }

    // You can map the req.user to GoogleDto if needed
    const userDetails: GoogleDto = {
      name: req.user.name,
      email: req.user.email,
      userName: req.user.userName,
      picture: req.user.picture, // or whatever field you are storing
    };

    return res.status(HttpStatus.OK).json({
      message: 'User authenticated user profile fetched successfully',
      user: userDetails,
    });
  }
}
