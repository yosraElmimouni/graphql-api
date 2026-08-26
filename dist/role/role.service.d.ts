import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Roles } from './enums/Roles';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    create(createRoleInput: CreateRoleInput): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    update(id: number, updateRoleInput: UpdateRoleInput): Promise<Role>;
    remove(id: number): Promise<Role>;
    findByNomRole(nomRole: Roles): Promise<Role>;
}
