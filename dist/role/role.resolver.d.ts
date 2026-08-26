import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
export declare class RoleResolver {
    private readonly roleService;
    constructor(roleService: RoleService);
    createRole(createRoleInput: CreateRoleInput): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    updateRole(updateRoleInput: UpdateRoleInput): Promise<Role>;
    removeRole(id: number): Promise<Role>;
}
