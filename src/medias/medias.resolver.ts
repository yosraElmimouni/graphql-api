import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MediasService } from './medias.service';
import { Media } from './entities/media.entity';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Media)
@UseGuards(GqlAuthGuard)
export class MediasResolver {
  constructor(private readonly mediasService: MediasService) {}

  @Mutation(() => Media)
  createMedia(@Args('createMediaInput') createMediaInput: CreateMediaInput) {
    return this.mediasService.create(createMediaInput);
  }

  @Query(() => [Media], { name: 'medias' })
  findAll() {
    return this.mediasService.findAll();
  }

  @Query(() => Media, { name: 'media' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mediasService.findOne(id);
  }

  @Mutation(() => Media)
  updateMedia(@Args('updateMediaInput') updateMediaInput: UpdateMediaInput) {
    return this.mediasService.update(updateMediaInput.id, updateMediaInput);
  }

  @Mutation(() => Media)
  removeMedia(@Args('id', { type: () => Int }) id: number) {
    return this.mediasService.remove(id);
  }
}
