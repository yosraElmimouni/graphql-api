import { User } from "../../users/entities/user.entity";
export declare class ChatbotAi {
    id: number;
    question: string;
    resultat: string;
    dateAnalyse: Date;
    user: User;
}
