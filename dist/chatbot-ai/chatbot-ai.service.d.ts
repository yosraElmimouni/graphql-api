import { Repository } from 'typeorm';
import { ChatbotAi } from './entities/chatbot-ai.entity';
import { CreateChatbotAiInput } from './dto/create-chatbot-ai.input';
import { UpdateChatbotAiInput } from './dto/update-chatbot-ai.input';
export declare class ChatbotAiService {
    private readonly chatbotAiRepository;
    constructor(chatbotAiRepository: Repository<ChatbotAi>);
    create(createChatbotAiInput: CreateChatbotAiInput): Promise<ChatbotAi>;
    findAll(): Promise<ChatbotAi[]>;
    findOne(id: number): Promise<ChatbotAi>;
    update(id: number, updateChatbotAiInput: UpdateChatbotAiInput): Promise<ChatbotAi>;
    remove(id: number): Promise<ChatbotAi>;
}
