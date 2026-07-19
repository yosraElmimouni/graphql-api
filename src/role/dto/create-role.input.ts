import { InputType, Field } from '@nestjs/graphql';
import { Roles } from '../enums/Roles';

@InputType()
export class CreateRoleInput {
  @Field(() => Roles)
  nomRole!: Roles;
}
