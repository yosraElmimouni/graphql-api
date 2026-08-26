import { Article } from "../../articles/entities/article.entity";
import { User } from "../../users/entities/user.entity";
export declare class Revision {
    id: number;
    dateRevision: Date;
    commentaire: string;
    user: User;
    article: Article;
}
