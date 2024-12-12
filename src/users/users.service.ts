import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Set default role if none is provided
    if (!createUserDto.role) {
      createUserDto.role = Role.User;
    }

    // Hash the password before saving
    const saltRounds = 10;
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findUserByName(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { userName: username } });
  }

  async findUsersByRole(role: Role): Promise<User[]> {
    return this.usersRepository.find({ where: { role } });
  }

  async onModuleInit() {
    const adminUsername = 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Load password securely
    const adminEmail = 'admin@example.com';

    const existingAdmins = await this.findUsersByRole(Role.Admin);

    if (existingAdmins.length === 0) {
      console.log('No admin user found. Creating default admin user...');

      const adminUser: CreateUserDto = {
        name: 'Admin User',
        userName: adminUsername,
        password: adminPassword,
        email: adminEmail,
        role: Role.Admin,
      };

      await this.create(adminUser);

      console.log('Default admin user created with username: admin');
    } else {
      console.log('Admin user already exists.');
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async changeRole(id: number, role: Role) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.role = role;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      // Hash the new password
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
    }

    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
