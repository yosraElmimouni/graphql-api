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
exports.ArticlesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const articles_service_1 = require("./articles.service");
const article_entity_1 = require("./entities/article.entity");
const create_article_input_1 = require("./dto/create-article.input");
const update_article_input_1 = require("./dto/update-article.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let ArticlesResolver = class ArticlesResolver {
    articlesService;
    constructor(articlesService) {
        this.articlesService = articlesService;
    }
    createArticle(createArticleInput) {
        return this.articlesService.create(createArticleInput);
    }
    findAll() {
        return this.articlesService.findAll();
    }
    findOne(id) {
        return this.articlesService.findOne(id);
    }
    updateArticle(updateArticleInput) {
        const { id, ...data } = updateArticleInput;
        return this.articlesService.update(id, data);
    }
    removeArticle(id) {
        return this.articlesService.remove(id);
    }
};
exports.ArticlesResolver = ArticlesResolver;
__decorate([
    (0, graphql_1.Mutation)(() => article_entity_1.Article),
    __param(0, (0, graphql_1.Args)('createArticleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_input_1.CreateArticleInput]),
    __metadata("design:returntype", void 0)
], ArticlesResolver.prototype, "createArticle", null);
__decorate([
    (0, graphql_1.Query)(() => [article_entity_1.Article], { name: 'articles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticlesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => article_entity_1.Article, { name: 'article' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArticlesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => article_entity_1.Article),
    __param(0, (0, graphql_1.Args)('updateArticleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_article_input_1.UpdateArticleInput]),
    __metadata("design:returntype", void 0)
], ArticlesResolver.prototype, "updateArticle", null);
__decorate([
    (0, graphql_1.Mutation)(() => article_entity_1.Article),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArticlesResolver.prototype, "removeArticle", null);
exports.ArticlesResolver = ArticlesResolver = __decorate([
    (0, graphql_1.Resolver)(() => article_entity_1.Article),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService])
], ArticlesResolver);
//# sourceMappingURL=articles.resolver.js.map