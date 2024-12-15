import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../users/entities/user.entity';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  async deserializeUser(payload: User, done: Function): Promise<any> {
    const user = await this.authService.finduser(payload.id);
    return user ? done(null, user) : done(null, null);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  serializeUser(user: User, done: Function): any {
    done(null, user);
  }
}
