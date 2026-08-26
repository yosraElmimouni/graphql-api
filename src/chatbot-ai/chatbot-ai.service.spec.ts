import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotAiService } from './chatbot-ai.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ObjectLiteral, Repository } from 'typeorm';
import { ChatbotAi } from './entities/chatbot-ai.entity';
import { CreateChatbotAiInput } from './dto/create-chatbot-ai.input';
import { UpdateChatbotAiInput } from './dto/update-chatbot-ai.input';

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

describe('ChatbotAiService', () => {
  let service: ChatbotAiService;
  let repository: MockRepository<ChatbotAi>;

  const mockChatbot: ChatbotAi = {
    id: 1,
    question: 'Quelle est la capitale de la France ?',
    resultat: 'La capitale de la France est Paris.',
    dateAnalyse: new Date('2026-01-01'),
    user: { id: 10 }
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatbotAiService,
        {
          provide: getRepositoryToken(ChatbotAi),
          useValue: createMockRepository<ChatbotAi>(),
        },
      ],
    }).compile();

    service = module.get<ChatbotAiService>(ChatbotAiService);
    repository = module.get(getRepositoryToken(ChatbotAi));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un article et retourner celui-ci avec ses relations', async () => {
      const dto: CreateChatbotAiInput = {
        question  : 'Quelle est la capitale de la France ?',
        resultat  : 'La capitale de la France est Paris.',
        userId    : 10
      } as CreateChatbotAiInput;

      repository.create!.mockReturnValue({ ...dto, auteur: { id: 10 } });
      repository.save!.mockResolvedValue({ id: 1 });
      repository.findOne!.mockResolvedValue(mockChatbot);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith({
        question: dto.question,
        resultat: dto.resultat,
        user: { id: 10 },
      });
      expect(repository.save).toHaveBeenCalled();
      // create() se termine par un findOne() pour recharger les relations
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { user: true },
      });
      expect(result).toEqual(mockChatbot);
    });
  });

  describe('findAll', () => {
    it('devrait retourner la liste de tous les chats avec leurs relations', async () => {
      repository.find!.mockResolvedValue([mockChatbot]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: { user: true },
      });
      expect(result).toEqual([mockChatbot]);
    });

    it('devrait retourner un tableau vide si aucun disccusion n\'existe', async () => {
      repository.find!.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('devrait retourner une question existante', async () => {
      repository.findOne!.mockResolvedValue(mockChatbot);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { user: true },
      });
      expect(result).toEqual(mockChatbot);
    });

    it('devrait lever une NotFoundException si la question n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'ChatbotAi #999 introuvable',
      );
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un chat et retourner la version rechargée', async () => {
      const dto: UpdateChatbotAiInput = { id: 1, question: 'Titre modifié' } as UpdateChatbotAiInput;

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue({ ...mockChatbot, question: 'Titre modifié' });

      const result = await service.update(1, dto);

      // Le service ne retire que auteurId du DTO ; `id` reste donc dans `rest`
      // et fait partie de l'objet passé à repository.update().
      expect(repository.update).toHaveBeenCalledWith(1, { id: 1, question: 'Titre modifié' });
      expect(result.question).toBe('Titre modifié');
    });

    it('devrait mettre à jour la relation user si user id est fourni', async () => {
      const dto: any = { id: 1, user: 42 };

      repository.update!.mockResolvedValue({ affected: 1 });
      repository.findOne!.mockResolvedValue(mockChatbot);

      await service.update(1, dto);

      expect(repository.update).toHaveBeenCalledWith(1, {
        id: 1,
        user: 42 ,
      });
    });

    it('devrait lever une NotFoundException si le chat à mettre à jour n\'existe pas', async () => {
      repository.update!.mockResolvedValue({ affected: 0 });
      repository.findOne!.mockResolvedValue(null);

      await expect(
        service.update(999, { id: 999 } as UpdateChatbotAiInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un chat existant et le retourner', async () => {
      repository.findOne!.mockResolvedValue(mockChatbot);
      repository.remove!.mockResolvedValue(mockChatbot);

      const result = await service.remove(1);

      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalledWith(mockChatbot);
      expect(result).toEqual(mockChatbot);
    });

    it('devrait lever une NotFoundException si le chat à supprimer n\'existe pas', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});