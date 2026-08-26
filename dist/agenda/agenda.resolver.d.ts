import { AgendaService } from './agenda.service';
import { Agenda } from './entities/agenda.entity';
import { CreateAgendaInput } from './dto/create-agenda.input';
import { UpdateAgendaInput } from './dto/update-agenda.input';
export declare class AgendaResolver {
    private readonly agendaService;
    constructor(agendaService: AgendaService);
    createAgenda(createAgendaInput: CreateAgendaInput): Promise<Agenda>;
    findAll(): Promise<Agenda[]>;
    findOne(id: number): Promise<Agenda>;
    updateAgenda(updateAgendaInput: UpdateAgendaInput): Promise<Agenda>;
    removeAgenda(id: number): Promise<{
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
