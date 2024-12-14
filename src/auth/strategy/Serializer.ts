import { PassportSerializer } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
  ) {
    super();
  }

  deserializeUser(payload: any, done: Function): any {

  }

  serializeUser(user: any, done: Function): any {

  }
}
