import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';

@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(Media)
    private readonly mediasRepository: Repository<Media>,
  ) {}

  async create(createMediaInput: CreateMediaInput) {
    const { articleId, userId, ...rest } = createMediaInput;
    const media = this.mediasRepository.create({
      ...rest,
      article: { id: articleId } as any,
      user: { id: userId } as any,
    });
    const saved = await this.mediasRepository.save(media);
    return this.findOne(saved.id);
  }

  findAll() {
    return this.mediasRepository.find({ relations: { article: true, user: true } });
  }

  async findOne(id: number) {
    const media = await this.mediasRepository.findOne({
      where: { id },
      relations: { article: true, user: true },
    });
    if (!media) throw new NotFoundException(`Media #${id} introuvable`);
    return media;
  }

  async update(id: number, updateMediaInput: UpdateMediaInput) {
    const { articleId, userId, ...rest } = updateMediaInput as any;
    await this.mediasRepository.update(id, {
      ...rest,
      ...(articleId ? { article: { id: articleId } } : {}),
      ...(userId ? { user: { id: userId } } : {}),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const media = await this.findOne(id);
    await this.mediasRepository.remove(media);
    return media;
  }
}
