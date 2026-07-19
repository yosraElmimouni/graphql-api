import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  nom!: string;

  @Field()
  prenom!: string;

  @Field()
  email!: string;

  @Field()
  motDePasse!: string;

  @Field({ nullable: true })
  statut?: string;

  @Field(() => Int)
  roleId!: number;
}
