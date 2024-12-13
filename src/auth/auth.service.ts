import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByName(userName); // Fetch the user from the database

    Logger.debug('User details from database:', user);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Password validation succeeded
      // Exclude password before returning
      const { password, ...result } = user;
      return result; // Return user details without the password
    }
    return null; // Validation failed
  }

  async login(user: any) {
    if (!user || !user.roles || user.roles.length === 0) {
      throw new UnauthorizedException('No roles assigned to the user');
    }

    // Ensure roles are mapped to an array of role names
    const roleNames = user.roles.map((role) => role.name);

    const payload = {
      userName: user.userName,
      sub: user.id,
      role: roleNames, // Assign the role names to the payload
    };

    Logger.debug('User payload:', payload);

    // Generate JWT token
    const token = await this.jwtService.signAsync(payload);

    // Return both token and user details
    return {
      access_token: token,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        role: roleNames, // Return roles as an array of names
      },
    };
  }
}
