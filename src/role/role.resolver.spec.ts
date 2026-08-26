import { Test, TestingModule } from '@nestjs/testing';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

describe('RoleResolver', () => {
  let resolver: RoleResolver;
  let service: Record<string, jest.Mock>;

  const mockRole = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleResolver,
        {
          provide: RoleService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockRole),
            findAll: jest.fn().mockResolvedValue([mockRole]),
            findOne: jest.fn().mockResolvedValue(mockRole),
            update: jest.fn().mockResolvedValue(mockRole),
            remove: jest.fn().mockResolvedValue(mockRole),
          },
        },
      ],
    }).compile();

    resolver = module.get<RoleResolver>(RoleResolver);
    service = module.get(RoleService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createRole devrait déléguer au service create', async () => {
    const input = {} as CreateRoleInput;
    const result = await resolver.createRole(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockRole);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockRole]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockRole);
  });

  it('updateRole devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateRoleInput;
    const result = await resolver.updateRole(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockRole);
  });

  it('removeRole devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeRole(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockRole);
  });
});
