import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsItemService } from './news-item.service';
import { NewsItemResolver } from './news-item.resolver';
import { NewsItem } from './entities/news-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsItem])],
  providers: [NewsItemResolver, NewsItemService],
})
export class NewsItemModule {}
