import { Test, TestingModule } from '@nestjs/testing';
import { RevisionResolver } from './revision.resolver';
import { RevisionService } from './revision.service';
import { CreateRevisionInput } from './dto/create-revision.input';
import { UpdateRevisionInput } from './dto/update-revision.input';

describe('RevisionResolver', () => {
  let resolver: RevisionResolver;
  let service: Record<string, jest.Mock>;

  const mockRevision = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevisionResolver,
        {
          provide: RevisionService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockRevision),
            findAll: jest.fn().mockResolvedValue([mockRevision]),
            findOne: jest.fn().mockResolvedValue(mockRevision),
            update: jest.fn().mockResolvedValue(mockRevision),
            remove: jest.fn().mockResolvedValue(mockRevision),
          },
        },
      ],
    }).compile();

    resolver = module.get<RevisionResolver>(RevisionResolver);
    service = module.get(RevisionService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createRevision devrait déléguer au service create', async () => {
    const input = {} as CreateRevisionInput;
    const result = await resolver.createRevision(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockRevision);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockRevision]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockRevision);
  });

  it('updateRevision devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateRevisionInput;
    const result = await resolver.updateRevision(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockRevision);
  });

  it('removeRevision devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeRevision(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockRevision);
  });
});
