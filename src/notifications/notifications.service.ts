import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
  ) {}

  async create(createNotificationInput: CreateNotificationInput) {
    const { userId, ...rest } = createNotificationInput;
    const notification = this.notificationsRepository.create({
      ...rest,
      user: { id: userId } as any,
    });
    const saved = await this.notificationsRepository.save(notification);
    return this.findOne(saved.id);
  }

  findAll() {
    return this.notificationsRepository.find({ relations: { user: true } });
  }

  async findOne(id: number) {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!notification) throw new NotFoundException(`Notification #${id} introuvable`);
    return notification;
  }

  async update(id: number, updateNotificationInput: UpdateNotificationInput) {
    const { userId, ...rest } = updateNotificationInput as any;
    await this.notificationsRepository.update(id, {
      ...rest,
      ...(userId ? { user: { id: userId } } : {}),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const notification = await this.findOne(id);
    await this.notificationsRepository.remove(notification);
    return notification;
  }
}
