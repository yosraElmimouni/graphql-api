import { Test, TestingModule } from '@nestjs/testing';
import { RevisionService } from './revision.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRevisionInput } from './dto/create-revision.input';
import { UpdateRevisionInput } from './dto/update-revision.input';
import { ObjectLiteral, Repository } from 'typeorm';
import { Revision } from './entities/revision.entity';

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

describe('RevisionService', () => {
  let service: RevisionService;
  let repository: MockRepository<Revision>;

  const mockRevision: Revision = {
    id: 1,
    dateRevision: new Date('2026-01-01'),
    commentaire: 'Commentaire test',
    user: { id: 10 } as any,
    article: { id: 20 } as any,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevisionService,
        {
          provide: getRepositoryToken(Revision),
          useValue: createMockRepository<Revision>(),
        },
      ],
    }).compile();

    service = module.get<RevisionService>(RevisionService);
    repository = module.get(getRepositoryToken(Revision));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un article et retourner celui-ci avec ses relations', async () => {
      const dto: CreateRevisionInput = {
        dateRevision: new Date('2026-01-01'),
        commentaire: 'Commentaire test',
        userId: 10,
        articleId: 20
      } as CreateRevisionInput;

      repository.create!.mockReturnValue({ ...dto, user: { id: 10 }, article: { id: 20 } });
      repository.save!.mockResolvedValue({ id: 1 });
      repository.findOne!.mockResolvedValue(mockRevision);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith({
        dateRevision: dto.dateRevision,
        commentaire: dto.commentaire,
        user: { id: dto.userId },
        article: { id: dto.articleId },
      });
      expect(repository.save).toHaveBeenCalled();
      // create() se termine par un findOne() pour recharger les relations
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {user: true, article: true },
      });
      expect(result).toEqual(mockRevision);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les Revisions avec leurs relations', async () => {
      repository.find!.mockResolvedValue([mockRevision]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: {user: true, article: true },
      });
      expect(result).toEqual([mockRevision]);
    });

    it('devrait retourner un tableau vide si aucun Revision n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un Revision existant', async () => {
      repository.findOne!.mockResolvedValue(mockRevision);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {user: true, article: true },
      });
      expect(result).toEqual(mockRevision);
    });

    it('devrait lever une NotFoundException si le Revision n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Revision #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un Revision et retourner la version rechargée', async () => {
      const dto: UpdateRevisionInput = { id: 1, commentaire: 'Commentaire mis à jour' } as UpdateRevisionInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockRevision, commentaire: 'Commentaire mis à jour' });

      const result = await service.update(1, dto);

      // Le service ne retire que auteurId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1, commentaire: 'Commentaire mis à jour' });
      expect(result.commentaire).toBe('Commentaire mis à jour');
    });

    it('devrait mettre à jour la relation user si user id est fourni', async () => {
      const dto: any = { id: 1, user:2, article:3 };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockRevision);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
        user: 2 ,
        article: 3 ,
      });
    });

    it('devrait lever une NotFoundException si le Revision à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateRevisionInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un Revision existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockRevision);
      repository.remove!.mockResolvedValue(mockRevision);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockRevision);
      expect(result).toEqual(mockRevision);
    });

    it('devrait lever une NotFoundException si le Revision à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
