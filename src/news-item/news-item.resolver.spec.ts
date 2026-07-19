import { Test, TestingModule } from '@nestjs/testing';
import { NewsItemResolver } from './news-item.resolver';
import { NewsItemService } from './news-item.service';

describe('NewsItemResolver', () => {
  let resolver: NewsItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsItemResolver,
        {
          provide: NewsItemService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<NewsItemResolver>(NewsItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
