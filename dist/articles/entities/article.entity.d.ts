import { Media } from "../../medias/entities/media.entity";
import { NewsItem } from "../../news-item/entities/news-item.entity";
import { Revision } from "../../revision/entities/revision.entity";
import { User } from "../../users/entities/user.entity";
import { ArticleStatus } from '../enums/ArticleStatus';
import { CategorieArticle } from '../enums/CategorieArticle';
export declare class Article {
    id: number;
    titre: string;
    contenu: string;
    statut: ArticleStatus;
    categorie: CategorieArticle;
    dateCreation: Date;
    dateModification: Date;
    datePublication: Date;
    tags: string[];
    auteur: User;
    medias: Media[];
    revisions: Revision[];
    newsItems: NewsItem[];
}
