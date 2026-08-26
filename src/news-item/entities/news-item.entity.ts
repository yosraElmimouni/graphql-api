import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { Source } from 'src/source/entities/source.entity';
import { CategorieNews } from '../eums/CategorieNews';

registerEnumType(CategorieNews, { name: 'CategorieNews' });

@ObjectType()
@Entity('news_items')
export class NewsItem {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  titre!: string;

  @Field()
  @Column('text')
  contenu!: string;

  @Field(() => CategorieNews)
  @Column({ type: 'enum', enum: CategorieNews })
  categorie!: CategorieNews;

  @Field()
  @Column()
  url!: string;

  @Field()
  @Column({ type: 'timestamp' })
  datePublication!: Date;

  @Field(() => Source)
  @ManyToOne(() => Source, (source) => source.newsItems)
  source!: Source;

  @Field(() => [Article])
  @ManyToMany(() => Article, (article) => article.newsItems)
  articles!: Article[];
}
