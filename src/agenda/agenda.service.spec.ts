import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { AgendaService } from './agenda.service';
import { Agenda } from './entities/agenda.entity';
import { CreateAgendaInput } from './dto/create-agenda.input';
import { UpdateAgendaInput } from './dto/update-agenda.input';

// `T extends ObjectLiteral` est requis car Repository<T> de TypeORM impose
// cette contrainte sur son paramètre générique.
type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('AgendaService', () => {
  let service: AgendaService;
  let repository: MockRepository<Agenda>;

  const mockAgenda: Agenda = {
    id: 1,
    title: 'Mon titre',
    resume: 'Le résumé de l\'agenda',
    categorie: 'ACTUALITE',
    importance: 'important',
    dateDebut: new Date('2026-01-01T09:00:00Z'),
    dateFin: new Date('2026-01-01T10:00:00Z'),
    lieu: 'Paris',
    source: { id: 10 } as any,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendaService,
        {
          provide: getRepositoryToken(Agenda),
          useValue: createMockRepository<Agenda>(),
        },
      ],
    }).compile();

    service = module.get<AgendaService>(AgendaService);
    repository = module.get(getRepositoryToken(Agenda));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un agenda et retourner celui-ci avec ses relations', async () => {
      const dto: CreateAgendaInput = {
        title: 'Mon titre',
        resume: 'Le résumé de l\'agenda',
        categorie: 'ACTUALITE',
        importance: 'important',
        dateDebut: new Date('2026-01-01T09:00:00Z'),
        dateFin: new Date('2026-01-01T10:00:00Z'),
        lieu: 'Paris',
        sourceId: 10,
      } as CreateAgendaInput;

      repository.create!.mockReturnValue({ ...dto, source: { id: 10 } });
      repository.save!.mockResolvedValue({ id: 1 });
      repository.findOne!.mockResolvedValue(mockAgenda);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith({
        title: dto.title,
        resume: dto.resume,
        categorie: dto.categorie,
        importance: dto.importance,
        dateDebut: dto.dateDebut,
        dateFin: dto.dateFin,
        lieu: dto.lieu,
        source: { id: 10 },
      });
      expect(repository.save).toHaveBeenCalled();
      // create() se termine par un findOne() pour recharger la relation source
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { source: true },
      });
      expect(result).toEqual(mockAgenda);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les agendas avec leur source', async () => {
      repository.find!.mockResolvedValue([mockAgenda]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: { source: true },
      });
      expect(result).toEqual([mockAgenda]);
    });

    it('devrait retourner un tableau vide si aucun agenda n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un agenda existant', async () => {
      repository.findOne!.mockResolvedValue(mockAgenda);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { source: true },
      });
      expect(result).toEqual(mockAgenda);
    });

    it('devrait lever une NotFoundException si l\'agenda n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Agenda #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un agenda et retourner la version rechargée', async () => {
      const dto: UpdateAgendaInput = { id: 1, title: 'Titre modifié' } as UpdateAgendaInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockAgenda, title: 'Titre modifié' });

      const result = await service.update(1, dto);

      // Le service ne retire que sourceId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1, title: 'Titre modifié' });
      expect(result.title).toBe('Titre modifié');
    });

    it('devrait mettre à jour la relation source si sourceId est fourni', async () => {
      const dto: any = { id: 1, sourceId: 42 };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockAgenda);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
        source: { id: 42 },
      });
    });

    it('devrait lever une NotFoundException si l\'agenda à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateAgendaInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un agenda existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockAgenda);
      repository.remove!.mockResolvedValue(mockAgenda);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockAgenda);
      expect(result).toEqual(mockAgenda);
    });

    it('devrait lever une NotFoundException si l\'agenda à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});