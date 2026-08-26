import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDate, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateAgendaInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  resume!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  categorie!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  importance!: string;

  @Field()
  @Type(() => Date)
  @IsDate()
  dateDebut!: Date;

  @Field()
  @Type(() => Date)
  @IsDate()
  dateFin!: Date;

  @Field()
  @IsNotEmpty()
  @IsString()
  lieu!: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  sourceId!: number;
}
