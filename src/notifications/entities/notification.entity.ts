import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity('notifications')
export class Notification {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('text')
  message!: string;

  @Field()
  @Column()
  type!: string;

  @Field()
  @Column({ default: false })
  lu!: boolean;

  @Field()
  @CreateDateColumn()
  dateEnvoi!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications)
  user!: User;
}
