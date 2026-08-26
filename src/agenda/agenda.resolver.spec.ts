import { Test, TestingModule } from '@nestjs/testing';
import { AgendaResolver } from './agenda.resolver';
import { AgendaService } from './agenda.service';
import { CreateAgendaInput } from './dto/create-agenda.input';
import { UpdateAgendaInput } from './dto/update-agenda.input';

describe('AgendaResolver', () => {
  let resolver: AgendaResolver;
  let service: Record<string, jest.Mock>;

  const mockAgenda = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendaResolver,
        {
          provide: AgendaService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockAgenda),
            findAll: jest.fn().mockResolvedValue([mockAgenda]),
            findOne: jest.fn().mockResolvedValue(mockAgenda),
            update: jest.fn().mockResolvedValue(mockAgenda),
            remove: jest.fn().mockResolvedValue(mockAgenda),
          },
        },
      ],
    }).compile();

    resolver = module.get<AgendaResolver>(AgendaResolver);
    service = module.get(AgendaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createAgenda devrait déléguer au service create', async () => {
    const input = {} as CreateAgendaInput;
    const result = await resolver.createAgenda(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockAgenda);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockAgenda]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockAgenda);
  });

  it('updateAgenda devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateAgendaInput;
    const result = await resolver.updateAgenda(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockAgenda);
  });

  it('removeAgenda devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeAgenda(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockAgenda);
  });
});
