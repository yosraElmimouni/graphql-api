import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'email invalide' })
  email!: string;

  @Field()
  @IsNotEmpty({ message: 'mot de passe requis' })
  motDePasse!: string;
}
