import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediasService } from './medias.service';
import { MediasResolver } from './medias.resolver';
import { Media } from './entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediasResolver, MediasService],
})
export class MediasModule {}
