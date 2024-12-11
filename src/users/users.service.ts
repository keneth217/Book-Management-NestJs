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

    // Save the user (example using a repository pattern)
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }
  async findUserByName(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { userName: username } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
    return this.usersRepository.remove(user);
  }
}
