import { Test, TestingModule } from '@nestjs/testing';
import { SourceResolver } from './source.resolver';
import { SourceService } from './source.service';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';

describe('SourceResolver', () => {
  let resolver: SourceResolver;
  let service: Record<string, jest.Mock>;

  const mockSource = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SourceResolver,
        {
          provide: SourceService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockSource),
            findAll: jest.fn().mockResolvedValue([mockSource]),
            findOne: jest.fn().mockResolvedValue(mockSource),
            update: jest.fn().mockResolvedValue(mockSource),
            remove: jest.fn().mockResolvedValue(mockSource),
          },
        },
      ],
    }).compile();

    resolver = module.get<SourceResolver>(SourceResolver);
    service = module.get(SourceService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createSource devrait déléguer au service create', async () => {
    const input = {} as CreateSourceInput;
    const result = await resolver.createSource(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockSource);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockSource]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockSource);
  });

  it('updateSource devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateSourceInput;
    const result = await resolver.updateSource(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockSource);
  });

  it('removeSource devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeSource(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockSource);
  });
});
