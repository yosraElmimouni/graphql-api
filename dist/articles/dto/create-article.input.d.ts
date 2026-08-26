import { ArticleStatus } from '../enums/ArticleStatus';
import { CategorieArticle } from '../enums/CategorieArticle';
export declare class CreateArticleInput {
    titre: string;
    contenu: string;
    statut?: ArticleStatus;
    categorie?: CategorieArticle;
    tags?: string[];
    auteurId: number;
}
