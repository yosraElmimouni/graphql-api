import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Media } from 'src/medias/entities/media.entity';
import { NewsItem } from 'src/news-item/entities/news-item.entity';
import { Revision } from 'src/revision/entities/revision.entity';
import { User } from 'src/users/entities/user.entity';
import { ArticleStatus } from '../enums/ArticleStatus';
import { CategorieArticle } from '../enums/CategorieArticle';

registerEnumType(ArticleStatus, { name: 'ArticleStatus' });
registerEnumType(CategorieArticle, { name: 'CategorieArticle' });

@ObjectType()
@Entity('articles')
export class Article {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  titre!: string;

  @Field()
  @Column('text')
  contenu!: string;

  @Field(() => ArticleStatus)
  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.Brouillon,
  })
  statut!: ArticleStatus;

  @Field(() => CategorieArticle, { nullable: true })
  @Column({ type: 'enum', enum: CategorieArticle, nullable: true })
  categorie!: CategorieArticle;

  @Field()
  @CreateDateColumn()
  dateCreation!: Date;

  @Field()
  @UpdateDateColumn()
  dateModification!: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  datePublication!: Date;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags!: string[];

  // Auteur
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.articles)
  auteur!: User;

  // Médias
  @Field(() => [Media])
  @OneToMany(() => Media, (media) => media.article)
  medias!: Media[];

  // Révisions
  @Field(() => [Revision])
  @OneToMany(() => Revision, (revision) => revision.article)
  revisions!: Revision[];

  // News Items
  @Field(() => [NewsItem])
  @ManyToMany(() => NewsItem, (newsItem) => newsItem.articles)
  @JoinTable()
  newsItems!: NewsItem[];

  
}
