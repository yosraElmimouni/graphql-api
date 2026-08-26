import { ChatbotAiService } from './chatbot-ai.service';
import { ChatbotAi } from './entities/chatbot-ai.entity';
import { CreateChatbotAiInput } from './dto/create-chatbot-ai.input';
import { UpdateChatbotAiInput } from './dto/update-chatbot-ai.input';
export declare class ChatbotAiResolver {
    private readonly chatbotAiService;
    constructor(chatbotAiService: ChatbotAiService);
    createChatbotAi(createChatbotAiInput: CreateChatbotAiInput): Promise<ChatbotAi>;
    findAll(): Promise<ChatbotAi[]>;
    findOne(id: number): Promise<ChatbotAi>;
    updateChatbotAi(updateChatbotAiInput: UpdateChatbotAiInput): Promise<ChatbotAi>;
    removeChatbotAi(id: number): Promise<ChatbotAi>;
}
