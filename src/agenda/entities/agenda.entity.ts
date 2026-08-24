import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Source } from 'src/source/entities/source.entity';

@ObjectType()
@Entity('agenda')
export class Agenda {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column('text')
  resume!: string;

  @Field()
  @Column()
  categorie!: string;

  @Field()
  @Column()
  importance!: string;

  @Field()
  @Column({ type: 'timestamp' })
  dateDebut!: Date;

  @Field()
  @Column({ type: 'timestamp' })
  dateFin!: Date;

  @Field()
  @Column()
  lieu!: string;

  @Field(() => Source)
  @ManyToOne(() => Source)
  source!: Source;
}