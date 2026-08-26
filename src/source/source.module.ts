import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceService } from './source.service';
import { SourceResolver } from './source.resolver';
import { Source } from './entities/source.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Source])],
  providers: [SourceResolver, SourceService],
})
export class SourceModule {}
