import { Repository } from 'typeorm';
import { Source } from './entities/source.entity';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';
export declare class SourceService {
    private readonly sourceRepository;
    constructor(sourceRepository: Repository<Source>);
    create(createSourceInput: CreateSourceInput): Promise<Source>;
    findAll(): Promise<Source[]>;
    findOne(id: number): Promise<Source>;
    update(id: number, updateSourceInput: UpdateSourceInput): Promise<Source>;
    remove(id: number): Promise<Source>;
}
