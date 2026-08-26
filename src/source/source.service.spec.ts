import { Test, TestingModule } from '@nestjs/testing';
import { SourceService } from './source.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Source } from 'src/source/entities/source.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';
import { url } from 'inspector';
import { TypeSource } from './enums/TypeSource';


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

describe('SourceService', () => {
  let service: SourceService;
  let repository: MockRepository<Source>;

  const mockSource: Source = {
    id: 1,
    nom:"map",
    url:"https://www.mapexpress.ma/",
    type: TypeSource.JOURNAL,
    fiable: true,
    logoUrl: "https://www.mapexpress.ma/logo.png",
    pays: "Maroc",
    langue: "fr",
    dateCreation: new Date('2026-01-01'),
    newsItems: [],
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SourceService,
        {
          provide: getRepositoryToken(Source),
          useValue: createMockRepository<Source>(),
        },
      ],
    }).compile();

    service = module.get<SourceService>(SourceService);
    repository = module.get(getRepositoryToken(Source));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer une source et la retourner (sans rechargement des relations)', async () => {
      const dto: CreateSourceInput = {
        nom: 'Le Monde',
        url: 'https://lemonde.fr',
        type: TypeSource.JOURNAL,
        fiable: true,
        pays: 'France',
        langue: 'fr',
      };
 
      repository.create!.mockReturnValue(dto);
      repository.save!.mockResolvedValue(mockSource);
 
      const result = await service.create(dto);
 
      // Contrairement à articles/users/agenda, create() ici ne fait PAS de
      // findOne() après la sauvegarde : il retourne directement save().
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(repository.findOne).not.toHaveBeenCalled();
      expect(result).toEqual(mockSource);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les Sources avec leurs relations', async () => {
      repository.find!.mockResolvedValue([mockSource]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: {newsItems: true },
      });
      expect(result).toEqual([mockSource]);
    });

    it('devrait retourner un tableau vide si aucun Source n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un Source existant', async () => {
      repository.findOne!.mockResolvedValue(mockSource);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {newsItems: true },
      });
      expect(result).toEqual(mockSource);
    });

    it('devrait lever une NotFoundException si le Source n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Source #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un Source et retourner la version rechargée', async () => {
      const dto: UpdateSourceInput = { id: 1, nom: "map" } as UpdateSourceInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockSource, nom: "map" });

      const result = await service.update(1, dto);

      // Le service ne retire que auteurId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1, nom: "map" });
      expect(result.nom).toBe("map");
    });

    it('devrait mettre à jour la relation newsItems si newsItems est fourni', async () => {
      const dto: any = { id: 1, newsItems: [2, 3] };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockSource);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
       newsItems: [2, 3]
      });
    });

    it('devrait lever une NotFoundException si le Source à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateSourceInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un Source existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockSource);
      repository.remove!.mockResolvedValue(mockSource);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockSource);
      expect(result).toEqual(mockSource);
    });

    it('devrait lever une NotFoundException si le Source à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
