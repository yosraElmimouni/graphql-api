import { CreateAgendaInput } from './create-agenda.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAgendaInput extends PartialType(CreateAgendaInput) {
  @Field(() => Int)
  id!: number;
}
