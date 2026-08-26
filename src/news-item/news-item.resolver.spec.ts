import { Test, TestingModule } from '@nestjs/testing';
import { NewsItemResolver } from './news-item.resolver';
import { NewsItemService } from './news-item.service';
import { CreateNewsItemInput } from './dto/create-news-item.input';
import { UpdateNewsItemInput } from './dto/update-news-item.input';

describe('NewsItemResolver', () => {
  let resolver: NewsItemResolver;
  let service: Record<string, jest.Mock>;

  const mockNewsItem = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsItemResolver,
        {
          provide: NewsItemService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockNewsItem),
            findAll: jest.fn().mockResolvedValue([mockNewsItem]),
            findOne: jest.fn().mockResolvedValue(mockNewsItem),
            update: jest.fn().mockResolvedValue(mockNewsItem),
            remove: jest.fn().mockResolvedValue(mockNewsItem),
          },
        },
      ],
    }).compile();

    resolver = module.get<NewsItemResolver>(NewsItemResolver);
    service = module.get(NewsItemService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createNewsItem devrait déléguer au service create', async () => {
    const input = {} as CreateNewsItemInput;
    const result = await resolver.createNewsItem(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockNewsItem);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockNewsItem]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockNewsItem);
  });

  it('updateNewsItem devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateNewsItemInput;
    const result = await resolver.updateNewsItem(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockNewsItem);
  });

  it('removeNewsItem devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeNewsItem(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockNewsItem);
  });
});
