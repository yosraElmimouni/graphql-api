import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatbotAi } from './entities/chatbot-ai.entity';
import { CreateChatbotAiInput } from './dto/create-chatbot-ai.input';
import { UpdateChatbotAiInput } from './dto/update-chatbot-ai.input';

@Injectable()
export class ChatbotAiService {
  constructor(
    @InjectRepository(ChatbotAi)
    private readonly chatbotAiRepository: Repository<ChatbotAi>,
  ) {}

  async create(createChatbotAiInput: CreateChatbotAiInput) {
    const { userId, ...rest } = createChatbotAiInput;
    const chatbotAi = this.chatbotAiRepository.create({
      ...rest,
      user: { id: userId } as any,
    });
    const saved = await this.chatbotAiRepository.save(chatbotAi);
    return this.findOne(saved.id);
  }

  findAll() {
    return this.chatbotAiRepository.find({ relations: { user: true } });
  }

  async findOne(id: number) {
    const chatbotAi = await this.chatbotAiRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!chatbotAi) throw new NotFoundException(`ChatbotAi #${id} introuvable`);
    return chatbotAi;
  }

  async update(id: number, updateChatbotAiInput: UpdateChatbotAiInput) {
    const { userId, ...rest } = updateChatbotAiInput as any;
    await this.chatbotAiRepository.update(id, {
      ...rest,
      ...(userId ? { user: { id: userId } } : {}),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const chatbotAi = await this.findOne(id);
    await this.chatbotAiRepository.remove(chatbotAi);
    return chatbotAi;
  }
}
