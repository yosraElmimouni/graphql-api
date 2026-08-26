import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
export declare class ArticlesResolver {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    createArticle(createArticleInput: CreateArticleInput): Promise<Article>;
    findAll(): Promise<Article[]>;
    findOne(id: number): Promise<Article>;
    updateArticle(updateArticleInput: UpdateArticleInput): Promise<Article>;
    removeArticle(id: number): Promise<Article>;
}
