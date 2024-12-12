import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthController } from './auth.controller';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Apply JwtAuthGuard globally
    },
  ],
  exports: [AuthService], // Allow AuthService to be reused in other modules

  controllers: [AuthController], // Define the controller for auth-related routes

  imports: [
    UsersModule, // User management module
    PassportModule, // Passport strategies for authentication
    JwtModule.register({
      global: true, // Makes the module's configuration available app-wide
      secret: jwtConstants.secret, // Secret key for JWT signing
      signOptions: { expiresIn: '1h' }, // Set token expiration
    }),
  ],
})
export class AuthModule {}
