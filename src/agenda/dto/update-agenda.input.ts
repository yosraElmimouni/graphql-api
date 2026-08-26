import { CreateAgendaInput } from './create-agenda.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class UpdateAgendaInput extends PartialType(CreateAgendaInput) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id!: number;
}