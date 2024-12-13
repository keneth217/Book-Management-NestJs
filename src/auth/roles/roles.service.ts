import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Injectable()
export class RolesService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

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
}
