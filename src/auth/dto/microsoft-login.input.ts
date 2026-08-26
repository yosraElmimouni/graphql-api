import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class MicrosoftLoginInput {
  @Field()
  @IsNotEmpty({ message: 'idToken requis' })
  idToken!: string;
}