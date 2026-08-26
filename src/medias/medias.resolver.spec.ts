import { Test, TestingModule } from '@nestjs/testing';
import { MediasResolver } from './medias.resolver';
import { MediasService } from './medias.service';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';

describe('MediasResolver', () => {
  let resolver: MediasResolver;
  let service: Record<string, jest.Mock>;

  const mockMedia = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediasResolver,
        {
          provide: MediasService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockMedia),
            findAll: jest.fn().mockResolvedValue([mockMedia]),
            findOne: jest.fn().mockResolvedValue(mockMedia),
            update: jest.fn().mockResolvedValue(mockMedia),
            remove: jest.fn().mockResolvedValue(mockMedia),
          },
        },
      ],
    }).compile();

    resolver = module.get<MediasResolver>(MediasResolver);
    service = module.get(MediasService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createMedia devrait déléguer au service create', async () => {
    const input = {} as CreateMediaInput;
    const result = await resolver.createMedia(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockMedia);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockMedia]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockMedia);
  });

  it('updateMedia devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateMediaInput;
    const result = await resolver.updateMedia(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockMedia);
  });

  it('removeMedia devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeMedia(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockMedia);
  });
});
