import { NewsItem } from "../../news-item/entities/news-item.entity";
import { TypeSource } from '../enums/TypeSource';
export declare class Source {
    id: number;
    nom: string;
    url: string;
    type: TypeSource;
    fiable: boolean;
    logoUrl: string;
    pays: string;
    langue: string;
    dateCreation: Date;
    newsItems: NewsItem[];
}
