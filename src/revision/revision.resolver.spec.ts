import { Test, TestingModule } from '@nestjs/testing';
import { RevisionResolver } from './revision.resolver';
import { RevisionService } from './revision.service';

describe('RevisionResolver', () => {
  let resolver: RevisionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevisionResolver,
        {
          provide: RevisionService,
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

    resolver = module.get<RevisionResolver>(RevisionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
