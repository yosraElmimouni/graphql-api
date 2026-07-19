import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRevisionInput {
  @Field()
  dateRevision!: Date;

  @Field()
  commentaire!: string;

  @Field(() => Int)
  userId!: number;

  @Field(() => Int)
  articleId!: number;
}
