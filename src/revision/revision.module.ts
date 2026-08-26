import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevisionService } from './revision.service';
import { RevisionResolver } from './revision.resolver';
import { Revision } from './entities/revision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Revision])],
  providers: [RevisionResolver, RevisionService],
})
export class RevisionModule {}
