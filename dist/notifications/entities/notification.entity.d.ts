import { User } from "../../users/entities/user.entity";
export declare class Notification {
    id: number;
    message: string;
    type: string;
    lu: boolean;
    dateEnvoi: Date;
    user: User;
}
