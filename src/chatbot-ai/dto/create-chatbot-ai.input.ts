import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatbotAiInput {
  @Field()
  question!: string;

  @Field()
  resultat!: string;

  @Field(() => Int)
  userId!: number;
  
}
