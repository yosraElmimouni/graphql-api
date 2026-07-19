import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { roleId, ...rest } = createUserInput;
    const user = this.usersRepository.create({
      ...rest,
      role: { id: roleId } as any,
    });
    const saved = await this.usersRepository.save(user);
    return this.findOne(saved.id);
  }

  findAll() {
    return this.usersRepository.find({ relations: { role: true } });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { role: true },
    });
    if (!user) throw new NotFoundException(`User #${id} introuvable`);
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const { roleId, ...rest } = updateUserInput as any;
    await this.usersRepository.update(id, {
      ...rest,
      ...(roleId ? { role: { id: roleId } } : {}),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return user;
  }
}
