import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsItem } from './entities/news-item.entity';
import { CreateNewsItemInput } from './dto/create-news-item.input';
import { UpdateNewsItemInput } from './dto/update-news-item.input';

@Injectable()
export class NewsItemService {
  constructor(
    @InjectRepository(NewsItem)
    private readonly newsItemRepository: Repository<NewsItem>,
  ) {}

  async create(createNewsItemInput: CreateNewsItemInput) {
    const { sourceId, ...rest } = createNewsItemInput;
    const newsItem = this.newsItemRepository.create({
      ...rest,
      source: { id: sourceId } as any,
    });
    const saved = await this.newsItemRepository.save(newsItem);
    return this.findOne(saved.id);
  }

  findAll() {
    return this.newsItemRepository.find({ relations: { source: true, articles: true } });
  }

  async findOne(id: number) {
    const newsItem = await this.newsItemRepository.findOne({
      where: { id },
      relations: { source: true, articles: true },
    });
    if (!newsItem) throw new NotFoundException(`NewsItem #${id} introuvable`);
    return newsItem;
  }

  async update(id: number, updateNewsItemInput: UpdateNewsItemInput) {
    const { sourceId, ...rest } = updateNewsItemInput as any;
    await this.newsItemRepository.update(id, {
      ...rest,
      ...(sourceId ? { source: { id: sourceId } } : {}),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const newsItem = await this.findOne(id);
    await this.newsItemRepository.remove(newsItem);
    return newsItem;
  }
}
