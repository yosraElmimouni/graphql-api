import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAgendaInput {
  @Field()
  title!: string;

  @Field()
  resume!: string;

  @Field()
  categorie!: string;

  @Field()
  importance!: string;

  @Field()
  dateDebut!: Date;

  @Field()
  dateFin!: Date;

  @Field()
  lieu!: string;

  @Field(() => Int)
  sourceId!: number;
}