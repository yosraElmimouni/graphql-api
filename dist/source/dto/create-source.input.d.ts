import { TypeSource } from '../enums/TypeSource';
export declare class CreateSourceInput {
    nom: string;
    url: string;
    type: TypeSource;
    fiable?: boolean;
    logoUrl?: string;
    pays: string;
    langue: string;
}
