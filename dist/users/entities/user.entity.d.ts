import { Article } from "../../articles/entities/article.entity";
import { ChatbotAi } from "../../chatbot-ai/entities/chatbot-ai.entity";
import { Media } from "../../medias/entities/media.entity";
import { Revision } from "../../revision/entities/revision.entity";
import { Role } from "../../role/entities/role.entity";
import { Notification } from "../../notifications/entities/notification.entity";
export declare class User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    statut: string;
    dateCreation: Date;
    role: Role;
    notifications: Notification[];
    revisions: Revision[];
    articles: Article[];
    medias: Media[];
    analyses: ChatbotAi[];
}
