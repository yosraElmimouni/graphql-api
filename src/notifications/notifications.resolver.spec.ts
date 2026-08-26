import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';

describe('NotificationsResolver', () => {
  let resolver: NotificationsResolver;
  let service: Record<string, jest.Mock>;

  const mockNotification = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsResolver,
        {
          provide: NotificationsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockNotification),
            findAll: jest.fn().mockResolvedValue([mockNotification]),
            findOne: jest.fn().mockResolvedValue(mockNotification),
            update: jest.fn().mockResolvedValue(mockNotification),
            remove: jest.fn().mockResolvedValue(mockNotification),
          },
        },
      ],
    }).compile();

    resolver = module.get<NotificationsResolver>(NotificationsResolver);
    service = module.get(NotificationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('createNotification devrait déléguer au service create', async () => {
    const input = {} as CreateNotificationInput;
    const result = await resolver.createNotification(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockNotification);
  });

  it('findAll devrait déléguer au service findAll', async () => {
    const result = await resolver.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockNotification]);
  });

  it('findOne devrait déléguer au service findOne avec l\'id', async () => {
    const result = await resolver.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockNotification);
  });

  it('updateNotification devrait déléguer au service update avec l\'id et l\'input', async () => {
    const input = { id: 1 } as UpdateNotificationInput;
    const result = await resolver.updateNotification(input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect(result).toEqual(mockNotification);
  });

  it('removeNotification devrait déléguer au service remove avec l\'id', async () => {
    const result = await resolver.removeNotification(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockNotification);
  });
});
