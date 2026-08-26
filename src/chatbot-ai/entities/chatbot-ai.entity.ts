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
@Entity('chatbot_ai')
export class ChatbotAi {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('text')
  question!: string;

  @Field()
  @Column('text')
  resultat!: string;

  @Field()
  @CreateDateColumn()
  dateAnalyse!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.analyses)
  user!: User;
}
