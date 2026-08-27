import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: Record<string, jest.Mock>;

  const mockAuthPayload = {
    accessToken: 'jwt.token.mock',
    user: { id: 1, email: 'test@example.com' },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(mockAuthPayload),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('login devrait déléguer au service login avec email et mot de passe', async () => {
    const input: LoginInput = { email: 'test@example.com', motDePasse: 'secret123' };
    const result = await resolver.login(input);

    expect(service.login).toHaveBeenCalledWith(input.email, input.motDePasse);
    expect(result).toEqual(mockAuthPayload);
  });
});
