import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotAiService } from './chatbot-ai.service';
import { ChatbotAiResolver } from './chatbot-ai.resolver';
import { ChatbotAi } from './entities/chatbot-ai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatbotAi])],
  providers: [ChatbotAiResolver, ChatbotAiService],
})
export class ChatbotAiModule {}
