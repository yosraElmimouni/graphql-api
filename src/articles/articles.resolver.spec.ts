import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesResolver } from './articles.resolver';
import { ArticlesService } from './articles.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

describe('ArticlesResolver', () => {
  let resolver: ArticlesResolver;
  let service: Record<string, jest.Mock>;

  const mockArticle = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesResolver,
        {
          provide: ArticlesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockArticle),
            findAll: jest.fn().mockResolvedValue([mockArticle]),
            findOne: jest.fn().mockResolvedValue(mockArticle),
            update: jest.fn().mockResolvedValue(mockArticle),
            remove: jest.fn().mockResolvedValue(mockArticle),
          },
        },
      ],
    }).compile();

    resolver = module.get<ArticlesResolver>(ArticlesResolver);
    service = module.get(ArticlesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createArticle devrait déléguer au service create', async () => {
    const input = {} as CreateArticleInput;
    const result = await resolver.createArticle(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockArticle);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockArticle]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockArticle);
  });

  it('updateArticle devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateArticleInput;
    const result = await resolver.updateArticle(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockArticle);
  });

  it('removeArticle devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeArticle(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockArticle);
  });
});
