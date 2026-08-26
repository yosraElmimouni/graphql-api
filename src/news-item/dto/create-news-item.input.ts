import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl, IsDate, IsInt, IsPositive, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CategorieNews } from '../eums/CategorieNews';

@InputType()
export class CreateNewsItemInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  titre!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  contenu!: string;

  @Field(() => CategorieNews)
  @IsEnum(CategorieNews)
  categorie!: CategorieNews;

  @Field()
  @IsUrl()
  url!: string;

  @Field()
  @Type(() => Date)
  @IsDate()
  datePublication!: Date;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  sourceId!: number;
}
