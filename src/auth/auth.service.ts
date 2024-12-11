import { Injectable } from '@nestjs/common';
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
    const user = await this.usersService.findOne(userName); // Fetch the user from the database
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Password validation succeeded
      const { password, ...result } = user; // Exclude password before returning
      return result; // Return user details without the password
    }
    return null; // Validation failed
  }

  async login(user: any) {
    const payload = { userName: user.userName, sub: user.id }; // Create payload for JWT
    const token = this.jwtService.sign(payload); // Generate JWT

    // Return both token and user details
    return {
      access_token: token,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email, // Include necessary fields
        phone: user.phone,
        role: user.role, // Include additional user details as needed
      },
    };
  }
}
