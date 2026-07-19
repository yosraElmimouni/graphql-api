import { InputType, Int, Field } from '@nestjs/graphql';
import { MediaType } from '../Enums/MediaType';

@InputType()
export class CreateMediaInput {
  @Field(() => MediaType)
  type!: MediaType;

  @Field()
  urlFichier!: string;

  @Field()
  titre!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  localisation?: string;

  @Field({ nullable: true })
  dateCapture?: Date;

  @Field(() => Int)
  articleId!: number;

  @Field(() => Int)
  userId!: number;
}
