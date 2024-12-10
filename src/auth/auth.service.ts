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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username); // Fetch the user from the database
    if (user && (await bcrypt.compare(pass, user.password))) {
      console.log('User:', user); // Log the user object
      // Compare the provided password with the hashed password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result; // Return user details without the password
    }
    return null; // Return null if validation fails
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }; // Use appropriate payload keys
    return {
      access_token: this.jwtService.sign(payload), // Generate a JWT
    };
  }
}
