import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from './entities/agenda.entity';
import { CreateAgendaInput } from './dto/create-agenda.input';
import { UpdateAgendaInput } from './dto/update-agenda.input';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
  ) {}

  async create(createAgendaInput: CreateAgendaInput) {
    const { sourceId, ...rest } = createAgendaInput;
    const agenda = this.agendaRepository.create({
      ...rest,
      source: { id: sourceId } as any,
    });
    const saved = await this.agendaRepository.save(agenda);
    return this.findOne(saved.id);
  }

  findAll() {
    return this.agendaRepository.find({ relations: { source: true } });
  }

  async findOne(id: number) {
    const agenda = await this.agendaRepository.findOne({
      where: { id },
      relations: { source: true },
    });
    if (!agenda) {
      throw new NotFoundException(`Agenda #${id} introuvable`);
    }
    return agenda;
  }

  async update(id: number, updateAgendaInput: UpdateAgendaInput) {
    const { sourceId, ...rest } = updateAgendaInput as any;
    await this.agendaRepository.update(id, {
      ...rest,
      ...(sourceId ? { source: { id: sourceId } } : {}),
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const agenda = await this.findOne(id);
    const removed = { ...agenda }; 
    await this.agendaRepository.remove(agenda);
    return removed;
  }
}
