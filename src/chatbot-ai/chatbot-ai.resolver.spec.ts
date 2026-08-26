import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotAiResolver } from './chatbot-ai.resolver';
import { ChatbotAiService } from './chatbot-ai.service';
import { CreateChatbotAiInput } from './dto/create-chatbot-ai.input';
import { UpdateChatbotAiInput } from './dto/update-chatbot-ai.input';

describe('ChatbotAiResolver', () => {
  let resolver: ChatbotAiResolver;
  let service: Record<string, jest.Mock>;

  const mockChatbotAi = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatbotAiResolver,
        {
          provide: ChatbotAiService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockChatbotAi),
            findAll: jest.fn().mockResolvedValue([mockChatbotAi]),
            findOne: jest.fn().mockResolvedValue(mockChatbotAi),
            update: jest.fn().mockResolvedValue(mockChatbotAi),
            remove: jest.fn().mockResolvedValue(mockChatbotAi),
          },
        },
      ],
    }).compile();

    resolver = module.get<ChatbotAiResolver>(ChatbotAiResolver);
    service = module.get(ChatbotAiService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createChatbotAi devrait déléguer au service create', async () => {
    const input = {} as CreateChatbotAiInput;
    const result = await resolver.createChatbotAi(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockChatbotAi);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockChatbotAi]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockChatbotAi);
  });

  it('updateChatbotAi devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateChatbotAiInput;
    const result = await resolver.updateChatbotAi(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockChatbotAi);
  });

  it('removeChatbotAi devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeChatbotAi(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockChatbotAi);
  });
});
