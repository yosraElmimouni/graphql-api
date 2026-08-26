import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsInt, IsPositive } from 'class-validator';

@InputType()
export class CreateNotificationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  message!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  type!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  lu?: boolean;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  userId!: number;
}
