import { Article } from "../../articles/entities/article.entity";
import { Source } from "../../source/entities/source.entity";
import { CategorieNews } from '../eums/CategorieNews';
export declare class NewsItem {
    id: number;
    titre: string;
    contenu: string;
    categorie: CategorieNews;
    url: string;
    datePublication: Date;
    source: Source;
    articles: Article[];
}
