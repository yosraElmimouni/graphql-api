import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsItemService } from './news-item.service';
import { NewsItem } from './entities/news-item.entity';
import { CreateNewsItemInput } from './dto/create-news-item.input';
import { UpdateNewsItemInput } from './dto/update-news-item.input';

@Resolver(() => NewsItem)
export class NewsItemResolver {
  constructor(private readonly newsItemService: NewsItemService) {}

  @Mutation(() => NewsItem)
  createNewsItem(@Args('createNewsItemInput') createNewsItemInput: CreateNewsItemInput) {
    return this.newsItemService.create(createNewsItemInput);
  }

  @Query(() => [NewsItem], { name: 'newsItems' })
  findAll() {
    return this.newsItemService.findAll();
  }

  @Query(() => NewsItem, { name: 'newsItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.newsItemService.findOne(id);
  }

  @Mutation(() => NewsItem)
  updateNewsItem(@Args('updateNewsItemInput') updateNewsItemInput: UpdateNewsItemInput) {
    return this.newsItemService.update(updateNewsItemInput.id, updateNewsItemInput);
  }

  @Mutation(() => NewsItem)
  removeNewsItem(@Args('id', { type: () => Int }) id: number) {
    return this.newsItemService.remove(id);
  }
}
