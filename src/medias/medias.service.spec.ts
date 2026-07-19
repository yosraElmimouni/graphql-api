import { Test, TestingModule } from '@nestjs/testing';
import { MediasService } from './medias.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateMediaInput } from 'src/medias/dto/create-media.input';
import { UpdateMediaInput } from 'src/medias/dto/update-media.input';
import { Media } from 'src/medias/entities/media.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { MediaType } from './Enums/MediaType';


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

describe('MediasService', () => {
  let service: MediasService;
  let repository: MockRepository<Media>;

  const mockMedia: Media = {
    id: 1,
    type: MediaType.Image,
    urlFichier: 'https://example.com/image.jpg',
    titre: 'Image test',
    description: 'Description test',
    localisation: 'Paris',
    dateCapture: new Date('2026-01-01'),
    article: { id: 10 } as any,
    user: { id: 20 } as any,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediasService,
        {
          provide: getRepositoryToken(Media),
          useValue: createMockRepository<Media>(),
        },
      ],
    }).compile();

    service = module.get<MediasService>(MediasService);
    repository = module.get(getRepositoryToken(Media));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un article et retourner celui-ci avec ses relations', async () => {
      const dto: CreateMediaInput = {
        type: MediaType.Image,
        urlFichier: 'https://example.com/image.jpg',
        titre: 'Image test',
        description: 'Description test',
        localisation: 'Paris',
        dateCapture: new Date('2026-01-01'),
        articleId: 10,
        userId: 20
      } as CreateMediaInput;

      repository.create!.mockReturnValue({ ...dto, article: { id: 10 }, user: { id: 20 } });
      repository.save!.mockResolvedValue({ id: 1 });
      repository.findOne!.mockResolvedValue(mockMedia);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith({
        type: dto.type,
        urlFichier: dto.urlFichier,
        titre: dto.titre,
        description: dto.description,
        localisation: dto.localisation,
        dateCapture: dto.dateCapture,
        article: { id: 10 },
        user: { id: 20 },
      });
      expect(repository.save).toHaveBeenCalled();
      // create() se termine par un findOne() pour recharger les relations
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {article: true, user: true },
      });
      expect(result).toEqual(mockMedia);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les medias avec leurs relations', async () => {
      repository.find!.mockResolvedValue([mockMedia]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: {article: true, user: true },
      });
      expect(result).toEqual([mockMedia]);
    });

    it('devrait retourner un tableau vide si aucun media n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un media existant', async () => {
      repository.findOne!.mockResolvedValue(mockMedia);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {article: true, user: true },
      });
      expect(result).toEqual(mockMedia);
    });

    it('devrait lever une NotFoundException si le media n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Media #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un media et retourner la version rechargée', async () => {
      const dto: UpdateMediaInput = { id: 1, type: MediaType.Image } as UpdateMediaInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockMedia, type: 'image' });

      const result = await service.update(1, dto);

      // Le service ne retire que auteurId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1, type: 'image' });
      expect(result.type).toBe('image');
    });

    it('devrait mettre à jour la relation user si user id est fourni', async () => {
      const dto: any = { id: 1, user: 42 };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockMedia);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
        user: 42 ,
      });
    });

    it('devrait lever une NotFoundException si le media à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateMediaInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un media existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockMedia);
      repository.remove!.mockResolvedValue(mockMedia);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockMedia);
      expect(result).toEqual(mockMedia);
    });

    it('devrait lever une NotFoundException si le media à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});