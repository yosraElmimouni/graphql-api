import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity('revisions')
export class Revision {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'timestamp' })
  dateRevision!: Date;

  @Field()
  @Column('text')
  commentaire!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.revisions)
  user!: User;

  @Field(() => Article)
  @ManyToOne(() => Article, (article) => article.revisions)
  article!: Article;
}
