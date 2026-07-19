import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  message!: string;

  @Field()
  type!: string;

  @Field({ nullable: true })
  lu?: boolean;

  @Field(() => Int)
  userId!: number;
}
