import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotAiResolver } from './chatbot-ai.resolver';
import { ChatbotAiService } from './chatbot-ai.service';

describe('ChatbotAiResolver', () => {
  let resolver: ChatbotAiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatbotAiResolver,
        {
          provide: ChatbotAiService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ChatbotAiResolver>(ChatbotAiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
