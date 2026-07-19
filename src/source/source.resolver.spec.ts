import { Test, TestingModule } from '@nestjs/testing';
import { SourceResolver } from './source.resolver';
import { SourceService } from './source.service';

describe('SourceResolver', () => {
  let resolver: SourceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SourceResolver,
        {
          provide: SourceService,
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

    resolver = module.get<SourceResolver>(SourceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
