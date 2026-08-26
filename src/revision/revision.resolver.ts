import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RevisionService } from './revision.service';
import { Revision } from './entities/revision.entity';
import { CreateRevisionInput } from './dto/create-revision.input';
import { UpdateRevisionInput } from './dto/update-revision.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Revision)
@UseGuards(GqlAuthGuard)
export class RevisionResolver {
  constructor(private readonly revisionService: RevisionService) {}

  @Mutation(() => Revision)
  createRevision(@Args('createRevisionInput') createRevisionInput: CreateRevisionInput) {
    return this.revisionService.create(createRevisionInput);
  }

  @Query(() => [Revision], { name: 'revisions' })
  findAll() {
    return this.revisionService.findAll();
  }

  @Query(() => Revision, { name: 'revision' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.revisionService.findOne(id);
  }

  @Mutation(() => Revision)
  updateRevision(@Args('updateRevisionInput') updateRevisionInput: UpdateRevisionInput) {
    return this.revisionService.update(updateRevisionInput.id, updateRevisionInput);
  }

  @Mutation(() => Revision)
  removeRevision(@Args('id', { type: () => Int }) id: number) {
    return this.revisionService.remove(id);
  }
}
