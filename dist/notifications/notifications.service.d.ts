import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
export declare class NotificationsService {
    private readonly notificationsRepository;
    constructor(notificationsRepository: Repository<Notification>);
    create(createNotificationInput: CreateNotificationInput): Promise<Notification>;
    findAll(): Promise<Notification[]>;
    findOne(id: number): Promise<Notification>;
    update(id: number, updateNotificationInput: UpdateNotificationInput): Promise<Notification>;
    remove(id: number): Promise<Notification>;
}
