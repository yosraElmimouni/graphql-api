import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: Record<string, jest.Mock>;

  const mockUser = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn().mockResolvedValue([mockUser]),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUser),
            remove: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createUser devrait déléguer au service create', async () => {
    const input = {} as CreateUserInput;
    const result = await resolver.createUser(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockUser);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockUser]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  it('updateUser devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateUserInput;
    const result = await resolver.updateUser(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockUser);
  });

  it('removeUser devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeUser(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });
});
