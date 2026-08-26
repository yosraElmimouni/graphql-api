import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import {  CreateNotificationInput } from 'src/notifications/dto/create-notification.input';   
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Notification } from './entities/notification.entity';
import { ObjectLiteral, Repository } from 'typeorm';

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

describe('NotificationsService', () => {
  let service: NotificationsService;
  let repository: MockRepository<Notification>;

  const mockNotification: Notification = {
    id: 1,
    message: 'Notification test',
    type: 'info',
    lu: false,
    dateEnvoi: new Date('2026-01-01'),
    user: { id: 10 } as any,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notification),
          useValue: createMockRepository<Notification>(),
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    repository = module.get(getRepositoryToken(Notification));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un article et retourner celui-ci avec ses relations', async () => {
      const dto: CreateNotificationInput = {
        message : 'Notification test',
        type : 'info',
        lu : false,
        userId : 10
      } as CreateNotificationInput;

      repository.create!.mockReturnValue({ ...dto, user: { id: 10 } });
      repository.save!.mockResolvedValue({ id: 1 });
      repository.findOne!.mockResolvedValue(mockNotification);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith({
        message: dto.message,
        type: dto.type,
        lu: dto.lu,
        user: { id: dto.userId },
      });
      expect(repository.save).toHaveBeenCalled();
      // create() se termine par un findOne() pour recharger les relations
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {user: true },
      });
      expect(result).toEqual(mockNotification);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les Notifications avec leurs relations', async () => {
      repository.find!.mockResolvedValue([mockNotification]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: {user: true },
      });
      expect(result).toEqual([mockNotification]);
    });

    it('devrait retourner un tableau vide si aucun Notification n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un Notification existant', async () => {
      repository.findOne!.mockResolvedValue(mockNotification);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {user: true },
      });
      expect(result).toEqual(mockNotification);
    });

    it('devrait lever une NotFoundException si le Notification n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Notification #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un Notification et retourner la version rechargée', async () => {
      const dto: UpdateNotificationInput = { id: 1, message: 'Message mis à jour' } as UpdateNotificationInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockNotification, message: 'Message mis à jour' });

      const result = await service.update(1, dto);

      // Le service ne retire que auteurId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1,message: 'Message mis à jour' });
      expect(result.message).toBe('Message mis à jour');
    });

    it('devrait mettre à jour la relation user si user id est fourni', async () => {
      const dto: any = { id: 1, user:2 };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockNotification);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
        user: 2 ,
      });
    });

    it('devrait lever une NotFoundException si le Notification à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateNotificationInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un Notification existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockNotification);
      repository.remove!.mockResolvedValue(mockNotification);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockNotification);
      expect(result).toEqual(mockNotification);
    });

    it('devrait lever une NotFoundException si le Notification à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
