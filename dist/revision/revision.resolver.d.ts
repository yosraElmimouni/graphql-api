import { RevisionService } from './revision.service';
import { Revision } from './entities/revision.entity';
import { CreateRevisionInput } from './dto/create-revision.input';
import { UpdateRevisionInput } from './dto/update-revision.input';
export declare class RevisionResolver {
    private readonly revisionService;
    constructor(revisionService: RevisionService);
    createRevision(createRevisionInput: CreateRevisionInput): Promise<Revision>;
    findAll(): Promise<Revision[]>;
    findOne(id: number): Promise<Revision>;
    updateRevision(updateRevisionInput: UpdateRevisionInput): Promise<Revision>;
    removeRevision(id: number): Promise<Revision>;
}
