import { CreateChatbotAiInput } from './create-chatbot-ai.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChatbotAiInput extends PartialType(CreateChatbotAiInput) {
  @Field(() => Int)
  id!: number;
}
