import { Test, TestingModule } from '@nestjs/testing';
import { AgendaResolver } from './agenda.resolver';
import { AgendaService } from './agenda.service';

describe('AgendaResolver', () => {
  let resolver: AgendaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendaResolver,
        {
          provide: AgendaService,
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

    resolver = module.get<AgendaResolver>(AgendaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
