import { Roles } from '../enums/Roles';
import { User } from "../../users/entities/user.entity";
export declare class Role {
    id: number;
    nomRole: Roles;
    users: User[];
}
