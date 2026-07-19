import { InputType, Int, Field } from '@nestjs/graphql';
import { ArticleStatus } from '../enums/ArticleStatus';
import { CategorieArticle } from '../enums/CategorieArticle';

@InputType()
export class CreateArticleInput {
  @Field()
  titre!: string;

  @Field()
  contenu!: string;

  @Field(() => ArticleStatus, { nullable: true })
  statut?: ArticleStatus;

  @Field(() => CategorieArticle, { nullable: true })
  categorie?: CategorieArticle;

  @Field({ nullable: true })
  datePublication?: Date;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => Int)
  auteurId!: number;
}
