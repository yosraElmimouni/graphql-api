import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(createRoleInput: CreateRoleInput) {
    const role = this.roleRepository.create(createRoleInput);
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find({ relations: { users: true } });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: { users: true },
    });
    if (!role) throw new NotFoundException(`Role #${id} introuvable`);
    return role;
  }

  async update(id: number, updateRoleInput: UpdateRoleInput) {
    await this.roleRepository.update(id, updateRoleInput as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
    return role;
  }
}
