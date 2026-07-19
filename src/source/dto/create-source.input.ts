import { InputType, Field } from '@nestjs/graphql';
import { TypeSource } from '../enums/TypeSource';

@InputType()
export class CreateSourceInput {
  @Field()
  nom!: string;

  @Field()
  url!: string;

  @Field(() => TypeSource)
  type!: TypeSource;

  @Field({ nullable: true })
  fiable?: boolean;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field()
  pays!: string;

  @Field()
  langue!: string;
}
