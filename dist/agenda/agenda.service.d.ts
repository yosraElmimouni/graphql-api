import { Repository } from 'typeorm';
import { Agenda } from './entities/agenda.entity';
import { CreateAgendaInput } from './dto/create-agenda.input';
import { UpdateAgendaInput } from './dto/update-agenda.input';
export declare class AgendaService {
    private readonly agendaRepository;
    constructor(agendaRepository: Repository<Agenda>);
    create(createAgendaInput: CreateAgendaInput): Promise<Agenda>;
    findAll(): Promise<Agenda[]>;
    findOne(id: number): Promise<Agenda>;
    update(id: number, updateAgendaInput: UpdateAgendaInput): Promise<Agenda>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        resume: string;
        categorie: string;
        importance: string;
        dateDebut: Date;
        dateFin: Date;
        lieu: string;
        source: import("../source/entities/source.entity").Source;
    }>;
}
