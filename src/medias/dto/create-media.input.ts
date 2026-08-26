import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl, IsDate, IsInt, IsPositive, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { MediaType } from '../Enums/MediaType';

@InputType()
export class CreateMediaInput {
  @Field(() => MediaType)
  @IsEnum(MediaType)
  type!: MediaType;

  @Field()
  @IsUrl()
  urlFichier!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  titre!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  localisation?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateCapture?: Date;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  articleId!: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  userId!: number;
}
