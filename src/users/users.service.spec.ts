import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository ,ObjectLiteral} from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

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

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>;

  const mockUser: User = {
    id: 1,
    nom: 'Benali',
    prenom: 'Yosra',
    email: 'yosra@example.com',
    motDePasse: 'hashedPassword',
    statut: 'ACTIF',
    dateCreation: new Date('2026-01-01'),
    role: { id: 2, nom: 'Journaliste' } as any,
    notifications: [],
    revisions: [],
    articles: [],
    medias: [],
    analyses: [],
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository<User>(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un utilisateur et retourner celui-ci avec ses relations', async () => {
      const dto: CreateUserInput = {
        nom: 'Benali',
        prenom: 'Yosra',
        email: 'yosra@example.com',
        motDePasse: 'hashedPassword',
        roleId: 2,
      } as CreateUserInput;

      repository.create!.mockReturnValue({ ...dto, role: { id: 2 } });
      repository.save!.mockResolvedValue({ id: 1 });
      repository.findOne!.mockResolvedValue(mockUser);

      const result = await service.create(dto);

      const createArg = repository.create!.mock.calls[0][0] as any;
      expect(createArg).toMatchObject({
        nom: dto.nom,
        prenom: dto.prenom,
        email: dto.email,
        role: { id: 2 },
      });
      // Le mot de passe doit être hashé, jamais stocké/transmis en clair.
      expect(createArg.motDePasse).not.toBe(dto.motDePasse);
      expect(createArg.motDePasse).toMatch(/^\$2[aby]\$/);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { role: true },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les utilisateurs avec leur rôle', async () => {
      repository.find!.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: { role: true },
      });
      expect(result).toEqual([mockUser]);
    });

    it('devrait retourner un tableau vide si aucun utilisateur n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un utilisateur existant', async () => {
      repository.findOne!.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { role: true },
      });
      expect(result).toEqual(mockUser);
    });

    it('devrait lever une NotFoundException si l\'utilisateur n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'User #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un utilisateur et retourner la version rechargée', async () => {
      const dto: UpdateUserInput = { id: 1, nom: 'Nouveau nom' } as UpdateUserInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockUser, nom: 'Nouveau nom' });

      const result = await service.update(1, dto);

      // Le service ne retire que roleId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1, nom: 'Nouveau nom' });
      expect(result.nom).toBe('Nouveau nom');
    });

    it('devrait mettre à jour la relation role si roleId est fourni', async () => {
      const dto: any = { id: 1, roleId: 5 };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockUser);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
        role: { id: 5 },
      });
    });

    it('devrait lever une NotFoundException si l\'utilisateur à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateUserInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un utilisateur existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockUser);
      repository.remove!.mockResolvedValue(mockUser);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('devrait lever une NotFoundException si l\'utilisateur à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});