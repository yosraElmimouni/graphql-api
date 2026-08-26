import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';

@InputType()
export class CreateChatbotAiInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  question!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  resultat!: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  userId!: number;
}
