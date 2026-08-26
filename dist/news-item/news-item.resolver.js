"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsItemResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const news_item_service_1 = require("./news-item.service");
const news_item_entity_1 = require("./entities/news-item.entity");
const create_news_item_input_1 = require("./dto/create-news-item.input");
const update_news_item_input_1 = require("./dto/update-news-item.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let NewsItemResolver = class NewsItemResolver {
    newsItemService;
    constructor(newsItemService) {
        this.newsItemService = newsItemService;
    }
    createNewsItem(createNewsItemInput) {
        return this.newsItemService.create(createNewsItemInput);
    }
    findAll() {
        return this.newsItemService.findAll();
    }
    findOne(id) {
        return this.newsItemService.findOne(id);
    }
    updateNewsItem(updateNewsItemInput) {
        return this.newsItemService.update(updateNewsItemInput.id, updateNewsItemInput);
    }
    removeNewsItem(id) {
        return this.newsItemService.remove(id);
    }
};
exports.NewsItemResolver = NewsItemResolver;
__decorate([
    (0, graphql_1.Mutation)(() => news_item_entity_1.NewsItem),
    __param(0, (0, graphql_1.Args)('createNewsItemInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_news_item_input_1.CreateNewsItemInput]),
    __metadata("design:returntype", void 0)
], NewsItemResolver.prototype, "createNewsItem", null);
__decorate([
    (0, graphql_1.Query)(() => [news_item_entity_1.NewsItem], { name: 'newsItems' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewsItemResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => news_item_entity_1.NewsItem, { name: 'newsItem' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NewsItemResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => news_item_entity_1.NewsItem),
    __param(0, (0, graphql_1.Args)('updateNewsItemInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_news_item_input_1.UpdateNewsItemInput]),
    __metadata("design:returntype", void 0)
], NewsItemResolver.prototype, "updateNewsItem", null);
__decorate([
    (0, graphql_1.Mutation)(() => news_item_entity_1.NewsItem),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NewsItemResolver.prototype, "removeNewsItem", null);
exports.NewsItemResolver = NewsItemResolver = __decorate([
    (0, graphql_1.Resolver)(() => news_item_entity_1.NewsItem),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [news_item_service_1.NewsItemService])
], NewsItemResolver);
//# sourceMappingURL=news-item.resolver.js.map