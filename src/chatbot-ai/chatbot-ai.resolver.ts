import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatbotAiService } from './chatbot-ai.service';
import { ChatbotAi } from './entities/chatbot-ai.entity';
import { CreateChatbotAiInput } from './dto/create-chatbot-ai.input';
import { UpdateChatbotAiInput } from './dto/update-chatbot-ai.input';

@Resolver(() => ChatbotAi)
export class ChatbotAiResolver {
  constructor(private readonly chatbotAiService: ChatbotAiService) {}

  @Mutation(() => ChatbotAi)
  createChatbotAi(@Args('createChatbotAiInput') createChatbotAiInput: CreateChatbotAiInput) {
    return this.chatbotAiService.create(createChatbotAiInput);
  }

  @Query(() => [ChatbotAi], { name: 'chatbotAis' })
  findAll() {
    return this.chatbotAiService.findAll();
  }

  @Query(() => ChatbotAi, { name: 'chatbotAi' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chatbotAiService.findOne(id);
  }

  @Mutation(() => ChatbotAi)
  updateChatbotAi(@Args('updateChatbotAiInput') updateChatbotAiInput: UpdateChatbotAiInput) {
    return this.chatbotAiService.update(updateChatbotAiInput.id, updateChatbotAiInput);
  }

  @Mutation(() => ChatbotAi)
  removeChatbotAi(@Args('id', { type: () => Int }) id: number) {
    return this.chatbotAiService.remove(id);
  }
}
