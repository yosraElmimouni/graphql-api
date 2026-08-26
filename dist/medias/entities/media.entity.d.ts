import { Article } from "../../articles/entities/article.entity";
import { User } from "../../users/entities/user.entity";
import { MediaType } from '../Enums/MediaType';
export declare class Media {
    id: number;
    type: MediaType;
    urlFichier: string;
    titre: string;
    description: string;
    localisation: string;
    dateCapture: Date;
    article: Article;
    user: User;
}
