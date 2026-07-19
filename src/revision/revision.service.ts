import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Revision } from './entities/revision.entity';
import { CreateRevisionInput } from './dto/create-revision.input';
import { UpdateRevisionInput } from './dto/update-revision.input';

@Injectable()
export class RevisionService {
  constructor(
    @InjectRepository(Revision)
    private readonly revisionRepository: Repository<Revision>,
  ) {}

  async create(createRevisionInput: CreateRevisionInput) {
    const { userId, articleId, ...rest } = createRevisionInput;
    const revision = this.revisionRepository.create({
      ...rest,
      user: { id: userId } as any,
      article: { id: articleId } as any,
    });
    const saved = await this.revisionRepository.save(revision);
    return this.findOne(saved.id);
  }

  findAll() {
    return this.revisionRepository.find({ relations: { user: true, article: true } });
  }

  async findOne(id: number) {
    const revision = await this.revisionRepository.findOne({
      where: { id },
      relations: { user: true, article: true },
    });
    if (!revision) throw new NotFoundException(`Revision #${id} introuvable`);
    return revision;
  }

  async update(id: number, updateRevisionInput: UpdateRevisionInput) {
    const { userId, articleId, ...rest } = updateRevisionInput as any;
    await this.revisionRepository.update(id, {
      ...rest,
      ...(userId ? { user: { id: userId } } : {}),
      ...(articleId ? { article: { id: articleId } } : {}),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const revision = await this.findOne(id);
    await this.revisionRepository.remove(revision);
    return revision;
  }
}
