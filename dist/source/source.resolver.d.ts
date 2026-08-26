import { SourceService } from './source.service';
import { Source } from './entities/source.entity';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';
export declare class SourceResolver {
    private readonly sourceService;
    constructor(sourceService: SourceService);
    createSource(createSourceInput: CreateSourceInput): Promise<Source>;
    findAll(): Promise<Source[]>;
    findOne(id: number): Promise<Source>;
    updateSource(updateSourceInput: UpdateSourceInput): Promise<Source>;
    removeSource(id: number): Promise<Source>;
}
