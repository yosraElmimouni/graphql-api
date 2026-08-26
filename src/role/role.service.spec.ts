import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { Roles } from './enums/Roles';

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

describe('RoleService', () => {
  let service: RoleService;
  let repository: MockRepository<Role>;

  const mockRole: Role = {
    id: 1,
    nomRole:Roles.ADMIN,
    users: [],
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: createMockRepository<Role>(),
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get(getRepositoryToken(Role));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un role et le retourner (sans rechargement des relations)', async () => {
      const dto: CreateRoleInput = { nomRole: Roles.JOURNALISTE };
 
      repository.create!.mockReturnValue(dto);
      repository.save!.mockResolvedValue(mockRole);
 
      const result = await service.create(dto);
 
      // Contrairement à d'autres services, create() ici ne fait PAS de
      // findOne() après la sauvegarde : il retourne directement save().
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(repository.findOne).not.toHaveBeenCalled();
      expect(result).toEqual(mockRole);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les Roles avec leurs relations', async () => {
      repository.find!.mockResolvedValue([mockRole]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: {users: true },
      });
      expect(result).toEqual([mockRole]);
    });

    it('devrait retourner un tableau vide si aucun Role n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un Role existant', async () => {
      repository.findOne!.mockResolvedValue(mockRole);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {users : true },
      });
      expect(result).toEqual(mockRole);
    });

    it('devrait lever une NotFoundException si le Role n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Role #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un Role et retourner la version rechargée', async () => {
      const dto: UpdateRoleInput = { id: 1, nomRole: Roles.ADMIN } as UpdateRoleInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockRole, nomRole: Roles.ADMIN });

      const result = await service.update(1, dto);

      // Le service ne retire que auteurId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1, nomRole: Roles.ADMIN });
      expect(result.nomRole).toBe(Roles.ADMIN);
    });

    it('devrait mettre à jour la relation user si user id est fourni', async () => {
      const dto: any = { id: 1, users: [2, 3] };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockRole);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
       users: [2, 3]
      });
    });

    it('devrait lever une NotFoundException si le Role à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateRoleInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un Role existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockRole);
      repository.remove!.mockResolvedValue(mockRole);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockRole);
      expect(result).toEqual(mockRole);
    });

    it('devrait lever une NotFoundException si le Role à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
