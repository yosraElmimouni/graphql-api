import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional, IsInt, IsPositive } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  nom!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  prenom!: string;

  @Field()
  @IsEmail({}, { message: 'email invalide' })
  email!: string;

  @Field()
  @MinLength(8, { message: 'le mot de passe doit contenir au moins 8 caractères' })
  motDePasse!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  statut?: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  roleId!: number;
}
