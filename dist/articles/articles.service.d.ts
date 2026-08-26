import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
export declare class ArticlesService {
    private readonly articlesRepository;
    constructor(articlesRepository: Repository<Article>);
    create(createArticleInput: CreateArticleInput): Promise<Article>;
    findAll(): Promise<Article[]>;
    findOne(id: number): Promise<Article>;
    update(id: number, updateArticleInput: Omit<UpdateArticleInput, 'id'>): Promise<Article>;
    remove(id: number): Promise<Article>;
}
