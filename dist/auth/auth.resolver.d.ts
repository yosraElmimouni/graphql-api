import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginInput: LoginInput): Promise<{
        accessToken: string;
        user: import("../users/entities/user.entity").User;
    }>;
    microsoftLogin(idToken: string): Promise<{
        accessToken: string;
        user: import("../users/entities/user.entity").User;
    }>;
}
