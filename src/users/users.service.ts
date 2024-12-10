import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // Hash the password before saving
    const saltRounds = 10;
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findOne(userName: string) {
    const user = await this.usersRepository.findOne({ where: { userName } });
    if (!user) {
      throw new NotFoundException(`user with ID ${userName} not found`);
    }
    return user;
  }

  async update(userName: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userName);
    if (!user) {
      throw new NotFoundException(`user with ID ${userName} not found`);
    }
    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(userName: string) {
    const user = await this.findOne(userName);
    if (!user) {
      throw new NotFoundException(`user with ID ${userName} not found`);
    }
    return this.usersRepository.remove(user);
  }
}
