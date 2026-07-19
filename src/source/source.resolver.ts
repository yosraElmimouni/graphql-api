import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SourceService } from './source.service';
import { Source } from './entities/source.entity';
import { CreateSourceInput } from './dto/create-source.input';
import { UpdateSourceInput } from './dto/update-source.input';

@Resolver(() => Source)
export class SourceResolver {
  constructor(private readonly sourceService: SourceService) {}

  @Mutation(() => Source)
  createSource(@Args('createSourceInput') createSourceInput: CreateSourceInput) {
    return this.sourceService.create(createSourceInput);
  }

  @Query(() => [Source], { name: 'sources' })
  findAll() {
    return this.sourceService.findAll();
  }

  @Query(() => Source, { name: 'source' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sourceService.findOne(id);
  }

  @Mutation(() => Source)
  updateSource(@Args('updateSourceInput') updateSourceInput: UpdateSourceInput) {
    return this.sourceService.update(updateSourceInput.id, updateSourceInput);
  }

  @Mutation(() => Source)
  removeSource(@Args('id', { type: () => Int }) id: number) {
    return this.sourceService.remove(id);
  }
}
