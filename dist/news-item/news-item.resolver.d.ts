import { NewsItemService } from './news-item.service';
import { NewsItem } from './entities/news-item.entity';
import { CreateNewsItemInput } from './dto/create-news-item.input';
import { UpdateNewsItemInput } from './dto/update-news-item.input';
export declare class NewsItemResolver {
    private readonly newsItemService;
    constructor(newsItemService: NewsItemService);
    createNewsItem(createNewsItemInput: CreateNewsItemInput): Promise<NewsItem>;
    findAll(): Promise<NewsItem[]>;
    findOne(id: number): Promise<NewsItem>;
    updateNewsItem(updateNewsItemInput: UpdateNewsItemInput): Promise<NewsItem>;
    removeNewsItem(id: number): Promise<NewsItem>;
}
