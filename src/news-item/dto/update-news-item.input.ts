import { CreateNewsItemInput } from './create-news-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNewsItemInput extends PartialType(CreateNewsItemInput) {
  @Field(() => Int)
  id!: number;
}
