import { Repository } from 'typeorm';
import { NewsItem } from './entities/news-item.entity';
import { CreateNewsItemInput } from './dto/create-news-item.input';
import { UpdateNewsItemInput } from './dto/update-news-item.input';
export declare class NewsItemService {
    private readonly newsItemRepository;
    constructor(newsItemRepository: Repository<NewsItem>);
    create(createNewsItemInput: CreateNewsItemInput): Promise<NewsItem>;
    findAll(): Promise<NewsItem[]>;
    findOne(id: number): Promise<NewsItem>;
    update(id: number, updateNewsItemInput: UpdateNewsItemInput): Promise<NewsItem>;
    remove(id: number): Promise<NewsItem>;
}
