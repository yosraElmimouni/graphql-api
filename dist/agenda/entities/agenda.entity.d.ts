import { Source } from "../../source/entities/source.entity";
export declare class Agenda {
    id: number;
    title: string;
    resume: string;
    categorie: string;
    importance: string;
    dateDebut: Date;
    dateFin: Date;
    lieu: string;
    source: Source;
}
