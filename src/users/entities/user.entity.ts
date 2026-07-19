import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { ChatbotAi } from 'src/chatbot-ai/entities/chatbot-ai.entity';
import { Media } from 'src/medias/entities/media.entity';
import { Revision } from 'src/revision/entities/revision.entity';
import { Role } from 'src/role/entities/role.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  nom!: string;

  @Field()
  @Column()
  prenom!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  motDePasse!: string;

  @Field()
  @Column()
  statut!: string;

  @Field()
  @CreateDateColumn()
  dateCreation!: Date;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;

  @Field(() => [Notification])
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];

  @Field(() => [Revision])
  @OneToMany(() => Revision, (revision) => revision.user)
  revisions!: Revision[];

  @Field(() => [Article])
  @OneToMany(() => Article, (article) => article.auteur)
  articles!: Article[];

  @Field(() => [Media])
  @OneToMany(() => Media, (media) => media.user)
  medias!: Media[];

  @Field(() => [ChatbotAi])
  @OneToMany(() => ChatbotAi, (chatbotAi) => chatbotAi.user)
  analyses!: ChatbotAi[];
}
