import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { Agenda } from './entities/agenda.entity';
import { CreateAgendaInput } from './dto/create-agenda.input';
import { UpdateAgendaInput } from './dto/update-agenda.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Agenda)
@UseGuards(GqlAuthGuard)
export class AgendaResolver {
  constructor(private readonly agendaService: AgendaService) {}

  @Mutation(() => Agenda)
  createAgenda(@Args('createAgendaInput') createAgendaInput: CreateAgendaInput) {
    return this.agendaService.create(createAgendaInput);
  }

  @Query(() => [Agenda], { name: 'agendas' })
  findAll() {
    return this.agendaService.findAll();
  }

  @Query(() => Agenda, { name: 'agenda' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.agendaService.findOne(id);
  }

  @Mutation(() => Agenda)
  updateAgenda(@Args('updateAgendaInput') updateAgendaInput: UpdateAgendaInput) {
    return this.agendaService.update(updateAgendaInput.id, updateAgendaInput);
  }


  

  @Mutation(() => Agenda)
  removeAgenda(@Args('id', { type: () => Int }) id: number) {
    return this.agendaService.remove(id);
  }
}