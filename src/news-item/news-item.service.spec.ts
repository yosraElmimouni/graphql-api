import { Test, TestingModule } from '@nestjs/testing';
import { NewsItemService } from './news-item.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateNewsItemInput } from 'src/news-item/dto/create-news-item.input';
import { UpdateNewsItemInput } from 'src/news-item/dto/update-news-item.input';
import { NewsItem } from 'src/news-item/entities/news-item.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { url } from 'inspector';
import { CategorieNews } from './eums/CategorieNews';


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

describe('NewsItemService', () => {
  let service: NewsItemService;
  let repository: MockRepository<NewsItem>;

  const mockNewsItem: NewsItem = {
    id: 1,
    titre: 'Titre test',
    contenu: 'Contenu test',
    categorie: CategorieNews.CULTURE,
    url: 'https://example.com/news-item',
    datePublication: new Date('2026-01-01'),
    source: { id: 10 } as any,
    articles: [{ id: 20 }] as any[],
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsItemService,
        {
          provide: getRepositoryToken(NewsItem),
          useValue: createMockRepository<NewsItem>(),
        },
      ],
    }).compile();

    service = module.get<NewsItemService>(NewsItemService);
    repository = module.get(getRepositoryToken(NewsItem));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un article et retourner celui-ci avec ses relations', async () => {
      const dto: CreateNewsItemInput = {
        titre: 'Titre test',
        contenu: 'Contenu test',
        categorie: CategorieNews.CULTURE,
        url: 'https://example.com/news-item',
        datePublication: new Date('2026-01-01'),
        sourceId: 10,
        articles: [{ id: 20 }] as any[],
      } as CreateNewsItemInput;

      repository.create!.mockReturnValue({ ...dto, source: { id: 10 }, articles: [{ id: 20 }] });
      repository.save!.mockResolvedValue({ id: 1 });
      repository.findOne!.mockResolvedValue(mockNewsItem);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith({
        titre: dto.titre,
        contenu: dto.contenu,
        categorie: dto.categorie,
        url: dto.url,
        datePublication: dto.datePublication,
        source: { id: dto.sourceId },
        articles: [{ id: 20 }],
      });
      expect(repository.save).toHaveBeenCalled();
      // create() se termine par un findOne() pour recharger les relations
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {source: true, articles: true },
      });
      expect(result).toEqual(mockNewsItem);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les NewsItems avec leurs relations', async () => {
      repository.find!.mockResolvedValue([mockNewsItem]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: {source: true, articles: true },
      });
      expect(result).toEqual([mockNewsItem]);
    });

    it('devrait retourner un tableau vide si aucun NewsItem n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un NewsItem existant', async () => {
      repository.findOne!.mockResolvedValue(mockNewsItem);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {source: true, articles: true },
      });
      expect(result).toEqual(mockNewsItem);
    });

    it('devrait lever une NotFoundException si le NewsItem n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'NewsItem #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un NewsItem et retourner la version rechargée', async () => {
      const dto: UpdateNewsItemInput = { id: 1, titre: 'Titre mis à jour' } as UpdateNewsItemInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockNewsItem, titre: 'Titre mis à jour' });

      const result = await service.update(1, dto);

      // Le service ne retire que auteurId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1,titre: 'Titre mis à jour' });
      expect(result.titre).toBe('Titre mis à jour');
    });

    it('devrait mettre à jour la relation source si source id est fourni', async () => {
      const dto: any = { id: 1, source:2 };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockNewsItem);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
        source: 2 ,
      });
    });

    it('devrait lever une NotFoundException si le NewsItem à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateNewsItemInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un NewsItem existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockNewsItem);
      repository.remove!.mockResolvedValue(mockNewsItem);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockNewsItem);
      expect(result).toEqual(mockNewsItem);
    });

    it('devrait lever une NotFoundException si le NewsItem à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});