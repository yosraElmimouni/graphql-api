import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import { MediaType } from '../Enums/MediaType';

registerEnumType(MediaType, { name: 'MediaType' });

@ObjectType()
@Entity('medias')
export class Media {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => MediaType)
  @Column({ type: 'enum', enum: MediaType })
  type!: MediaType;

  @Field()
  @Column()
  urlFichier!: string;

  @Field()
  @Column()
  titre!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  localisation!: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  dateCapture!: Date;

  @Field(() => Article)
  @ManyToOne(() => Article, (article) => article.medias)
  article!: Article;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.medias)
  user!: User;
}
