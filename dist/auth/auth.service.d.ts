import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RoleService } from '../role/role.service';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly roleService;
    private readonly jwtService;
    private readonly configService;
    private readonly azureTenantId;
    private readonly azureClientId;
    private readonly jwks;
    constructor(usersService: UsersService, roleService: RoleService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, motDePasse: string): Promise<User>;
    login(email: string, motDePasse: string): Promise<{
        accessToken: string;
        user: User;
    }>;
    private verifyMicrosoftToken;
    loginWithMicrosoft(idToken: string): Promise<{
        accessToken: string;
        user: User;
    }>;
}
