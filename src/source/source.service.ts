import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from './entities/source.entity';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
  ) {}

  create(createSourceInput: CreateSourceInput) {
    const source = this.sourceRepository.create(createSourceInput);
    return this.sourceRepository.save(source);
  }

  findAll() {
    return this.sourceRepository.find({ relations: { newsItems: true } });
  }

  async findOne(id: number) {
    const source = await this.sourceRepository.findOne({
      where: { id },
      relations: { newsItems: true },
    });
    if (!source) throw new NotFoundException(`Source #${id} introuvable`);
    return source;
  }

  async update(id: number, updateSourceInput: UpdateSourceInput) {
    await this.sourceRepository.update(id, updateSourceInput as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const source = await this.findOne(id);
    await this.sourceRepository.remove(source);
    return source;
  }
}
