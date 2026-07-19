import { InputType, Int, Field } from '@nestjs/graphql';
import { CategorieNews } from '../eums/CategorieNews';

@InputType()
export class CreateNewsItemInput {
  @Field()
  titre!: string;

  @Field()
  contenu!: string;

  @Field(() => CategorieNews)
  categorie!: CategorieNews;

  @Field()
  url!: string;

  @Field()
  datePublication!: Date;

  @Field(() => Int)
  sourceId!: number;
}
