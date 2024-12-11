import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userName: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userName, password);
    Logger.debug('User object:', user);
    console.log('Validation Result:', user); // Should print user details or null
    if (!user) {
      throw new UnauthorizedException('Invalid Login credentials');
    }
    return user;
  }
}
