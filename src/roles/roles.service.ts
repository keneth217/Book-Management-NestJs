import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  // This method will ensure roles are created if they don't exist
  async onApplicationBootstrap() {
    const roles = ['admin', 'user', 'guest'];
    for (const roleName of roles) {
      const exists = await this.rolesRepository.findOne({
        where: { name: roleName },
      });
      if (!exists) {
        const role = this.rolesRepository.create({ name: roleName });
        await this.rolesRepository.save(role);
      }
    }
  }

  // Method to create a new role
  async create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.create(createRoleDto); // Create a role entity
    return await this.rolesRepository.save(role); // Save the new role
  }

  // Method to fetch all roles
  async findAll() {
    return await this.rolesRepository.find(); // Return all roles
  }

  // Method to find a specific role by ID
  async findOne(id: string) {
    const roleId = parseInt(id, 10); // Convert the string ID to a number
    if (isNaN(roleId)) {
      throw new Error('Invalid role ID');
    }
    // @ts-ignore
    return await this.rolesRepository.findOne({ where: { id: roleId } }); // Pass the ID in the 'where' clause
  }

  // Method to update a role
  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.rolesRepository.update(id, updateRoleDto); // Update the role
    return this.findOne(id); // Return the updated role
  }

  // Method to delete a role
  async remove(id: string) {
    const role = await this.findOne(id);
    if (role) {
      await this.rolesRepository.remove(role); // Remove the role from the DB
      return { message: `Role with ID ${id} has been deleted.` };
    }
    return { message: `Role with ID ${id} not found.` };
  }
}
