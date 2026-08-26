import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

// Type utilitaire pour typer notre mock du Repository TypeORM.
// On ne mocke que les méthodes réellement utilisées par le service.
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

describe('ArticlesService', () => {
  let service: ArticlesService;
  let repository: MockRepository<Article>;

  const mockArticle: Article = {
    id: 1,
    titre: 'Mon titre',
    contenu: 'Le contenu de l\'article',
    statut: 'BROUILLON',
    categorie: 'ACTUALITE',
    datePublication: new Date('2026-01-01'),
    tags: ['test'],
    auteur: { id: 10 } as any,
    medias: [],
    revisions: [],
    newsItems: [],
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: createMockRepository<Article>(),
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    repository = module.get(getRepositoryToken(Article));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un article et retourner celui-ci avec ses relations', async () => {
      const dto: CreateArticleInput = {
        titre: 'Mon titre',
        contenu: 'Le contenu de l\'article',
        auteurId: 10,
      } as CreateArticleInput;

      repository.create!.mockReturnValue({ ...dto, auteur: { id: 10 } });
      repository.save!.mockResolvedValue({ id: 1 });
      repository.findOne!.mockResolvedValue(mockArticle);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith({
        titre: dto.titre,
        contenu: dto.contenu,
        auteur: { id: 10 },
      });
      expect(repository.save).toHaveBeenCalled();
      // create() se termine par un findOne() pour recharger les relations
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { auteur: true, medias: true, revisions: true, newsItems: true },
      });
      expect(result).toEqual(mockArticle);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les articles avec leurs relations', async () => {
      repository.find!.mockResolvedValue([mockArticle]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: { auteur: true, medias: true, revisions: true, newsItems: true },
      });
      expect(result).toEqual([mockArticle]);
    });

    it('devrait retourner un tableau vide si aucun article n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un article existant', async () => {
      repository.findOne!.mockResolvedValue(mockArticle);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { auteur: true, medias: true, revisions: true, newsItems: true },
      });
      expect(result).toEqual(mockArticle);
    });

    it('devrait lever une NotFoundException si l\'article n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Article #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un article et retourner la version rechargée', async () => {
      const dto: UpdateArticleInput = { id: 1, titre: 'Titre modifié' } as UpdateArticleInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockArticle, titre: 'Titre modifié' });

      const result = await service.update(1, dto);

      // Le service ne retire que auteurId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1, titre: 'Titre modifié' });
      expect(result.titre).toBe('Titre modifié');
    });

    it('devrait mettre à jour la relation auteur si auteurId est fourni', async () => {
      const dto: any = { id: 1, auteurId: 42 };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockArticle);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
        auteur: { id: 42 },
      });
    });

    it('devrait lever une NotFoundException si l\'article à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateArticleInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un article existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockArticle);
      repository.remove!.mockResolvedValue(mockArticle);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockArticle);
      expect(result).toEqual(mockArticle);
    });

    it('devrait lever une NotFoundException si l\'article à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});