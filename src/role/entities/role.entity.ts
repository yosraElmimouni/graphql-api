import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Roles } from '../enums/Roles';
import { User } from 'src/users/entities/user.entity';

registerEnumType(Roles, { name: 'Roles' });

@ObjectType()
@Entity('roles')
export class Role {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Roles)
  @Column({ type: 'enum', enum: Roles })
  nomRole!: Roles;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
