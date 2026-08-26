import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDate, IsInt, IsPositive, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleStatus } from '../enums/ArticleStatus';
import { CategorieArticle } from '../enums/CategorieArticle';

@InputType()
export class CreateArticleInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  titre!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  contenu!: string;

  @Field(() => ArticleStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ArticleStatus)
  statut?: ArticleStatus;

  @Field(() => CategorieArticle, { nullable: true })
  @IsOptional()
  @IsEnum(CategorieArticle)
  categorie?: CategorieArticle;

  // @Field({ nullable: true })
  // @IsOptional()
  // @Type(() => Date)
  // @IsDate()
  // datePublication?: Date;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  auteurId!: number;
}
