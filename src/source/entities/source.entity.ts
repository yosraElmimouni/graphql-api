import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { NewsItem } from 'src/news-item/entities/news-item.entity';
import { TypeSource } from '../enums/TypeSource';

registerEnumType(TypeSource, { name: 'TypeSource' });

@ObjectType()
@Entity('sources')
export class Source {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  nom!: string;

  @Field()
  @Column()
  url!: string;

  @Field(() => TypeSource)
  @Column({ type: 'enum', enum: TypeSource })
  type!: TypeSource;

  @Field()
  @Column({ default: false })
  fiable!: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logoUrl!: string;

  @Field()
  @Column()
  pays!: string;

  @Field()
  @Column()
  langue!: string;

  @Field()
  @CreateDateColumn()
  dateCreation!: Date;

  @Field(() => [NewsItem])
  @OneToMany(() => NewsItem, (newsItem) => newsItem.source)
  newsItems!: NewsItem[];
}
