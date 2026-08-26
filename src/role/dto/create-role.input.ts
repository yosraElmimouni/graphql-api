import { InputType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Roles } from '../enums/Roles';

@InputType()
export class CreateRoleInput {
  @Field(() => Roles)
  @IsEnum(Roles)
  nomRole!: Roles;
}
