import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDate, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateRevisionInput {
  @Field()
  @Type(() => Date)
  @IsDate()
  dateRevision!: Date;

  @Field()
  @IsNotEmpty()
  @IsString()
  commentaire!: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  userId!: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  articleId!: number;
}
