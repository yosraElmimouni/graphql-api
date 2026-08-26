import { Repository } from 'typeorm';
import { Revision } from './entities/revision.entity';
import { CreateRevisionInput } from './dto/create-revision.input';
import { UpdateRevisionInput } from './dto/update-revision.input';
export declare class RevisionService {
    private readonly revisionRepository;
    constructor(revisionRepository: Repository<Revision>);
    create(createRevisionInput: CreateRevisionInput): Promise<Revision>;
    findAll(): Promise<Revision[]>;
    findOne(id: number): Promise<Revision>;
    update(id: number, updateRevisionInput: UpdateRevisionInput): Promise<Revision>;
    remove(id: number): Promise<Revision>;
}
