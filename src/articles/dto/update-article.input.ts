import { IsOptional, IsDate, IsInt, IsPositive } from 'class-validator';
import { CreateArticleInput } from './create-article.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType()
export class UpdateArticleInput extends PartialType(
  OmitType(CreateArticleInput, ['auteurId'] as const),
) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id!: number;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  datePublication?: Date;
}