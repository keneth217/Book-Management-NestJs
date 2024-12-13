import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    // If no roles are provided, assign the default 'user' role
    if (!createUserDto.roles || createUserDto.roles.length === 0) {
      const defaultRole = await this.rolesRepository.findOne({
        where: { name: 'user' },
      });
      createUserDto.roles = [defaultRole];
    } else {
      // If roles are provided as strings (role names), convert them to Role entities
      createUserDto.roles = await Promise.all(
        createUserDto.roles.map(async (roleName) => {
          const role = await this.rolesRepository.findOne({
            where: { name: roleName.name },
          });
          if (!role) {
            throw new NotFoundException(`Role with name ${roleName} not found`);
          }
          return role;
        }),
      );
    }

    // Hash the password before saving
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    // Create and save the user
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async assignRole(userId: string, roleName: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const role = await this.rolesRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      throw new NotFoundException(
        `Role with name "${roleName}" does not exist`,
      );
    }

    if (user.roles.some((r) => r.name === roleName)) {
      throw new BadRequestException(`User already has the role "${roleName}"`);
    }

    user.roles.push(role);
    return this.usersRepository.save(user);
  }

  // Find users by role
  async findUsersByRole(roleName: string): Promise<User[]> {
    const role = await this.rolesRepository.findOne({
      where: { name: roleName },
      relations: ['users'],
    });
    if (!role) {
      throw new NotFoundException(`Role ${roleName} not found`);
    }
    return role.users;
  }

  // Update user by UUID
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  // Find one user by UUID
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  // Remove user by UUID
  async remove(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  // Initialize default roles and admin user
  async onModuleInit() {
    const defaultRoles = ['admin', 'user', 'guest'];
    for (const roleName of defaultRoles) {
      const role = await this.rolesRepository.findOne({
        where: { name: roleName },
      });
      if (!role) {
        await this.rolesRepository.save(
          this.rolesRepository.create({ name: roleName }),
        );
      }
    }

    const admin = await this.usersRepository.findOne({
      where: { userName: 'admin' },
      relations: ['roles'],
    });
    if (!admin) {
      const adminRole = await this.rolesRepository.findOne({
        where: { name: 'admin' },
      });
      const adminUser = this.usersRepository.create({
        name: 'Admin User',
        userName: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        roles: [adminRole],
      });
      await this.usersRepository.save(adminUser);
      console.log('Default admin user created');
    }
  }
  async findUserByName(userName: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { userName },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User with username ${userName} not found`);
    }
    return user;
  }

  async removeRole(userId: string, roleName: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const role = user.roles.find((r) => r.name === roleName);

    if (!role) {
      throw new NotFoundException(`User does not have the role "${roleName}"`);
    }

    user.roles = user.roles.filter((r) => r.name !== roleName);
    return this.usersRepository.save(user);
  }
}
