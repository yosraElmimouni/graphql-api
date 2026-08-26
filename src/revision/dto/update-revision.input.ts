import { CreateRevisionInput } from './create-revision.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRevisionInput extends PartialType(CreateRevisionInput) {
  @Field(() => Int)
  id!: number;
}
