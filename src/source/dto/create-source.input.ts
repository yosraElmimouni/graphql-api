import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { TypeSource } from '../enums/TypeSource';

@InputType()
export class CreateSourceInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  nom!: string;

  @Field()
  @IsUrl()
  url!: string;

  @Field(() => TypeSource)
  @IsEnum(TypeSource)
  type!: TypeSource;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  fiable?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  pays!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  langue!: string;
}
