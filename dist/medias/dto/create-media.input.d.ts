import { MediaType } from '../Enums/MediaType';
export declare class CreateMediaInput {
    type: MediaType;
    urlFichier: string;
    titre: string;
    description?: string;
    localisation?: string;
    dateCapture?: Date;
    articleId: number;
    userId: number;
}
