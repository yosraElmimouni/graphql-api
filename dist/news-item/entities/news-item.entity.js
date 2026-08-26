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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const article_entity_1 = require("../../articles/entities/article.entity");
const source_entity_1 = require("../../source/entities/source.entity");
const CategorieNews_1 = require("../eums/CategorieNews");
(0, graphql_1.registerEnumType)(CategorieNews_1.CategorieNews, { name: 'CategorieNews' });
let NewsItem = class NewsItem {
    id;
    titre;
    contenu;
    categorie;
    url;
    datePublication;
    source;
    articles;
};
exports.NewsItem = NewsItem;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NewsItem.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewsItem.prototype, "titre", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], NewsItem.prototype, "contenu", void 0);
__decorate([
    (0, graphql_1.Field)(() => CategorieNews_1.CategorieNews),
    (0, typeorm_1.Column)({ type: 'enum', enum: CategorieNews_1.CategorieNews }),
    __metadata("design:type", String)
], NewsItem.prototype, "categorie", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewsItem.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], NewsItem.prototype, "datePublication", void 0);
__decorate([
    (0, graphql_1.Field)(() => source_entity_1.Source),
    (0, typeorm_1.ManyToOne)(() => source_entity_1.Source, (source) => source.newsItems),
    __metadata("design:type", source_entity_1.Source)
], NewsItem.prototype, "source", void 0);
__decorate([
    (0, graphql_1.Field)(() => [article_entity_1.Article]),
    (0, typeorm_1.ManyToMany)(() => article_entity_1.Article, (article) => article.newsItems),
    __metadata("design:type", Array)
], NewsItem.prototype, "articles", void 0);
exports.NewsItem = NewsItem = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('news_items')
], NewsItem);
//# sourceMappingURL=news-item.entity.js.map