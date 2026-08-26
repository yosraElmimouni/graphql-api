import { CategorieNews } from '../eums/CategorieNews';
export declare class CreateNewsItemInput {
    titre: string;
    contenu: string;
    categorie: CategorieNews;
    url: string;
    datePublication: Date;
    sourceId: number;
}
