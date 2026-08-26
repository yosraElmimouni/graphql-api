import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
  ) {}

  async create(createArticleInput: CreateArticleInput) {
    const { auteurId, ...rest } = createArticleInput;
    const article = this.articlesRepository.create({
      ...rest,
      auteur: { id: auteurId } as any,
    });
    const saved = await this.articlesRepository.save(article);
    return this.findOne(saved.id);
  }

  findAll() {
    return this.articlesRepository.find({
      relations: { auteur: true, medias: true, revisions: true, newsItems: true },
    });
  }

  async findOne(id: number) {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: { auteur: true, medias: true, revisions: true, newsItems: true },
    });
    if (!article) {
      throw new NotFoundException(`Article #${id} introuvable`);
    }
    return article;
  }

  async update(id: number, updateArticleInput: Omit<UpdateArticleInput, 'id'>) {
  await this.articlesRepository.update(id, updateArticleInput);
  return this.findOne(id);
}

  async remove(id: number) {
    const article = await this.findOne(id);
    await this.articlesRepository.remove(article);
    return article;
  }
}