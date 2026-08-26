import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { roleId, motDePasse, ...rest } = createUserInput;
    const hashed = await bcrypt.hash(motDePasse, SALT_ROUNDS);
    const user = this.usersRepository.create({
      ...rest,
      motDePasse: hashed,
      role: { id: roleId } as any,
    });
    const saved = await this.usersRepository.save(user);
    return this.findOne(saved.id);
  }

  /** Utilisé par AuthService pour la connexion — inclut motDePasse. */
  /** Utilisé par AuthService pour la connexion — inclut motDePasse.
 *  Comparaison insensible à la casse (ILIKE) : les emails ne sont pas
 *  sensibles à la casse, et un IdP externe (Microsoft) peut renvoyer
 *  une casse différente de celle stockée en base. */
async findByEmail(email: string) {
  return this.usersRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role')
    .where('user.email ILIKE :email', { email })
    .getOne();
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
    const { roleId, motDePasse, ...rest } = updateUserInput as any;
    await this.usersRepository.update(id, {
      ...rest,
      ...(motDePasse
        ? { motDePasse: await bcrypt.hash(motDePasse, SALT_ROUNDS) }
        : {}),
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
